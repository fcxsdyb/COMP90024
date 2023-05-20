import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import General from './pages/General';
import Scenario1 from './pages/Scenario1';
import Scenario2 from './pages/Scenario2';
import Scenario3 from './pages/Scenario3';
import Scenario4 from './pages/Scenario4';
import './App.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/general" element={<General />} />
        <Route path="/scenario1" element={<Scenario1 />} />
        <Route path="/scenario2" element={<Scenario2 />} />
        <Route path="/scenario3" element={<Scenario3 />} />
        <Route path="/scenario4" element={<Scenario4 />} />
      </Routes>
    </div>
  );
}

export default App;
