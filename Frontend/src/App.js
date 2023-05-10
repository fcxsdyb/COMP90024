import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DataAnalysis from './pages/Scenario1';
import './App.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scenario11" element={<DataAnalysis />} />
      </Routes>
    </div>
  );
}

export default App;
