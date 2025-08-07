import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeams = () => {
    setLoading(true);
    fetch('https://bookish-space-disco-pgw6x56gjgx2rj44-8000.app.github.dev/api/teams/')
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Error fetching teams:', error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="display-5 text-primary">Teams</h1>
        <button className="btn btn-primary" onClick={fetchTeams} disabled={loading}>
          {loading ? 'Loading...' : 'Reload'}
        </button>
      </div>
      <div className="card shadow">
        <div className="card-body">
          <table className="table table-hover table-bordered">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center">No teams found.</td>
                </tr>
              ) : (
                teams.map(team => (
                  <tr key={team._id}>
                    <td>{team.name}</td>
                    <td>{team.members && team.members.map(m => m.username).join(', ')}</td>
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

export default Teams;
