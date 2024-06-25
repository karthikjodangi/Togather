import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyActivities.css';

const MyActivities = () => {
  const [emailId, setEmailId] = useState('');
  const [createdActivities, setCreatedActivities] = useState([]);
  const [joinedActivities, setJoinedActivities] = useState([]);
  const [filteredCreatedActivities, setFilteredCreatedActivities] = useState([]);
  const [filteredJoinedActivities, setFilteredJoinedActivities] = useState([]);
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showJoinedUsers, setShowJoinedUsers] = useState({});

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    setEmailId(userEmail);

    if (userEmail) {
      fetchCreatedActivities(userEmail);
      fetchJoinedActivities(userEmail);
    }
  }, []);

  const fetchCreatedActivities = (userEmail) => {
    axios.get(`http://localhost:8080/api/user/activities/created/${userEmail}`)
      .then(response => {
        setCreatedActivities(response.data);
        setFilteredCreatedActivities(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the created activities!', error);
      });
  };

  const fetchJoinedActivities = (userEmail) => {
    axios.get(`http://localhost:8080/api/user/activities/joined/${userEmail}`)
      .then(response => {
        setJoinedActivities(response.data);
        setFilteredJoinedActivities(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the joined activities!', error);
      });
  };

  useEffect(() => {
    filterActivities();
  }, [filter, typeFilter, createdActivities, joinedActivities]);

  const filterActivities = () => {
    const filteredCreated = createdActivities.filter(activity => 
      (filter === 'all' || activity.status === filter) &&
      (typeFilter === 'all' || activity.type === typeFilter)
    );
    const filteredJoined = joinedActivities.filter(activity => 
      typeFilter === 'all' || activity.type === typeFilter
    );

    setFilteredCreatedActivities(filteredCreated);
    setFilteredJoinedActivities(filteredJoined);
  };

  const handleStatusChange = (activityId, newStatus) => {
    axios.put(`http://localhost:8080/api/activities/updateStatus/${activityId}?status=${newStatus}`)
      .then(response => {
        if (response.status === 200) {
          setCreatedActivities(prevActivities =>
            prevActivities.map(activity =>
              activity.id === activityId ? { ...activity, status: newStatus } : activity
            )
          );
        }
      })
      .catch(error => {
        console.error('There was an error updating the status!', error);
      });
  };

  const leaveActivity = (activityId) => {
    const userEmail = emailId;

    axios.post(`http://localhost:8080/api/activities/leave`, { id: activityId, emailId: userEmail })
      .then(response => {
        if (response.status === 200) {
          console.log('Successfully left the activity');
          setJoinedActivities(prevActivities =>
            prevActivities.filter(activity => activity.id !== activityId)
          );
          setFilteredJoinedActivities(prevActivities =>
            prevActivities.filter(activity => activity.id !== activityId)
          );
        }
      })
      .catch(error => {
        console.error('Error leaving activity:', error);
      });
  };

  const getJoinedEmails = (activityId, activityList) => {
    let activity = activityList.find(activity => activity.id === activityId);
    return activity ? activity.joinedUsers : [];
  };

  const toggleJoinedUsers = (activityId) => {
    setShowJoinedUsers(prevState => ({
      ...prevState,
      [activityId]: !prevState[activityId]
    }));
  };

  const cardTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#333',
    borderBottom: '2px solid #007bff',
    paddingBottom: '0.5rem',
  };

  const cardTextStyle = {
    fontSize: '1rem',
    marginBottom: '0.5rem',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  // Mapping of activity types to labels and colors
  const activityTypeLabels = {
    'Tree Planting': { label: 'Tree Planting', color: '#28a745' },
    'Clean-Up Drives': { label: 'Clean-Up Drives', color: '#007bff' },
    'Awareness Campaigns': { label: 'Awareness Campaigns', color: '#ffc107' },
    'Shoreline Sweeping': { label: 'Shoreline Sweeping', color: '#dc3545' },
    'Other': { label: 'Other', color: '#6c757d' }
  };

  return (
    <div className="container mt-4 mb-4">
      <div style={headerStyle}>
        <h2 className="mb-4" style={{ fontSize: '4rem', color: '#007bff', paddingBottom: '0.5rem' }}>My Activities</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          >
            <option value="all">Status (All)</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          >
            <option value="all">Type (All)</option>
            {Object.keys(activityTypeLabels).map((type) => (
              <option key={type} value={type}>{activityTypeLabels[type].label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-4">
          <h3 style={cardTitleStyle}>Created Activities</h3>
          <div className="row">
            {filteredCreatedActivities.map(activity => (
              <div key={activity.id} className="col-md-4 mb-4">
                <div className="card">
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
                  <p style={cardTextStyle}><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                  <p style={cardTextStyle}><strong>Time:</strong> {new Date(activity.date).toLocaleTimeString()}</p>

                  <div className="circle">
                    {getJoinedEmails(activity.id, createdActivities).length}
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => toggleJoinedUsers(activity.id)}
                    style={{ marginTop: '1rem' }}
                  >
                    Show Joined Users
                  </button>
                  {showJoinedUsers[activity.id] && (
                    <ul>
                      {getJoinedEmails(activity.id, createdActivities).map(email => (
                        <li key={email}>{email}</li>
                      ))}
                    </ul>
                  )}

                  <select
                    value={activity.status}
                    onChange={(e) => handleStatusChange(activity.id, e.target.value)}
                    style={{ marginTop: '1rem' }}
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12">
          <h3 style={cardTitleStyle}>Joined Activities</h3>
          <div className="row">
            {filteredJoinedActivities.map(activity => (
              <div key={activity.id} className="col-md-4 mb-4">
                <div className="card">
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
                  <p style={cardTextStyle}><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                  <p style={cardTextStyle}><strong>Time:</strong> {new Date(activity.date).toLocaleTimeString()}</p>

                  <div className="circle">
                    {getJoinedEmails(activity.id, joinedActivities).length}
                  </div>

                  {activity.status === 'ongoing' && (
                    <button
                      className="btn btn-danger"
                      onClick={() => leaveActivity(activity.id)}
                      style={{ marginTop: '1rem' }}
                    >
                      Leave Activity
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivities;
