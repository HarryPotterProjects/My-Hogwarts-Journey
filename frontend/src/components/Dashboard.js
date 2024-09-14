import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './Dashboard.css';
import CharacterForm  from './CharacterForm'

const Dashboard = () => {
  const [page, setPage] = useState(0); // 0 for Welcome, 1 for Create Character

  // Spring animation for each section based on the page state
  const welcomeSpring = useSpring({
    opacity: page === 0 ? 1 : 0,
    transform: page === 0 ? 'translateX(0)' : 'translateX(-100%)',
  });

  const createSpring = useSpring({
    opacity: page === 1 ? 1 : 0,
    transform: page === 1 ? 'translateX(0)' : 'translateX(100%)',
  });

  return (
    <div className="dashboard">
      {/* First section */}
      <animated.div style={welcomeSpring} className="section welcome">
        <h1>Welcome to Hogwarts</h1>
      </animated.div>

      {/* Second section */}
      <animated.div style={createSpring} className="section create">
        <CharacterForm/>
      </animated.div>

      {/* Button for Navigation */}
      <button className="nav-buttons" onClick={() => setPage(page === 0 ? 1 : 0)}>
        {page === 0 ? '→' : '←'}
      </button>
    </div>
  );
};

export default Dashboard;
