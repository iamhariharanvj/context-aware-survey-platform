import React from "react";
import "./styles.css";

function App() {
  return (
    <div className="container">
      <h1 className="title">Contact Us</h1>
      <div className="contact-options">
        <div className="option">
          <i className="fas fa-envelope"></i>
          <p>Mail Us</p>
        </div>
        <div className="option">
          <i className="fas fa-phone-alt"></i>
          <p>Call Us</p>
        </div>
        <div className="option">
          <i className="fas fa-headset"></i>
          <p>Support</p>
        </div>
      </div>
    </div>
  );
}

export default App;
