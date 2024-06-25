import React, { useState, useEffect } from 'react';
import Header from './MyComponents/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './MyComponents/Footer';
import { useNavigate, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import About from './MyComponents/About';
import MyActivities from './MyComponents/MyActivities';
import Buddies from './MyComponents/Buddies';
import CreateActivity from './MyComponents/CreateActivity';
import JoinActivity from './MyComponents/JoinActivity';
import Activities from './MyComponents/Activities';
import './App.css';
import Login from './MyComponents/Login';
import SignUp from './MyComponents/SignUp';
import sereneImg from './Images/serene.png';
import AddActivity from './MyComponents/AddActivity';
import JoinActivityByType from './MyComponents/JoinActivityByType';
import BuddyProfile from './MyComponents/BuddyProfile';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img src={sereneImg} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="500" height="500" loading="lazy" />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Let's get <span className="green-text">GREEN</span> 2Gather</h1>
          <p className="lead">Join the fun on our app! Gather your crew for eco-adventures, from tree planting to beach cleanups. Save cash by teaming up with pals for group activities and enjoy making a positive impact on nature. Create or join groups focusing on sustainable development goals. Let's have a blast while saving the planet and our wallets! 🌿👫💰 <span className="blue-text">#SustainableSquadGoals</span></p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2"
              onClick={() => navigate("/createActivity")}>Create Activity</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4"
              onClick={() => navigate("/joinActivity")}>Join Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserEmail = localStorage.getItem('userEmail');
    console.log('Stored isLoggedIn:', storedIsLoggedIn);
    console.log('Stored userEmail:', storedUserEmail);
    if (storedIsLoggedIn === 'true' && storedUserEmail) {
      setIsLoggedIn(true);
      setUserEmail(storedUserEmail);
    }
  }, []);

  console.log('Current isLoggedIn:', isLoggedIn);
  console.log('Current userEmail:', userEmail);

  return (
    <div className="app-container">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userEmail={userEmail} />

      <Router>
        <div className="content-container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />} />
            <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />} />
            <Route path="/activity/create/:id" element={<AddActivity />} />
            <Route path="/activity/join/:type" element={<JoinActivityByType />} />
            <Route path="/activities/:selectedCategory" element={<Activities />} />
            {/* Route for MyActivities, only accessible if isLoggedIn is true */}
            {storedIsLoggedIn ? (
              <>
                <Route path="/buddies" element={<Buddies isLoggedIn={isLoggedIn} />} />
                <Route path="/myactivities" element={<MyActivities isLoggedIn={isLoggedIn} />} />
                <Route path="/createActivity" element={<CreateActivity />} />
                <Route path="/joinActivity" element={<JoinActivity />} />
                <Route path="/buddies/profile/:buddyEmailId" element={<BuddyProfile />} />
              </>
            ) : (
              <>
              <Route path="/myactivities" element={<Navigate to="/login" />} />
              <Route path="/buddies" element={<Navigate to="/login" />} />
              <Route path="/createActivity" element={<Navigate to="/login" />} />
              <Route path="/joinActivity" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </div>
      </Router>

      <Footer />
    </div>
  );
};

export default App;