import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchActivities = () => {
    setLoading(true);
    fetch('https://bookish-space-disco-pgw6x56gjgx2rj44-8000.app.github.dev/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="display-5 text-primary">Activities</h1>
        <button className="btn btn-primary" onClick={fetchActivities} disabled={loading}>
          {loading ? 'Loading...' : 'Reload'}
        </button>
      </div>
      <div className="card shadow">
        <div className="card-body">
          <table className="table table-hover table-bordered">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">No activities found.</td>
                </tr>
              ) : (
                activities.map(activity => (
                  <tr key={activity._id}>
                    <td>{activity.user && activity.user.username ? activity.user.username : activity.user}</td>
                    <td>{activity.activity_type}</td>
                    <td>{activity.duration}</td>
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

export default Activities;
