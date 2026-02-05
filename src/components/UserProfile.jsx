import React, { useState } from 'react';
import { User, Camera, Heart, Award } from 'lucide-react';
import '../styles/UserProfile.css';

// Functional Component for User Profile
const UserProfile = () => {
  const [childProfile, setChildProfile] = useState({
    name: 'Your Child',
    age: '',
    favoriteColor: '#FF6B6B',
    strengths: [],
    interests: '',
    therapistNotes: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [rewards, setRewards] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChildProfile(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    localStorage.setItem('childProfile', JSON.stringify(childProfile));
    setIsEditing(false);
    alert('Profile saved successfully! 🎉');
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <User size={64} />
        <h1>👶 Child Profile & Achievements</h1>
      </div>

      <div className="profile-card">
        <h2>Personal Information</h2>
        {isEditing ? (
          <>
            <div className="form-group">
              <label>Child's Name:</label>
              <input
                type="text"
                name="name"
                value={childProfile.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={childProfile.age}
                onChange={handleInputChange}
                min="3"
                max="18"
              />
            </div>
            <div className="form-group">
              <label>Favorite Color:</label>
              <input
                type="color"
                name="favoriteColor"
                value={childProfile.favoriteColor}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn btn-save" onClick={saveProfile}>
              Save Profile
            </button>
          </>
        ) : (
          <>
            <div className="profile-info">
              <div className="info-item">
                <span className="label">Name:</span>
                <span className="value">{childProfile.name}</span>
              </div>
              <div className="info-item">
                <span className="label">Age:</span>
                <span className="value">{childProfile.age || 'Not set'}</span>
              </div>
              <div className="info-item">
                <span className="label">Favorite Color:</span>
                <div className="color-display" style={{ backgroundColor: childProfile.favoriteColor }}></div>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </>
        )}
      </div>

      <div className="achievements-section">
        <h2>🏆 Achievements & Rewards Collected</h2>
        <div className="achievements-grid">
          {rewards.length === 0 ? (
            <div className="empty-achievement">
              <Award size={48} />
              <p>No rewards yet. Keep practicing puzzles! 🎮</p>
            </div>
          ) : (
            rewards.map(reward => (
              <div key={reward.id} className="achievement-badge">
                <div className="badge-icon">{reward.icon}</div>
                <div className="badge-name">{reward.name}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
