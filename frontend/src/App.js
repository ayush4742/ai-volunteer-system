import React from "react";
import "./App.css";

import Dashboard from "./components/Dashboard";
import AddProblem from "./components/AddProblem";
import AddVolunteer from "./components/AddVolunteer";
import ProblemList from "./components/ProblemList";
import Prediction from "./components/Prediction";

function App() {
  return (
    <div className="container">
      <h1>🚀 AI Crisis Management System</h1>

      <Dashboard />
      <AddProblem />
      <AddVolunteer />
      <ProblemList />
      <Prediction />
    </div>
  );
}

export default App;