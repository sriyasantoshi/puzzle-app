import React from 'react';
import { Gamepad2, BarChart3, User, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      title: 'Play Puzzle',
      description: 'Start solving fun puzzles!',
      icon: '🧩',
      path: '/puzzle',
      color: '#FF6B6B'
    },
    {
      id: 2,
      title: 'Progress Tracker',
      description: 'Track achievements and celebrate wins!',
      icon: '🏆',
      path: '/progress',
      color: '#4ECDC4'
    },
    {
      id: 3,
      title: 'Child Profile',
      description: 'Manage child info and rewards',
      icon: '👶',
      path: '/profile',
      color: '#FFE66D'
    },
    {
      id: 4,
      title: 'Puzzle Ideas',
      description: 'Share your creative puzzle ideas',
      icon: '💡',
      path: '/ideas',
      color: '#95E1D3'
    }
  ];

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>🎮 Welcome to Puzzle Paradise!</h1>
        <p>A fun and therapeutic puzzle app for autistic children</p>
      </div>

      <div className="menu-grid">
        {menuItems.map(item => (
          <div
            key={item.id}
            className="menu-card"
            style={{ borderLeft: `5px solid ${item.color}` }}
            onClick={() => navigate(item.path)}
          >
            <div className="card-icon">{item.icon}</div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button className="card-button">Start →</button>
          </div>
        ))}
      </div>

      <div className="features-section">
        <h2>✨ Features</h2>
        <div className="features-list">
          <div className="feature">
            <span>🎨</span>
            <p>Colorful and engaging visuals</p>
          </div>
          <div className="feature">
            <span>🎧</span>
            <p>Sensory-friendly options</p>
          </div>
          <div className="feature">
            <span>📊</span>
            <p>Progress tracking</p>
          </div>
          <div className="feature">
            <span>🏆</span>
            <p>Reward system</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
