import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkouts = () => {
    setLoading(true);
    fetch('https://bookish-space-disco-pgw6x56gjgx2rj44-8000.app.github.dev/api/workouts/')
      .then(response => response.json())
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching workouts:', error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="display-5 text-primary">Workouts</h1>
        <button className="btn btn-primary" onClick={fetchWorkouts} disabled={loading}>
          {loading ? 'Loading...' : 'Reload'}
        </button>
      </div>
      <div className="card shadow">
        <div className="card-body">
          <table className="table table-hover table-bordered">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center">No workouts found.</td>
                </tr>
              ) : (
                workouts.map(workout => (
                  <tr key={workout._id}>
                    <td>{workout.name}</td>
                    <td>{workout.description}</td>
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

export default Workouts;
