import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Chart = ({ data, darkMode }) => {
  const chartData = data.map(s => ({
    name: s.name,
    power: s.powerWatts,
    swolf: s.swolf,
    date: new Date(s.date).toLocaleDateString()
  }));

  const colors = {
    grid: darkMode ? '#334155' : '#e2e8f0',
    tooltipBg: darkMode ? '#1e293b' : '#ffffff'
  };

  return (
    <div style={{ width: '100%', background: 'var(--card-bg)', padding: '20px', borderRadius: '24px', border: '1px solid var(--border)', marginBottom: '30px', boxSizing: 'border-box' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
          <XAxis dataKey="date" hide />
          <YAxis yAxisId="left" stroke="#38bdf8" fontSize={12} domain={[0, 'auto']} />
          <YAxis yAxisId="right" orientation="right" stroke="#4ade80" fontSize={12} domain={['auto', 'auto']} />
          <Tooltip contentStyle={{ backgroundColor: colors.tooltipBg, borderRadius: '12px', border: 'none' }} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="power" name="Moc (W)" stroke="#38bdf8" strokeWidth={4} dot={{ r: 4 }} />
          <Line yAxisId="right" type="monotone" dataKey="swolf" name="SWOLF" stroke="#4ade80" strokeWidth={4} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;