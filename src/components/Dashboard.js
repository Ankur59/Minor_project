import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Make sure to create this CSS file for styling

const Dashboard = ({ username }) => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/elections');
        setElections(data);
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };
    fetchElections();
  }, []);

  const handleVote = async (electionId, candidate) => {
    try {
      await axios.post(`http://localhost:5000/api/elections/vote/${electionId}`, {
        candidate
      });
      alert('Vote cast successfully!');
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {username || 'Voter'}!</h1>
      <h2>Available Elections</h2>
      <div className="election-list">
        {elections.length === 0 ? (
          <p>No elections available at the moment.</p>
        ) : (
          elections.map((election) => (
            <div key={election._id} className="election-card">
              <h3>{election.title}</h3>
              <div className="candidates">
                {election.candidates.map((candidate) => (
                  <button
                    key={candidate.name}
                    className="vote-button"
                    onClick={() => handleVote(election._id, candidate.name)}
                  >
                    Vote for {candidate.name}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
