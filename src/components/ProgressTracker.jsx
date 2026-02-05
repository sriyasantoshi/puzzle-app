import React, { useState, useEffect } from 'react';
import { Calendar, Award, Trash2, Plus, BarChart3, Smile, MessageCircle } from 'lucide-react';
import '../styles/ProgressTracker.css';

// Class Component for ProgressTracker
class ProgressTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressLogs: [],
      goals: [],
      sensoryPreferences: {
        preferredColors: '#FF6B6B',
        soundSensitivity: 'moderate',
        favoriteThemes: ['animals', 'shapes'],
        bestTimeOfDay: 'morning'
      },
      showProgressForm: false,
      showGoalForm: false,
      showSensoryForm: false,
      formData: {
        date: new Date().toISOString().split('T')[0],
        puzzleCompleted: 'Puzzle 1',
        timeSpent: 5,
        difficultyAttempted: 'easy',
        moodLevel: '😊',
        assistanceNeeded: 'none',
        notes: ''
      },
      goalFormData: {
        goalDescription: '',
        targetDate: '',
        rewardType: 'sticker',
        completed: false
      }
    };
  }

  componentDidMount() {
    const saved = localStorage.getItem('progressLogs');
    const savedGoals = localStorage.getItem('goals');
    const savedPreferences = localStorage.getItem('sensoryPreferences');

    if (saved) this.setState({ progressLogs: JSON.parse(saved) });
    if (savedGoals) this.setState({ goals: JSON.parse(savedGoals) });
    if (savedPreferences) this.setState({ sensoryPreferences: JSON.parse(savedPreferences) });
  }

  saveToLocalStorage = () => {
    localStorage.setItem('progressLogs', JSON.stringify(this.state.progressLogs));
    localStorage.setItem('goals', JSON.stringify(this.state.goals));
    localStorage.setItem('sensoryPreferences', JSON.stringify(this.state.sensoryPreferences));
  }

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: { ...prevState.formData, [name]: value }
    }));
  }

  handleMoodSelect = (mood) => {
    this.setState(prevState => ({
      formData: { ...prevState.formData, moodLevel: mood }
    }));
  }

  addProgressLog = (e) => {
    e.preventDefault();
    const newLog = {
      id: Date.now(),
      ...this.state.formData,
      timestamp: new Date().toLocaleString()
    };

    this.setState(prevState => ({
      progressLogs: [newLog, ...prevState.progressLogs],
      showProgressForm: false,
      formData: {
        date: new Date().toISOString().split('T')[0],
        puzzleCompleted: 'Puzzle 1',
        timeSpent: 5,
        difficultyAttempted: 'easy',
        moodLevel: '😊',
        assistanceNeeded: 'none',
        notes: ''
      }
    }), this.saveToLocalStorage);
  }

  deleteProgressLog = (id) => {
    this.setState(prevState => ({
      progressLogs: prevState.progressLogs.filter(log => log.id !== id)
    }), this.saveToLocalStorage);
  }

  addGoal = (e) => {
    e.preventDefault();
    const newGoal = {
      id: Date.now(),
      ...this.state.goalFormData,
      createdDate: new Date().toLocaleDateString()
    };

    this.setState(prevState => ({
      goals: [newGoal, ...prevState.goals],
      showGoalForm: false,
      goalFormData: {
        goalDescription: '',
        targetDate: '',
        rewardType: 'sticker',
        completed: false
      }
    }), this.saveToLocalStorage);
  }

  toggleGoalCompletion = (id) => {
    this.setState(prevState => ({
      goals: prevState.goals.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    }), this.saveToLocalStorage);
  }

  deleteGoal = (id) => {
    this.setState(prevState => ({
      goals: prevState.goals.filter(goal => goal.id !== id)
    }), this.saveToLocalStorage);
  }

  updateSensoryPreferences = (field, value) => {
    this.setState(prevState => ({
      sensoryPreferences: { ...prevState.sensoryPreferences, [field]: value }
    }), this.saveToLocalStorage);
  }

  getStatistics = () => {
    const logs = this.state.progressLogs;
    const totalSessions = logs.length;
    const totalTimeMinutes = logs.reduce((sum, log) => sum + parseInt(log.timeSpent), 0);
    const independentAttempts = logs.filter(log => log.assistanceNeeded === 'none').length;
    
    return {
      totalSessions,
      totalTimeMinutes,
      independentAttempts,
      completedGoals: this.state.goals.filter(g => g.completed).length
    };
  }

  getRecentLogs = () => {
    return this.state.progressLogs.slice(0, 7);
  }

  render() {
    const moodOptions = ['😢', '😐', '😊', '😄', '🎉'];
    const stats = this.getStatistics();
    const recentLogs = this.getRecentLogs();

    return (
      <div className="progress-tracker-container">
        <div className="progress-header">
          <h1>🏆 Progress Tracker & Reward System</h1>
          <p>Track puzzles, celebrate achievements, and reach goals!</p>
        </div>

        {/* Statistics Dashboard */}
        <div className="stats-dashboard">
          <div className="stat-card stat-sessions">
            <div className="stat-number">{stats.totalSessions}</div>
            <div className="stat-label">Puzzle Sessions</div>
          </div>
          <div className="stat-card stat-time">
            <div className="stat-number">{stats.totalTimeMinutes}</div>
            <div className="stat-label">Minutes Played</div>
          </div>
          <div className="stat-card stat-independent">
            <div className="stat-number">{stats.independentAttempts}</div>
            <div className="stat-label">Independent Attempts</div>
          </div>
          <div className="stat-card stat-goals">
            <div className="stat-number">{stats.completedGoals}</div>
            <div className="stat-label">Goals Completed</div>
          </div>
        </div>

        {/* Main Buttons */}
        <div className="main-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => this.setState({ showProgressForm: !this.state.showProgressForm })}
          >
            <Plus size={24} /> Log Progress
          </button>
          <button 
            className="btn btn-success"
            onClick={() => this.setState({ showGoalForm: !this.state.showGoalForm })}
          >
            <Award size={24} /> Add Goal
          </button>
          <button 
            className="btn btn-info"
            onClick={() => this.setState({ showSensoryForm: !this.state.showSensoryForm })}
          >
            ⚙️ Settings
          </button>
        </div>

        {/* Progress Form */}
        {this.state.showProgressForm && (
          <form onSubmit={this.addProgressLog} className="progress-form">
            <h2>📝 Log Today's Puzzle Progress</h2>

            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={this.state.formData.date}
                onChange={this.handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Puzzle Completed:</label>
              <select
                name="puzzleCompleted"
                value={this.state.formData.puzzleCompleted}
                onChange={this.handleFormChange}
              >
                <option>Puzzle 1 (Easy)</option>
                <option>Puzzle 2 (Medium)</option>
                <option>Puzzle 3 (Hard)</option>
                <option>Custom Puzzle</option>
              </select>
            </div>

            <div className="form-group">
              <label>Time Spent (minutes):</label>
              <input
                type="number"
                name="timeSpent"
                value={this.state.formData.timeSpent}
                onChange={this.handleFormChange}
                min="1"
                max="120"
              />
            </div>

            <div className="form-group">
              <label>Difficulty Attempted:</label>
              <select
                name="difficultyAttempted"
                value={this.state.formData.difficultyAttempted}
                onChange={this.handleFormChange}
              >
                <option value="easy">Easy (2x2)</option>
                <option value="medium">Medium (3x3)</option>
                <option value="hard">Hard (4x4)</option>
              </select>
            </div>

            <div className="form-group">
              <label>How are you feeling?</label>
              <div className="mood-selector">
                {moodOptions.map(mood => (
                  <button
                    key={mood}
                    type="button"
                    className={`mood-btn ${this.state.formData.moodLevel === mood ? 'selected' : ''}`}
                    onClick={() => this.handleMoodSelect(mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Assistance Needed:</label>
              <div className="radio-group">
                {['none', 'minimal', 'moderate', 'full'].map(option => (
                  <label key={option} className="radio-label">
                    <input
                      type="radio"
                      name="assistanceNeeded"
                      value={option}
                      checked={this.state.formData.assistanceNeeded === option}
                      onChange={this.handleFormChange}
                    />
                    <span className="radio-text">
                      {option.charAt(0).toUpperCase() + option.slice(1)} Support
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Notes:</label>
              <textarea
                name="notes"
                value={this.state.formData.notes}
                onChange={this.handleFormChange}
                placeholder="Any observations or comments..."
                rows="3"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn btn-save">Save Progress</button>
              <button 
                type="button" 
                className="btn btn-cancel"
                onClick={() => this.setState({ showProgressForm: false })}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Goal Form */}
        {this.state.showGoalForm && (
          <form onSubmit={this.addGoal} className="goal-form">
            <h2>🎯 Set a New Goal</h2>

            <div className="form-group">
              <label>Goal Description:</label>
              <input
                type="text"
                placeholder="e.g., Complete 5-piece puzzle independently"
                value={this.state.goalFormData.goalDescription}
                onChange={(e) => this.setState(prevState => ({
                  goalFormData: { ...prevState.goalFormData, goalDescription: e.target.value }
                }))}
                required
              />
            </div>

            <div className="form-group">
              <label>Target Date:</label>
              <input
                type="date"
                value={this.state.goalFormData.targetDate}
                onChange={(e) => this.setState(prevState => ({
                  goalFormData: { ...prevState.goalFormData, targetDate: e.target.value }
                }))}
                required
              />
            </div>

            <div className="form-group">
              <label>Reward When Complete:</label>
              <select
                value={this.state.goalFormData.rewardType}
                onChange={(e) => this.setState(prevState => ({
                  goalFormData: { ...prevState.goalFormData, rewardType: e.target.value }
                }))}
              >
                <option value="sticker">🌟 Sticker</option>
                <option value="badge">🏅 Badge</option>
                <option value="celebration">🎉 Celebration</option>
                <option value="trophy">🏆 Trophy</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn btn-save">Create Goal</button>
              <button 
                type="button" 
                className="btn btn-cancel"
                onClick={() => this.setState({ showGoalForm: false })}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Sensory Preferences Form */}
        {this.state.showSensoryForm && (
          <div className="sensory-form">
            <h2>⚙️ Sensory Preferences</h2>

            <div className="form-group">
              <label>Preferred Color:</label>
              <input
                type="color"
                value={this.state.sensoryPreferences.preferredColors}
                onChange={(e) => this.updateSensoryPreferences('preferredColors', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Sound Sensitivity:</label>
              <select
                value={this.state.sensoryPreferences.soundSensitivity}
                onChange={(e) => this.updateSensoryPreferences('soundSensitivity', e.target.value)}
              >
                <option value="silent">🔇 Silent Only</option>
                <option value="quiet">🔕 Very Quiet</option>
                <option value="moderate">🔊 Moderate</option>
                <option value="loud">🔉 Normal Volume</option>
              </select>
            </div>

            <div className="form-group">
              <label>Favorite Puzzle Themes:</label>
              <div className="checkbox-group">
                {['animals', 'shapes', 'numbers', 'colors', 'vehicles'].map(theme => (
                  <label key={theme} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={this.state.sensoryPreferences.favoriteThemes.includes(theme)}
                      onChange={(e) => {
                        const themes = this.state.sensoryPreferences.favoriteThemes;
                        if (e.target.checked) {
                          this.updateSensoryPreferences('favoriteThemes', [...themes, theme]);
                        } else {
                          this.updateSensoryPreferences('favoriteThemes', themes.filter(t => t !== theme));
                        }
                      }}
                    />
                    <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Best Time of Day:</label>
              <select
                value={this.state.sensoryPreferences.bestTimeOfDay}
                onChange={(e) => this.updateSensoryPreferences('bestTimeOfDay', e.target.value)}
              >
                <option value="morning">🌅 Morning</option>
                <option value="afternoon">🌤️ Afternoon</option>
                <option value="evening">🌆 Evening</option>
                <option value="flexible">⏰ Flexible</option>
              </select>
            </div>

            <button 
              className="btn btn-cancel"
              onClick={() => this.setState({ showSensoryForm: false })}
            >
              Close Settings
            </button>
          </div>
        )}

        {/* Progress Logs Display */}
        <div className="logs-section">
          <h2>📅 Recent Progress (Last 7 Days)</h2>
          {recentLogs.length === 0 ? (
            <div className="empty-state">
              <MessageCircle size={48} />
              <p>No logs yet. Start by logging your first puzzle session!</p>
            </div>
          ) : (
            <div className="logs-grid">
              {recentLogs.map(log => (
                <div key={log.id} className="log-card">
                  <div className="log-header">
                    <span className="log-date">{log.date}</span>
                    <button
                      className="btn-delete"
                      onClick={() => this.deleteProgressLog(log.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="log-mood">{log.moodLevel}</div>
                  <div className="log-puzzle">{log.puzzleCompleted}</div>
                  <div className="log-time">⏱️ {log.timeSpent} min</div>
                  <div className="log-difficulty">
                    📊 {log.difficultyAttempted.toUpperCase()}
                  </div>
                  <div className="log-assistance">
                    👤 {log.assistanceNeeded === 'none' ? '✨ Independent' : log.assistanceNeeded}
                  </div>
                  {log.notes && <div className="log-notes">📝 {log.notes}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Goals Display */}
        <div className="goals-section">
          <h2>🎯 Active Goals</h2>
          {this.state.goals.length === 0 ? (
            <div className="empty-state">
              <Award size={48} />
              <p>No goals yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="goals-list">
              {this.state.goals.map(goal => (
                <div key={goal.id} className={`goal-card ${goal.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => this.toggleGoalCompletion(goal.id)}
                    className="goal-checkbox"
                  />
                  <div className="goal-content">
                    <h3>{goal.goalDescription}</h3>
                    <div className="goal-details">
                      <span>📅 Target: {goal.targetDate}</span>
                      <span>🎁 Reward: {goal.rewardType}</span>
                    </div>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => this.deleteGoal(goal.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProgressTracker;
