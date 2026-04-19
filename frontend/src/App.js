import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import AddProblemPage from './pages/AddProblemPage';
import AddVolunteerPage from './pages/AddVolunteerPage';
import ProblemsPage from './pages/ProblemsPage';
import PredictionPage from './pages/PredictionPage';
import MapPage from './pages/MapPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-problem" element={<AddProblemPage />} />
          <Route path="/add-volunteer" element={<AddVolunteerPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/prediction" element={<PredictionPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;