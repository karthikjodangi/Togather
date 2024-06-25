import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JoinActivityByType = () => {
  const { type } = useParams();
  const [activities, setActivities] = useState([]);
  const [emailId, setEmailId] = useState('');
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // Default filter

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setEmailId(email);
    if (email) {
      fetchActivities(type, email);
    }
  }, [type, emailId]);

  const fetchActivities = (activityType, email) => {
    axios.get(`http://localhost:8080/api/activities/join/${activityType}/${email}`)
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.log("Error fetching activities", error);
      });
  };

  const filterActivities = (status) => {
    if (status === 'all') {
      fetchActivities(type, emailId); // Fetch all activities again
    } else {
      const filtered = activities.filter(activity => activity.status === status);
      setActivities(filtered); // Update state with filtered activities
    }
    setFilter(status); // Set the current filter
  };

  const handleJoin = async (id) => {
    const response = await fetch('http://localhost:8080/api/activities/joinUpdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, emailId })
    });

    if (response.status === 200) {
      console.log("Join details updated");
      alert("Joined Successfully");
      navigate('/joinActivity');
    } else {
      console.log("Error");
      alert("Error");
    }
  };

  const activityTypeLabels = {
    'Tree Planting': { label: 'Tree Planting', color: '#28a745' },
    'Clean-Up Drives': { label: 'Clean-Up Drives', color: '#007bff' },
    'Awareness Campaigns': { label: 'Awareness Campaigns', color: '#ffc107' },
    'Shoreline Sweeping': { label: 'Shoreline Sweeping', color: '#dc3545' },
    'Other': { label: 'Other', color: '#6c757d' }
  };

  const cardTextStyle = {
    fontSize: '1rem',
    marginBottom: '0.5rem',
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col">
          <h2 className="mb-4">Join {type} Activities</h2>
          <div className="text-end mb-3">
            <select
              value={filter}
              onChange={(e) => filterActivities(e.target.value)}
              className="form-select"
              style={{ width: '200px' }}
            >
              <option value="all">All</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="row">
            {activities.length === 0 ? (
              <div className="col-12">
                <p><h2>No activities to join for {type}.</h2></p>
              </div>
            ) : (
              activities.map(activity => (
                <div key={activity.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className={`status-${activity.status}`}>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </div>
                        <div className="activity-type" style={{ backgroundColor: activityTypeLabels[activity.type]?.color || '#6c757d', color: '#fff', padding: '0.5rem', borderRadius: '5px', marginBottom: '0.5rem' }}>
                          {activityTypeLabels[activity.type]?.label || activity.type}
                        </div>
                      </div>
                      <h5 style={cardTextStyle}>{activity.title}</h5>
                      <p style={cardTextStyle}>{activity.description}</p>
                      <p style={cardTextStyle}><strong>Place:</strong> {activity.place}</p>
                      <p style={cardTextStyle}><strong>Date:</strong> {activity.date}</p>
                      <p style={cardTextStyle}><strong>Time:</strong> {activity.time}</p>
                      <div className="circle">
                        {activity.joinedUsers.length}
                      </div>
                      {activity.status === 'ongoing' ? (
                        <button
                          onClick={() => handleJoin(activity.id)}
                          className="btn btn-primary"
                        >
                          Join
                        </button>
                      ) : (
                        <button
                          className="btn btn-secondary"
                          disabled
                        >
                          {activity.status.toUpperCase()}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinActivityByType;
