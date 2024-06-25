import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BuddyProfile = () => {
  let { buddyEmailId } = useParams();
  const [buddyCreatedActivities, setBuddyCreatedActivities] = useState([]);
  const [userJoinedActivities, setUserJoinedActivities] = useState([]);
  const [user,setUser] = useState([]);
  const emailId = localStorage.getItem('userEmail');

  console.log('User Email', emailId);
  console.log('Buddy Email', buddyEmailId);

  useEffect(() => {
    const fetchBuddyCreatedActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/activities/created/${buddyEmailId}`);
        setBuddyCreatedActivities(response.data);
      } catch (error) {
        console.error('Error fetching created activities:', error);
      }
    };

    const fetchUserJoinedActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/activities/joined/${emailId}`);
        setUserJoinedActivities(response.data);
      } catch (error) {
        console.error('Error fetching joined activities:', error);
      }
    };

    if (buddyEmailId) {
      fetchBuddyCreatedActivities();
    }
    if (emailId) {
      fetchUserJoinedActivities();
    }

  }, [buddyEmailId, emailId]);

  useEffect(() => {
    const fetchUser= async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/buddies/profile/${buddyEmailId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching created activities:', error);
      }
    };
    fetchUser();
  }, [buddyEmailId,user]);



  const handleJoin = async (id) => {
    try {
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
        window.location.reload(); // Reload the page after alert

        // navigate(`/buddies/profile/${buddyEmailId}`);
      } else {
        console.log("Error");
        alert("Error");
      }
    } catch (error) {
      console.error("Error joining activity:", error);
      alert("Error joining activity");
    }
  };

  // Get the IDs of activities the user has already joined
  const joinedActivityIds = userJoinedActivities.map(activity => activity.id);

  // Filter out the activities that the user has already joined
  const filteredActivities = buddyCreatedActivities.filter(
    activity => !joinedActivityIds.includes(activity.id)
  );

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


  // Mapping of activity types to labels and colors
  const activityTypeLabels = {
    'Tree Planting': { label: 'Tree Planting', color: '#28a745' },
    'Clean-Up Drives': { label: 'Clean-Up Drives', color: '#007bff' },
    'Awareness Campaigns': { label: 'Awareness Campaigns', color: '#ffc107' },
    'Shoreline Sweeping': { label: 'Shoreline Sweeping', color: '#dc3545' },
    'Other': { label: 'Other', color: '#6c757d' }
  };


  return (
    <div className='container mt-4 '>
      <h2>User Profile</h2>
      <div className="row mt-4 mb-4">
            <div key={user.emailId} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ fontSize: '1.5rem' }}>{user.name}</h5>
                  <h5 className="card-title" style={{ fontSize: '1.5rem' }}>{user.emailId}</h5>

                  <h5 className="card-title" style={{ fontSize: '1.2rem' }}>Created Activities: {buddyCreatedActivities.length}</h5>
                  {/* <h5 className="card-title" style={{ fontSize: '1.2rem' }}>Joined Activities: {user.joinedActivities.length}</h5> */}
                </div>
              </div>
            </div>
        </div>
        <h3 style={cardTitleStyle}>Created Activities</h3>

      {filteredActivities && filteredActivities.length > 0 ? (
        <div className="row">
          {filteredActivities.map(activity => (
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
          ))}
        </div>
      ) : (
        <p>Either No activities created or You have joined it already.</p>
      )}
      {/* Add more details as needed */}
    </div>
  );
};

export default BuddyProfile;
