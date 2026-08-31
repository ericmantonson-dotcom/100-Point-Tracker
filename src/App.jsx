import React, { useState, useEffect } from 'react';
import './App.css';

const PointTracker = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const stored = localStorage.getItem('tracker-activities');
      if (stored) setActivities(JSON.parse(stored));
    } catch (e) {
      console.log('Fresh start');
    }
    setLoading(false);
  };

  const saveActivities = (newActivities) => {
    setActivities(newActivities);
    localStorage.setItem('tracker-activities', JSON.stringify(newActivities));
  };

  const activityTypes = [
    { label: 'Open house', points: 3, icon: '🏠' },
    { label: 'Listing appointment', points: 3, icon: '📋' },
    { label: 'Seminar', points: 3, icon: '📊' },
    { label: 'Referral received', points: 3, icon: '🎁' },
    { label: 'In-person conversation', points: 2, icon: '👥' },
    { label: 'Networking event', points: 2, icon: '🤝' },
    { label: 'Write offer', points: 2, icon: '✏️' },
    { label: 'Send referral', points: 2, icon: '📤' },
    { label: 'Phone call (2+ min)', points: 1, icon: '☎️' },
    { label: 'Add database contact', points: 1, icon: '👤' },
    { label: 'Social media post', points: 1, icon: '📱' },
    { label: 'Show attendance', points: 1, icon: '👀' },
    { label: 'Send CMA', points: 1, icon: '📄' },
    { label: 'Script/role play', points: 1, icon: '🎤' },
    { label: 'Review received', points: 1, icon: '⭐' },
  ];

  const today = new Date().toISOString().split('T')[0];
  const todayActivities = activities.filter((a) => a.date === today);
  const todayPoints = todayActivities.reduce((sum, a) => sum + a.points, 0);

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(d.setDate(diff));
    return weekStart.toISOString().split('T')[0];
  };

  const weekStart = getWeekStart(new Date());
  const weekEnd = new Date(
    new Date(weekStart).getTime() + 6 * 24 * 60 * 60 * 1000,
  )
    .toISOString()
    .split('T')[0];

  const weekActivities = activities.filter(
    (a) => a.date >= weekStart && a.date <= weekEnd,
  );
  const weekPoints = weekActivities.reduce((sum, a) => sum + a.points, 0);
  const weekPercent = Math.min((weekPoints / 100) * 100, 100);

  const addActivity = (type) => {
    const newActivity = {
      id: Date.now(),
      ...type,
      date: today,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    saveActivities([...activities, newActivity]);
  };

  const deleteActivity = (id) => {
    saveActivities(activities.filter((a) => a.id !== id));
  };

  if (loading) return <div className="loading">Loading your tracker…</div>;

  return (
    <div className="tracker-container">
      <div className="header">
        <h1>100 Point Week</h1>
        <p>Track your real productive work</p>
      </div>

      {/* Weekly Progress */}
      <div className="week-card">
        <div className="week-header">
          <h2>This week</h2>
          <span className="week-dates">
            {weekStart} to {weekEnd}
          </span>
        </div>
        <div className="week-points">
          {weekPoints} <span className="week-goal">/ 100 points</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: weekPercent + '%' }}
          ></div>
        </div>
      </div>

      {/* Today's Activities */}
      <div className="today-section">
        <h3>
          Today ({today}) — {todayPoints} points
        </h3>
        <div className="activity-grid">
          {activityTypes.map((type) => (
            <button
              key={type.label}
              className="activity-btn"
              onClick={() => addActivity(type)}
              title={`Add ${type.label}`}
            >
              <div className="activity-icon">{type.icon}</div>
              <div className="activity-label">{type.label}</div>
              <div className="activity-points">+{type.points}</div>
            </button>
          ))}
        </div>

        {todayActivities.length > 0 && (
          <div className="logged-list">
            <h4>Logged today</h4>
            <div className="activity-log">
              {todayActivities.map((activity) => (
                <div key={activity.id} className="log-item">
                  <div>
                    <div className="log-label">{activity.label}</div>
                    <div className="log-time">{activity.time}</div>
                  </div>
                  <div className="log-right">
                    <span className="log-points">+{activity.points}</span>
                    <button
                      className="delete-btn"
                      onClick={() => deleteActivity(activity.id)}
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Today</div>
          <div className="stat-value">{todayPoints}</div>
          <div className="stat-target">daily target: 20</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">This week</div>
          <div className="stat-value">{weekPoints}</div>
          <div className="stat-target">goal: 100</div>
        </div>
      </div>

      {/* Info */}
      <div className="info-box">
        ℹ️ All data saved locally. Log activities the same day for accurate
        tracking.
      </div>
    </div>
  );
};

export default PointTracker;
