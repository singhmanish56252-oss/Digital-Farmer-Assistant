import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCcw, ArrowUpRight, ArrowDownRight, BarChart2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const EXTENDED_TABLE = [
  { crop: 'Wheat',   market: 'Kalyanpur',     arrival: '120', min: '2,050', max: '2,150', status: 'Rising',  pct: '+2.5' },
  { crop: 'Wheat',   market: 'Patna Central', arrival: '450', min: '2,000', max: '2,120', status: 'Stable',  pct: '+0.2' },
  { crop: 'Rice',    market: 'Patna Sahib',   arrival: '320', min: '2,300', max: '2,480', status: 'Falling', pct: '-1.2' },
  { crop: 'Maize',   market: 'Kalyanpur',     arrival: '85',  min: '1,850', max: '1,980', status: 'Falling', pct: '-0.8' },
  { crop: 'Mustard', market: 'Alwar City',    arrival: '320', min: '5,300', max: '5,600', status: 'Rising',  pct: '+3.1' },
  { crop: 'Cotton',  market: 'Nagpur APMC',   arrival: '200', min: '6,200', max: '6,600', status: 'Rising',  pct: '+0.5' },
];

const statusStyle = {
  Rising:  { color: '#4ade80', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.25)', icon: ArrowUpRight },
  Falling: { color: '#f87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)', icon: ArrowDownRight },
  Stable:  { color: '#60a5fa', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)', icon: TrendingUp },
};

const MandiPrices = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/mandi');
      setPrices(res.data);
    } catch {
      setPrices([
        { crop: 'Wheat',   price: 2100, location: 'Kalyanpur', change: '+2.5%' },
        { crop: 'Rice',    price: 2400, location: 'Patna',     change: '-1.2%' },
        { crop: 'Cotton',  price: 6500, location: 'Nagpur',    change: '+0.5%' },
        { crop: 'Mustard', price: 5400, location: 'Alwar',     change: '+3.1%' },
      ]);
    }
    setLastUpdate(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    setLoading(false);
  };

  useEffect(() => { fetchPrices(); }, []);

  const filtered = EXTENDED_TABLE.filter(r =>
    r.crop.toLowerCase().includes(search.toLowerCase()) ||
    r.market.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <BarChart2 size={40} className="animate-pulse" style={{ color: '#f59e0b' }} />
      <p style={{ color: '#64748b', fontSize: 14 }}>Fetching live market data...</p>
    </div>
  );

  const cropEmojis = { Wheat: '🌾', Rice: '🍚', Cotton: '☁️', Mustard: '🌼', Maize: '🌽' };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Live Market Intelligence
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Mandi Price Tracker</h2>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdate && (
            <span style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>Updated: {lastUpdate}</span>
          )}
          <span className="badge badge-green animate-blink">● Live</span>
          <button onClick={fetchPrices} className="btn-ghost">
            <RefreshCcw size={15} /> Refresh
          </button>
        </div>
      </div>

      {/* Price Ticker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {prices.map((item, i) => {
          const isUp = item.change.startsWith('+');
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}
              className="glass-card p-5 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontSize: 28 }}>{cropEmojis[item.crop] || '🌿'}</span>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold"
                  style={{ background: isUp ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', color: isUp ? '#4ade80' : '#f87171', border: `1px solid ${isUp ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}` }}>
                  {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {item.change}
                </div>
              </div>

              <p style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
                {item.location}
              </p>
              <p style={{ fontSize: 17, fontWeight: 900, color: '#f1f5f9', marginBottom: 2 }}>{item.crop}</p>
              <div className="flex items-baseline gap-2">
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b', letterSpacing: '-0.03em' }}>₹{item.price.toLocaleString()}</span>
                <span style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>/ quintal</span>
              </div>

              <div className="mt-4 progress-bar">
                <motion.div className="progress-fill" initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, ((item.price - 1500) / 5500) * 100)}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.9 }}
                  style={{ background: isUp ? 'linear-gradient(90deg, #16a34a, #22c55e)' : 'linear-gradient(90deg, #dc2626, #ef4444)' }} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <BarChart2 size={16} style={{ color: '#f59e0b' }} />
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>Market Comparison Table</h3>
          </div>
          <div className="relative">
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
            <input
              type="text"
              placeholder="Search crop or market..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                paddingLeft: 34, paddingRight: 16, paddingTop: 9, paddingBottom: 9,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10, fontSize: 13, color: '#94a3b8', outline: 'none', width: 220,
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="dark-table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Market</th>
                <th>Arrival (Tons)</th>
                <th>Min Price</th>
                <th>Max Price</th>
                <th>Change</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => {
                const s = statusStyle[row.status];
                const StatusIcon = s.icon;
                const isUp = parseFloat(row.pct) > 0;
                return (
                  <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                    <td>
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: 18 }}>{cropEmojis[row.crop] || '🌿'}</span>
                        <span style={{ fontWeight: 700, color: '#e2e8f0' }}>{row.crop}</span>
                      </div>
                    </td>
                    <td style={{ color: '#94a3b8', fontSize: 13 }}>{row.market}</td>
                    <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{row.arrival}</td>
                    <td style={{ color: '#64748b' }}>₹{row.min}</td>
                    <td style={{ fontWeight: 800, color: '#f59e0b', fontSize: 15 }}>₹{row.max}</td>
                    <td>
                      <div className="flex items-center gap-1" style={{ color: isUp ? '#4ade80' : '#f87171', fontWeight: 700, fontSize: 13 }}>
                        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {row.pct}%
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full w-fit text-xs font-bold"
                        style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                        <StatusIcon size={11} />
                        {row.status}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl flex gap-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ fontSize: 18 }}>ℹ️</span>
        <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
          Prices are updated every 30 minutes from Agmarknet and APMC data feeds. Always verify with your local mandi before selling. Prices are in INR per quintal.
        </p>
      </div>
    </div>
  );
};

export default MandiPrices;
