import React from 'react';
import { useLocation } from 'react-router-dom';


function Dashboard() {
  const location = useLocation();
  const { username } = location.state || {};
  return (
    <div>Welcome to your Dashboard {username}</div>
  )
}

export default Dashboard