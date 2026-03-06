import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import BreathingTool from './pages/BreathingTool'
import FeelingCheckin from './pages/FeelingCheckin'
import WeekMission from './pages/WeekMission'
import Roadmap from './pages/Roadmap'
import Header from './components/Header'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/breathe" element={<BreathingTool />} />
            <Route path="/feelings/:weekId" element={<FeelingCheckin />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/mission/:weekId" element={<WeekMission />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
