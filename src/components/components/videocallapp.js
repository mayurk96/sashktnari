import React, { useContext, useRef } from 'react';
import { SocketContext } from './components/videocallcontext';

const App = () => {
  const {
    setVideoCallType,
    googleMeetLink,
    handleGoogleMeetLinkChange,
    callUser,
    call,
    callAccepted,
    answerCall,
    stream,
    myVideoRef,
    userVideoRef,
  } = useContext(SocketContext);

  return (
    <div>
      <h1>Video Call App</h1>
      <div>
        {/* Select video call type */}
        <h2>Choose Video Call Type</h2>
        <label>
          <input
            type="radio"
            name="callType"
            value="custom"
            onChange={() => setVideoCallType('custom')}
          />
          Custom Video Call
        </label>
        <label>
          <input
            type="radio"
            name="callType"
            value="google-meet"
            onChange={() => setVideoCallType('google-meet')}
          />
          Google Meet
        </label>

        {/* Google Meet link input */}
        {googleMeetLink !== null && (
          <div>
            <h3>Google Meet</h3>
            <input
              type="text"
              placeholder="Enter Google Meet link"
              value={googleMeetLink}
              onChange={handleGoogleMeetLinkChange}
              style={{ marginRight: '10px' }}
            />
            <button
              onClick={() => {
                if (googleMeetLink) {
                  alert(`Share this Google Meet link with the mentee: ${googleMeetLink}`);
                } else {
                  alert('Please enter a Google Meet link.');
                }
              }}
            >
              Share Meet Link
            </button>
          </div>
        )}
      </div>

      <div>
        <h2>Video Call</h2>
        {/* Display mentor's video stream */}
        {stream && (
          <video playsInline muted ref={myVideoRef} autoPlay style={{ width: '300px' }} />
        )}

        {/* Incoming call notification */}
        {call.isReceivingCall && !callAccepted && (
          <div>
            <h2>{call.from} is calling...</h2>
            <button onClick={answerCall}>Answer</button>
          </div>
        )}

        {/* Display mentee's video stream */}
        {callAccepted && (
          <video playsInline ref={userVideoRef} autoPlay style={{ width: '300px' }} />
        )}

        {/* Start a custom video call */}
        <button onClick={() => callUser('mentee-id')} style={{ marginTop: '10px' }}>
          Start Custom Call
        </button>
      </div>
    </div>
  );
};

export default App;
