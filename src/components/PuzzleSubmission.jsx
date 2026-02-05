import React, { useState } from 'react';
import { Lightbulb, Send, RefreshCw } from 'lucide-react';
import '../styles/PuzzleSubmission.css';

// Functional Component for Puzzle Submission/Ideas
const PuzzleSubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [formData, setFormData] = useState({
    puzzleName: '',
    description: '',
    difficulty: 'easy',
    puzzleType: 'image',
    estimatedTime: '5',
    suggestedAge: '5-8',
    theme: 'animals',
    feedback: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubmission = {
      id: Date.now(),
      ...formData,
      submittedDate: new Date().toLocaleDateString(),
      status: 'pending'
    };
    setSubmissions(prev => [newSubmission, ...prev]);
    localStorage.setItem('puzzleSubmissions', JSON.stringify([newSubmission, ...submissions]));
    
    // Reset form
    setFormData({
      puzzleName: '',
      description: '',
      difficulty: 'easy',
      puzzleType: 'image',
      estimatedTime: '5',
      suggestedAge: '5-8',
      theme: 'animals',
      feedback: ''
    });
    alert('Thank you for your puzzle idea! 🎉 We\'ll review it soon.');
  };

  const deleteSubmission = (id) => {
    const updated = submissions.filter(sub => sub.id !== id);
    setSubmissions(updated);
    localStorage.setItem('puzzleSubmissions', JSON.stringify(updated));
  };

  return (
    <div className="puzzle-submission-container">
      <div className="submission-header">
        <Lightbulb size={64} />
        <h1>💡 Puzzle Idea Submission</h1>
        <p>Share your creative puzzle ideas for autistic children!</p>
      </div>

      <form onSubmit={handleSubmit} className="submission-form">
        <h2>✏️ Submit Your Puzzle Idea</h2>

        <div className="form-group">
          <label>Puzzle Name:</label>
          <input
            type="text"
            name="puzzleName"
            placeholder="Give your puzzle a fun name"
            value={formData.puzzleName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Describe what makes your puzzle special and engaging for children..."
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Puzzle Type:</label>
            <select
              name="puzzleType"
              value={formData.puzzleType}
              onChange={handleInputChange}
            >
              <option value="image">🖼️ Image Puzzle</option>
              <option value="shape">⬜ Shape Puzzle</option>
              <option value="pattern">🔄 Pattern Puzzle</option>
              <option value="color">🎨 Color Matching</option>
              <option value="sequence">📊 Sequence</option>
            </select>
          </div>

          <div className="form-group">
            <label>Difficulty Level:</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
            >
              <option value="easy">Easy (2x2)</option>
              <option value="medium">Medium (3x3)</option>
              <option value="hard">Hard (4x4)</option>
              <option value="expert">Expert (Custom)</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Estimated Time (minutes):</label>
            <select
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleInputChange}
            >
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="20">20+ minutes</option>
            </select>
          </div>

          <div className="form-group">
            <label>Suggested Age Group:</label>
            <select
              name="suggestedAge"
              value={formData.suggestedAge}
              onChange={handleInputChange}
            >
              <option value="3-5">3-5 years</option>
              <option value="5-8">5-8 years</option>
              <option value="8-12">8-12 years</option>
              <option value="12+">12+ years</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Theme/Topic:</label>
          <select
            name="theme"
            value={formData.theme}
            onChange={handleInputChange}
          >
            <option value="animals">🦁 Animals</option>
            <option value="shapes">⭐ Shapes</option>
            <option value="nature">🌿 Nature</option>
            <option value="vehicles">🚗 Vehicles</option>
            <option value="numbers">🔢 Numbers</option>
            <option value="colors">🌈 Colors</option>
            <option value="objects">🎁 Objects</option>
          </select>
        </div>

        <div className="form-group">
          <label>Additional Feedback/Features:</label>
          <textarea
            name="feedback"
            placeholder="Any special features, sensory considerations, or accessibility notes..."
            value={formData.feedback}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-submit">
            <Send size={20} /> Submit Puzzle Idea
          </button>
          <button
            type="button"
            className="btn btn-reset"
            onClick={() => setFormData({
              puzzleName: '',
              description: '',
              difficulty: 'easy',
              puzzleType: 'image',
              estimatedTime: '5',
              suggestedAge: '5-8',
              theme: 'animals',
              feedback: ''
            })}
          >
            <RefreshCw size={20} /> Clear Form
          </button>
        </div>
      </form>

      {/* Submitted Puzzles */}
      {submissions.length > 0 && (
        <div className="submissions-list">
          <h2>📋 Your Submitted Ideas ({submissions.length})</h2>
          <div className="submissions-grid">
            {submissions.map(submission => (
              <div key={submission.id} className="submission-card">
                <div className="card-header">
                  <h3>{submission.puzzleName}</h3>
                  <span className={`status-badge status-${submission.status}`}>
                    {submission.status.toUpperCase()}
                  </span>
                </div>
                <p className="card-description">{submission.description}</p>
                <div className="card-details">
                  <div className="detail-item">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{submission.puzzleType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Difficulty:</span>
                    <span className="detail-value">{submission.difficulty}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Age:</span>
                    <span className="detail-value">{submission.suggestedAge}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Theme:</span>
                    <span className="detail-value">{submission.theme}</span>
                  </div>
                </div>
                <div className="card-meta">
                  <small>Submitted: {submission.submittedDate}</small>
                </div>
                <button
                  className="btn-delete-submission"
                  onClick={() => deleteSubmission(submission.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleSubmission;
