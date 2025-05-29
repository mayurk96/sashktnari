import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

export const SocketContext = createContext();

// ... existing code ...
const socket = io('https://sashktnari7-912z.onrender.com'); // Updated to Render backend URL
const peer = new Peer(undefined, {
  host: 'sashktnari7-912z.onrender.com',
  port: '', // No port needed for production
  secure: true
});
// ... existing code ...

const SocketProvider = ({ children }) => {
  const [call, setCall] = useState({});
  const [stream, setStream] = useState(null);
  const [myVideo, setMyVideo] = useState(null); // Ref for mentor's video element
  const [userVideo, setUserVideo] = useState(null); // Ref for mentee's video element
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [googleMeetLink, setGoogleMeetLink] = useState(''); // Store Google Meet link
  const [videoCallType, setVideoCallType] = useState('custom'); // 'custom' or 'google-meet'

  const myVideoRef = useRef();
  const userVideoRef = useRef();

  useEffect(() => {
    if (videoCallType === 'custom') {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          if (myVideoRef.current) {
            myVideoRef.current.srcObject = currentStream;
          }
        })
        .catch((err) => {
          console.error('Error accessing media devices:', err);
          alert('Please allow access to your camera and microphone.');
        });

      peer.on('call', (incomingCall) => {
        incomingCall.answer(stream);
        setCall(incomingCall);
        incomingCall.on('stream', (userStream) => {
          setUserVideo(userStream);
          setCallAccepted(true);
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = userStream;
          }
        });

        incomingCall.on('close', () => {
          setCallEnded(true);
        });
      });

      socket.on('callUser', ({ from, signalData }) => {
        setCall({ from, signalData });
      });

      return () => {
        socket.off('callUser');
        peer.disconnect();
      };
    }
  }, [stream, videoCallType]);

  const callUser = (id) => {
    if (videoCallType === 'custom') {
      if (!stream) {
        alert('Camera and microphone are not accessible.');
        return;
      }

      const outgoingCall = peer.call(id, stream);
      if (outgoingCall) {
        setCall(outgoingCall);
        outgoingCall.on('stream', (userStream) => {
          setUserVideo(userStream);
          setCallAccepted(true);
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = userStream;
          }
        });

        outgoingCall.on('close', () => {
          setCallEnded(true);
        });

        socket.emit('callUser', { userId: id });
      } else {
        console.error('Error: Unable to initiate call.');
      }
    } else if (videoCallType === 'google-meet') {
      alert(`Share this Google Meet link with the user: ${googleMeetLink}`);
    }
  };

  const answerCall = () => {
    if (videoCallType === 'custom') {
      const { from, signalData } = call;
      const answeredCall = peer.call(from, stream);
      answeredCall.on('stream', (userStream) => {
        setUserVideo(userStream);
        setCallAccepted(true);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = userStream;
        }
      });

      socket.emit('acceptCall', { signal: signalData, to: from });

      answeredCall.on('close', () => {
        setCallEnded(true);
      });
    }
  };

  const leaveCall = () => {
    if (call) {
      call.close();
    }
    peer.disconnect();
    setCallEnded(true);
    window.location.reload();
  };

  const handleGoogleMeetLinkChange = (e) => {
    setGoogleMeetLink(e.target.value);
  };

  return (
    <SocketContext.Provider
      value={{
        callUser,
        call,
        callAccepted,
        answerCall,
        leaveCall,
        myVideoRef,
        userVideoRef,
        stream,
        callEnded,
        googleMeetLink,
        handleGoogleMeetLinkChange,
        setVideoCallType,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

