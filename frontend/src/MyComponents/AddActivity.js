import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AddActivity.css';
import treeImg from '../Images/tree-planting.webp';
import cleanImg from '../Images/cleaning.jpeg';
import shoreCleaning from '../Images/shorecleaning.jpg';
import awareImg from '../Images/awareness.png';
import otherImg from '../Images/other.jpg';

const AddActivity = () => {
  const { id } = useParams();

  const [emailId, setEmailId] = useState(''); 

  useEffect(() => {
    setEmailId(localStorage.getItem('userEmail')); 
  }, []);

  const activities = [
    {
      aid: 1,
      type: 'Tree Planting',
      description: 'Organizing community tree planting events to restore deforested areas or create urban green spaces.',
      imageUrl: treeImg,
      categories: ['save-nature']
    },
    {
      aid: 2,
      type: 'Clean-Up Drives',
      description: 'Conducting beach clean-ups, river clean-ups, and park clean-ups to remove litter and prevent pollution.',
      imageUrl: cleanImg
    },
    {
      aid: 3,
      type: 'Awareness Campaigns',
      description: 'Launching campaigns to raise awareness about environmental issues such as plastic pollution, climate change, and conservation efforts.',
      imageUrl: awareImg
    },
    {
      aid: 4,
      type: 'Shoreline Sweeping',
      description: 'Join us in keeping our coasts pristine by coming together for a day of beach cleaning and environmental stewardship. Lets make a difference, one piece of litter at a time',
      imageUrl: shoreCleaning,
      categories: ['save-nature']
    },
    {
      aid: 11,
      type: 'Other',
      description: 'Add an activity of your own interest.',
      imageUrl: otherImg
    }
  ];

  const activity = activities.find(activity => activity.aid === parseInt(id));
  const initialFormData = activity && activity.aid === 11 ? {} : (activity || {});
  const [formData, setFormData] = useState({ ...initialFormData });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const dataToSend = {
        ...formData,
        emailId: emailId // Include the emailId in the data to send
        
      };

      const response = await fetch('http://localhost:8080/api/activities/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        console.log('Activity added successfully');
        alert('Activity added successfully');
        setFormData({
          title: '',
          description: formData.description,
          place: '',
          date: '',
          time: ''
        });
        
      } else {
        const errorText = await response.text();
        console.error('Failed to add activity:', errorText);
        setErrorMessage('Failed to add activity');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error adding activity');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="aacontainer">
      <h1>{activity && activity.aid === 11 ? '' : (activity ? activity.type : 'Activity not found')}</h1>
      {activity && (
        <form onSubmit={handleSubmit}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="aaform-group">
            <label className="aalabel">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="aainput"
              required
            />
          </div>
          <div className="aaform-group">
            <label className="aalabel">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="aainput"
              required
            />
          </div>
          <div className="aaform-group">
            <label className="aalabel">Place:</label>
            <input
              type="text"
              name="place"
              value={formData.place || ''}
              onChange={handleChange}
              className="aainput"
              required
            />
          </div>
          <div className="aaform-group">
            <label className="aalabel">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date || ''}
              onChange={handleChange}
              className="aainput"
              required
            />
          </div>
          <div className="aaform-group">
            <label className="aalabel">Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time || ''}
              onChange={handleChange}
              className="aainput"
              required
            />
          </div>
          <button type="submit" className='aabutton' disabled={submitting}>Add Activity</button>
        </form>
      )}
    </div>
  );
};

export default AddActivity;
