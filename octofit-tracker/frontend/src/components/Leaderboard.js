import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = () => {
    setLoading(true);
    fetch('https://bookish-space-disco-pgw6x56gjgx2rj44-8000.app.github.dev/api/leaderboard/')
      .then(response => response.json())
      .then(data => setLeaderboard(data))
      .catch(error => console.error('Error fetching leaderboard:', error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="display-5 text-primary">Leaderboard</h1>
        <button className="btn btn-primary" onClick={fetchLeaderboard} disabled={loading}>
          {loading ? 'Loading...' : 'Reload'}
        </button>
      </div>
      <div className="card shadow">
        <div className="card-body">
          <table className="table table-hover table-bordered">
            <thead className="table-light">
              <tr>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center">No leaderboard entries found.</td>
                </tr>
              ) : (
                leaderboard.map(entry => (
                  <tr key={entry._id}>
                    <td>{entry.user && entry.user.username ? entry.user.username : ''}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
