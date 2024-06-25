import React from 'react';
import natureImg from '../Images/nature.webp';

const Buddies = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100vw',
    height: '95vh',
    margin: 0,
    padding: '20px 0',
    backgroundImage: `url(${natureImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    textAlign: 'center',
    fontSize: '2em',
    fontFamily: 'Arial, sans-serif',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    boxSizing: 'border-box',
    overflow: 'hidden',
  };

  const textStyle = {
    margin: 0,
    padding: '10px 20px',
    backgroundColor: 'rgba(0,0,0,0.8',
    borderRadius: '10px',

  };

  return (
    <div style={containerStyle}>
      <div style={textStyle}>
        This feature is not available yet, till then <br></br>
        Play with your best buddy NATURE 🌳 <br></br>
        Go create and join nature conservation activities! 🌿
      </div>
    </div>
  );
}

export default Buddies;
