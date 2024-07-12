import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <div style={{ backgroundColor: "white", width: "100%", padding: "0.2px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ marginLeft: "30px", fontSize: "35px", textAlign: "left" }}>
          <span style={{ color: "black" }}>Trial & </span>
          <span style={{ color: "#36d7b7", textDecoration: "underline" }}>Error</span>
        </h1>
        <button style={{ backgroundColor: "#36d7b7", border: "none", color: "white", padding: "10px 30px", borderRadius: "7px", fontSize: "18px", fontWeight: "bold", position: "absolute", top: "25px", right: "30px" }}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default App;
