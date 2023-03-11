import React from 'react';
import './About.css';

function About() {
  return (
    <div className="container">
      <div className="content">
        <h1>ABOUT US</h1>
        
        <p>We are a team of researchers who are interested in understanding how context influences people's experiences, behaviors, and attitudes. Our goal is to design and conduct surveys that are sensitive to the user's context, in order to provide more accurate and meaningful data.</p>
      </div>
      <div className="image">
        <img src="https://thumbs.dreamstime.com/b/flat-vector-illustration-us-website-page-template-company-profile-team-information-us-page-concept-flat-214798803.jpg" alt="description of the image" />
      </div>
    </div>
  );
}

export default About;
