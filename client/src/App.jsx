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
      if (!response.ok) throw new Error('Błąd serwera');
      const data = await response.json();
      setSessions(data);
      setError(null);
    } catch (err) {
      setError("Nie można połączyć się z bazą danych!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSessions(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Walidacja zamiast alertów
    if (!form.name.trim() || !form.time || !form.strokes) {
      setError("Wszystkie pola są wymagane!");
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (parseFloat(form.time) <= 0 || parseInt(form.strokes) <= 0) {
      setError("Wartości muszą być dodatnie!");
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
      setError("Błąd podczas zapisywania danych!");
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteSession = async (id) => {
    if (!window.confirm("Na pewno usunąć ten rekord?")) return;
    await fetch(`http://localhost:5000/api/sessions/${id}`, { method: 'DELETE' });
    fetchSessions();
  };

  return (
    <div className="App">
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1>🌊 SwimFlow</h1>
      <p className="subtitle">Profesjonalna Analityka Treningu Pływackiego</p>

      {!loading && sessions.length > 0 && (
        <Chart data={sessions} darkMode={darkMode} />
      )}

      <form onSubmit={handleSubmit} className="swim-form">
        <input placeholder="Pływak" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input type="number" placeholder="Czas (s)" value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
        <input type="number" placeholder="Ruchy" value={form.strokes} onChange={e => setForm({...form, strokes: e.target.value})} />
        <button type="submit">Dodaj sesję</button>
      </form>

      {/* BANER BŁĘDU */}
      {error && <div className="error-banner">{error}</div>}

      <div className="dashboard">
        {loading ? <p>Pobieranie danych...</p> : sessions.length === 0 ? (
          <p style={{ gridColumn: '1/-1' }}>Brak sesji. Dodaj pierwszy trening!</p>
        ) : (
          sessions.map(s => (
            <div key={s._id} className="session-card">
              <button onClick={() => deleteSession(s._id)} className="delete-btn">×</button>
              <h3>{s.name}</h3>
              <div className="stats">
                <p>⏱ Czas: <strong>{s.time}s</strong></p>
                <p>⚡ Moc: <strong>{s.powerWatts}W</strong></p>
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