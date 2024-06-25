import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profileImg from'../Images/profile.png'

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
      emailId: loggedInUserEmail, 
      user: {
        emailId: buddy.emailId,
        password: '', 
        name: '', 
        createdActivities: [],
        joinedActivities: [],
        buddies: []
      }
    };

    axios.post(`http://localhost:8080/api/user/addBuddy`, requestBody)
      .then(response => {
       
        alert(`Successfully added ${buddy.name} as your buddy!`);
     
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
      })
      .catch(error => {
        console.error('Error adding buddy:', error);
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
