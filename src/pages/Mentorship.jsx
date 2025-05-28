import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../AuthProvider";  // ✅ Use useAuth instead of AuthContext
import SocketContext from '../components/components/videocallcontext';
import './Mentorship.css';

function Mentorship() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  // Get authentication details
  const auth = useAuth();  // ✅ Get authentication details using useAuth
  
  // Get video call functions
  const socketContext = useContext(SocketContext);

  if (!socketContext) {
    console.error("SocketContext is undefined. Make sure it is properly provided.");
  }

  const { callUser, call, callAccepted, answerCall, myVideo, userVideo, stream } = socketContext || {};

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setResults({
      videos: [
        { id: 1, title: "Career Growth Strategies", type: "free", url: "https://www.youtube.com/results?search_query=career+growth+strategies+based+on+women+development" },
        { id: 2, title: "Leadership Skills", type: "free", url: "https://www.youtube.com/results?search_query=leadership+skills+for+women" },
        { id: 3, title: "Motivation", type: "paid", url: "https://www.youtube.com/results?search_query=motivational+videos+to+motivate+women" },
      ],
      mentors: [
        { id: 1, name: "Jane Doe", expertise: "Tech Leadership", available: true },
        { id: 2, name: "John Smith", expertise: "Entrepreneurship", available: false },
      ]
    });
  };

  const initiateCall = (mentorId) => {
    if (callUser) {
      callUser(mentorId);
    } else {
      console.error("callUser function is not available.");
    }
  };

  return (
    <div className="mentorship-page">
      <header className="page-header">
        <h1>Mentorship</h1>
        <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
      </header>
      
      <main className="page-content">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for mentorship topics or success stories..."
            required
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        {results && (
          <div className="results">
            <section className="videos-section">
              <h2>Related Videos</h2>
              <div className="video-grid">
                {results.videos.map((video) => (
                  <div key={video.id} className="video-card">
                    <h3>{video.title}</h3>
                    {video.type === 'free' ? (
                      <a href={video.url} target="_blank" rel="noopener noreferrer" className="watch-btn">Watch Free</a>
                    ) : (
                      <button className="subscribe-btn">Subscribe to Watch</button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="mentors-section">
              <h2>Available Mentors</h2>
              <div className="mentor-grid">
                {results.mentors.map((mentor) => (
                  <div key={mentor.id} className="mentor-card">
                    <h3>{mentor.name}</h3>
                    <p>Expertise: {mentor.expertise}</p>
                    {mentor.available ? (
                      <button onClick={() => initiateCall(mentor.id)} className="book-btn">Start Video Call</button>
                    ) : (
                      <p className="unavailable">Currently Unavailable</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {stream && (
          <div className="video-call">
            {myVideo && <video playsInline muted ref={myVideo} autoPlay style={{ width: '300px' }} />}
            {callAccepted && userVideo && <video playsInline ref={userVideo} autoPlay style={{ width: '300px' }} />}
            {call?.isReceivingCall && !callAccepted && (
              <div>
                <h2>{call.from} is calling...</h2>
                <button onClick={answerCall}>Answer</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );

  
}

export default Mentorship;
