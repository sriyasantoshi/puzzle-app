import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PuzzleGame from './components/PuzzleGame.jsx'
import ProgressTracker from './components/ProgressTracker.jsx'
import UserProfile from './components/UserProfile.jsx'
import PuzzleSubmission from './components/PuzzleSubmission.jsx'
import Home from './components/Home.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <Link to="/" className="app-logo">
            🧩 Puzzle Paradise
          </Link>
          <nav className="app-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/puzzle" className="nav-link">Play</Link>
            <Link to="/progress" className="nav-link">Progress</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/ideas" className="nav-link">Ideas</Link>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/puzzle" element={<PuzzleGame />} />
            <Route path="/progress" element={<ProgressTracker />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/ideas" element={<PuzzleSubmission />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>🌈 Made with 💜 for amazing children 🌈</p>
        </footer>
      </div>
    </Router>
  )
}

export default App