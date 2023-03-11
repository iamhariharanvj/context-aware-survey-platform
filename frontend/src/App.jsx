import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </nav>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form>
          <label>Instagram username:</label>
          <input type="text" name="instagram" />

          <label>Github username:</label>
          <input type="text" name="github" />

          <button className="google-btn">
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}
export default App;