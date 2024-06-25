import React from 'react';

const About = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="text-center mb-4 text-primary fw-bold">About 2Gather</h1>
          <p className="fs-5">Welcome to <span className="text-primary fw-bold">2Gather</span>, where <span className="text-success fw-bold">community</span> meets <span className="text-danger fw-bold">sustainability</span>!</p>
          
          <div className="mb-3">
            <h3>Our Mission</h3>
            <p className="fs-5">At <span className="text-primary fw-bold">2Gather</span>, we're on a mission to <span className="text-success fw-bold" style={{color: '#2E8B57'}}>connect</span> individuals who are passionate about <span className="text-danger fw-bold">environmental conservation</span> and <span className="text-danger fw-bold">sustainable living</span>.</p>
          </div>
          
          <div className="mb-3">
            <h3>What We Do</h3>
            <p className="fs-5">Our platform empowers users to <span className="text-success fw-bold" style={{color: '#2E8B57'}}>create</span> and <span className="text-success fw-bold" style={{color: '#2E8B57'}}>join</span> groups focused on activities aligned with <span className="text-primary fw-bold">#SDG2</span>, <span className="text-primary fw-bold">#SDG12</span>, and <span className="text-primary fw-bold">#SDG15</span>.</p>
          </div>
          
          <div className="mb-3">
            <h3>How It Works</h3>
            <p className="fs-5">Discover a wide range of activities, from <span className="text-danger fw-bold">tree planting</span> to <span className="text-danger fw-bold">beach cleanups</span>. Create your own activities or join existing ones, and <span className="text-success fw-bold" style={{color: '#2E8B57'}}>connect</span> with like-minded individuals committed to <span className="text-danger fw-bold">environmental stewardship</span>.</p>
          </div>
          
          <div className="mb-3">
            <h3>Join Us</h3>
            <p className="fs-5">Join our <span className="text-primary fw-bold">community</span> today and be a part of the <span className="text-danger fw-bold">#SustainableSquadGoals</span>! Together, we can make a meaningful impact on the planet and future generations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
