import React from 'react';
import './styles/Homepage.css';
import {Link} from 'react-router-dom';

function Homepage() {
  return (
    <div className="homepage-container">
      <h1>Create Surveys with Ease</h1>
      <p>Design, distribute, and analyze surveys all in one platform.</p>
      <Link to="/survey/create" >
        <button className="btn-start">Get Started</button>
      </Link>
    </div>
  );
}

export default Homepage;