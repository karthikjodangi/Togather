// import React, { useState } from 'react';
import React from 'react';

import shoreCleaning from '../Images/shorecleaning.jpg'
import treeImg from '../Images/tree-planting.webp'
import cleanImg from '../Images/cleaning.jpeg'
import awareImg from '../Images/awareness.png'
import otherImg from '../Images/other.jpg'

const JoinActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'Tree Planting',
      description: 'Organizing community tree planting events to restore deforested areas or create urban green spaces.',
      imageUrl: treeImg,
      categories: ['save-nature']
    },
    {
      id: 2,
      type: 'Clean-Up Drives',
      description: 'Conducting beach clean-ups, river clean-ups, and park clean-ups to remove litter and prevent pollution.',
      imageUrl: cleanImg 
    },
    {
      id: 3,
      type: 'Awareness Campaigns',
      description: 'Launching campaigns to raise awareness about environmental issues such as plastic pollution, climate change, and conservation efforts.',
      imageUrl: awareImg 
    },
    {
      id: 4,
      type: 'Shoreline Sweeping',
      description: 'Join us in keeping our coasts pristine by coming together for a day of beach cleaning and environmental stewardship. Lets make a difference, one piece of litter at a time',
      imageUrl: shoreCleaning,
      categories: ['save-nature']
    },
    {
      id: 11,
      type: 'Others',
      description: 'Add an activity of your own interest.',
      imageUrl: otherImg 
    }
  ];

  return (
    <div className="row mt-4 mb-4">
      {activities.map(activity => (
        <div key={activity.id} className="col-md-4 mb-4">
          <div className="card h-100"> 
          <img src={activity.imageUrl} className="card-img-top" alt={activity.title} style={{ height: '200px', objectFit: 'contain' }} />
            <div className="card-body">
              <h5 className="card-title">{activity.title}</h5>
              <p className="card-text">{activity.description}</p>
              <a href={`/activity/join/${activity.type}`} className="btn btn-primary">Join</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JoinActivity