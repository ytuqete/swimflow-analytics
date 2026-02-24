import { useEffect, useState } from 'react'
import './App.css'
import Chart from './Chart';

function App() {
  const [sessions, setSessions] = useState([]);
  const [form, setForm] = useState({ name: '', time: '', strokes: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('light-theme');
  };

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/sessions');
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      setSessions(data);
      setError(null);
    } catch (err) {
      setError("Could not connect to the database!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSessions(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.time || !form.strokes) {
      setError("All fields are required!");
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (parseFloat(form.time) <= 0 || parseInt(form.strokes) <= 0) {
      setError("Values must be positive!");
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setForm({ name: '', time: '', strokes: '' });
        setError(null);
        fetchSessions();
      }
    } catch (err) { 
      setError("Error while saving data!");
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteSession = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    await fetch(`http://localhost:5000/api/sessions/${id}`, { method: 'DELETE' });
    fetchSessions();
  };

  return (
    <div className="App">
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1>🌊 SwimFlow</h1>
      <p className="subtitle">Professional Swimming Training Analytics</p>

      {!loading && sessions.length > 0 && (
        <Chart data={sessions} darkMode={darkMode} />
      )}

      <form onSubmit={handleSubmit} className="swim-form">
        <input placeholder="Swimmer name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input type="number" placeholder="Time (s)" value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
        <input type="number" placeholder="Strokes" value={form.strokes} onChange={e => setForm({...form, strokes: e.target.value})} />
        <button type="submit">Add Session</button>
      </form>

      {error && <div className="error-banner">{error}</div>}

      <div className="dashboard">
        {loading ? <p>Fetching data...</p> : sessions.length === 0 ? (
          <p style={{ gridColumn: '1/-1' }}>No sessions found. Add your first workout!</p>
        ) : (
          sessions.map(s => (
            <div key={s._id} className="session-card">
              <button onClick={() => deleteSession(s._id)} className="delete-btn">×</button>
              <h3>{s.name}</h3>
              <div className="stats">
                <p>⏱ Time: <strong>{s.time}s</strong></p>
                <p>⚡ Power: <strong>{s.powerWatts}W</strong></p>
                <p>📊 SWOLF: <strong>{s.swolf}</strong></p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;