import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#726a95' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3em', color: 'white', marginTop: '1em', marginBottom: '0.5em', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Survey</h1>
      <form className="survey-form" style={{ margin: 'auto', maxWidth: '500px', padding: '2em', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}>
        <label htmlFor="survey-question" style={{ display: 'block', fontSize: '1.5em', marginBottom: '0.5em', color: '#726a95' }}>What is your favorite brand of shoes?</label>
        <div style={{ height: '1em' }}></div>
        <label htmlFor="answer" style={{ display: 'block', fontSize: '1.5em', marginBottom: '0.5em', color: '#726a95' }}>Your answer:</label>
        <input type="text" id="answer" name="answer" style={{ fontSize: '1.2em', padding: '0.5em', width: '100%', boxSizing: 'border-box', border: 'none', borderBottom: '2px solid #726a95' }} placeholder="Enter your answer here" />
        <div style={{ height: '1em' }}></div>
        <button type="submit" style={{ backgroundColor: '#726a95', color: 'white', padding: '0.5em 1em', fontSize: '1.2em', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default App;







