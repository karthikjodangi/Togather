import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 // Assuming you're using React Router for navigation
import profileImg from '../Images/profile.png';

const Buddies = () => {
  const [myBuddies, setMyBuddies] = useState([]);
  const [addBuddies, setAddBuddies] = useState([]);
  const loggedInUserEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/myBuddies/${loggedInUserEmail}`)
      .then(response => {
        setMyBuddies(response.data);
      })
      .catch(error => {
        console.error('Error fetching my buddies:', error);
      });
  }, [loggedInUserEmail]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/addBuddies/${loggedInUserEmail}`)
      .then(response => {
        setAddBuddies(response.data);
      })
      .catch(error => {
        console.error('Error fetching add buddies:', error);
      });
  }, [loggedInUserEmail]);

  const addBuddy = (buddy) => {
    const requestBody = {
      userEmailId: loggedInUserEmail,
      buddyEmailId: buddy.emailId
    };

    axios.post(`http://localhost:8080/api/user/addBuddy`, requestBody)
      .then(response => {
        alert(`Successfully added ${buddy.name} as your buddy!`);
        refreshBuddies();
      })
      .catch(error => {
        console.error('Error adding buddy:', error);
      });
  };

  const removeBuddy = (buddy) => {
    const requestBody = {
      userEmailId: loggedInUserEmail,
      buddyEmailId: buddy.emailId
    };

    axios.post(`http://localhost:8080/api/user/removeBuddy`, requestBody)
      .then(response => {
        alert(`Successfully removed ${buddy.name}!`);
        refreshBuddies();
      })
      .catch(error => {
        console.error('Error removing buddy:', error);
      });
  };

  // const viewProfile = (emailId) => {
  //   window.location.href = `/buddies/profile/${emailId}`;
  // };
  

  const refreshBuddies = () => {
    axios.get(`http://localhost:8080/api/user/myBuddies/${loggedInUserEmail}`)
      .then(response => {
        setMyBuddies(response.data);
      })
      .catch(error => {
        console.error('Error refreshing my buddies:', error);
      });

    axios.get(`http://localhost:8080/api/user/addBuddies/${loggedInUserEmail}`)
      .then(response => {
        setAddBuddies(response.data);
      })
      .catch(error => {
        console.error('Error refreshing add buddies:', error);
      });
  };

  return (
    <>
      <div className="container mt-4 mb-4">
        <div className="row mt-4 mb-4">
          <h2>My Buddies</h2>
          {myBuddies.map(buddy => (
            <div key={buddy.emailId} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card">
                <img src={profileImg} className="card-img-top" alt={buddy.name} style={{ height: '200px', objectFit: 'contain' }} />
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ fontSize: '1.5rem' }}>{buddy.name}</h5>
                  <h5 className="card-title" style={{ fontSize: '1.2rem' }}>Created Activities: {buddy.createdActivities.length}</h5>
                  <h5 className="card-title" style={{ fontSize: '1.2rem' }}>Joined Activities: {buddy.joinedActivities.length}</h5>
                  {/* <h5 className="card-title" style={{ fontSize: '1.5rem' }}>{buddy.name}</h5> */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                  <Link to={`/buddies/profile/${buddy.emailId}`} className="btn btn-primary">View Profile</Link>
                  <button className="btn btn-danger" onClick={() => removeBuddy(buddy)}>Remove</button>
    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-4 mb-4">
          <h2>Add Buddies</h2>
          {addBuddies.map(buddy => (
            <div key={buddy.emailId} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card">
                <img src={profileImg} className="card-img-top" alt={buddy.name} style={{ height: '200px', objectFit: 'contain' }} />
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ fontSize: '1.5rem' }}>{buddy.name}</h5>
                  <h5 className="card-title" style={{ fontSize: '1.2rem' }}>Created Activities: {buddy.createdActivities.length}</h5>
                  <h5 className="card-title" style={{ fontSize: '1.2rem' }}>Joined Activities: {buddy.joinedActivities.length}</h5>
                  <button className="btn btn-primary" onClick={() => addBuddy(buddy)}>Add Buddy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Buddies;
