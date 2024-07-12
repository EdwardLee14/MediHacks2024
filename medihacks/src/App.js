import './App.css';
import React from 'react';
import Feedback from './pages/Feedback';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div style={{ backgroundColor: "white", width: "100%", padding: "0.2px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
          <h1 style={{ marginLeft: "30px", fontSize: "35px", textAlign: "left" }}>
            <span style={{ color: "black" }}>Proto</span>
            <span style={{ color: "#36d7b7", textDecoration: "underline" }}>Score</span>
          </h1>
          <button style={{ backgroundColor: "#36d7b7", border: "none", color: "white", padding: "10px 30px", borderRadius: "7px", fontSize: "18px", fontWeight: "bold", position: "absolute", top: "25px", right: "30px" }}>
            Sign In
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
