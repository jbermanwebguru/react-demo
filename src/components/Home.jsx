import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Player Roster</h1>

      <Link className="button" to="/login">Login</Link>

      <Link className="button" to="/register">Register</Link>
    </div>
  );
};

export default Home;
