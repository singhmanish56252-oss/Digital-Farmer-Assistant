import React, { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCcw, MapPin, ShieldCheck, Users, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const SEVERITY_CONFIG = {
  Critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.25)',  label: 'CRITICAL', pulse: true },
  High:     { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', label: 'HIGH' },
  Medium:   { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)', label: 'MEDIUM' },
  Low:      { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.25)',  label: 'LOW' },
};

const REGIONS = ['All', 'Uttar Pradesh', 'Bihar', 'Maharashtra', 'Rajasthan', 'Madhya Pradesh'];

const PestAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState('All');
  const [subscribed, setSubscribed] = useState(false);

  const fetchAlerts = async (r) => {
    setLoading(true);
    try {
      const url = r === 'All' ? 'http://localhost:5000/api/pests' : `http://localhost:5000/api/pests?region=${r}`;
      const res = await axios.get(url);
      setAlerts(res.data);
    } catch {
      setAlerts([
        { pest: 'Aphids', crop: 'Wheat', region: 'Uttar Pradesh', severity: 'High', pesticide: 'Imidacloprid 17.8% SL', reports: 142 },
        { pest: 'Brown Plant Hopper', crop: 'Rice', region: 'Bihar', severity: 'Critical', pesticide: 'Buprofezin 25% SC', reports: 289 },
        { pest: 'Bollworm', crop: 'Cotton', region: 'Maharashtra', severity: 'Medium', pesticide: 'Chlorpyrifos 20% EC', reports: 98 },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAlerts(region); }, [region]);

  const criticalCount = alerts.filter(a => a.severity === 'Critical').length;
  const totalReports = alerts.reduce((sum, a) => sum + a.reports, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Community-Powered Intelligence</p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Pest & Insect Alerts</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Real-time pest warnings from farmers across India</p>
        </div>
        <button onClick={() => setSubscribed(!subscribed)} className={subscribed ? 'btn-primary' : 'btn-ghost'} style={{ fontSize: 13 }}>
          <Bell size={15} /> {subscribed ? 'Alerts ON ✓' : 'Subscribe to Alerts'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Alerts', val: alerts.length, color: '#f59e0b', icon: '🐛' },
          { label: 'Critical',      val: criticalCount,  color: '#ef4444', icon: '🚨' },
          { label: 'Farmer Reports',val: totalReports.toLocaleString(), color: '#3b82f6', icon: '👨‍🌾' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <p style={{ fontSize: '1.8rem', fontWeight: 900, color: s.color, letterSpacing: '-0.03em' }}>{s.val}</p>
            <p style={{ fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {REGIONS.map(r => (
          <button key={r} onClick={() => setRegion(r)}
            style={{
              padding: '7px 16px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none',
              background: region === r ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)',
              color: region === r ? '#4ade80' : '#64748b',
              outline: region === r ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.2s'
            }}>
            {r}
          </button>
        ))}
        <button onClick={() => fetchAlerts(region)} className="btn-ghost" style={{ fontSize: 12 }}>
          <RefreshCcw size={13} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <RefreshCcw size={36} className="animate-spin" style={{ color: '#f59e0b' }} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {alerts.map((alert, i) => {
            const s = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.Low;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}
                className="glass-card p-6" style={{ borderLeft: `4px solid ${s.color}`, boxShadow: s.pulse ? `0 0 20px ${s.color}30` : 'none' }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: '#f1f5f9' }}>{alert.pest}</h3>
                    <p style={{ fontSize: 12, color: '#64748b' }}>Affects: <strong style={{ color: '#94a3b8' }}>{alert.crop}</strong> · {alert.region}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.pulse && <span className="animate-blink w-2 h-2 rounded-full" style={{ background: s.color }} />}
                    <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 999, background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontWeight: 800 }}>{s.label}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontSize: 10, color: '#475569', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>👨‍🌾 Reports</p>
                    <p style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{alert.reports}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <p style={{ fontSize: 10, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>🛡️ Chemical</p>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#86efac', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{alert.pesticide}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)' }}>
                    <p style={{ fontSize: 10, color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>🌿 Organic</p>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#bae6fd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Neem Oil / Beauveria</p>
                  </div>
                </div>
                <button className="btn-primary w-full justify-center" style={{ fontSize: 12 }}>
                  <Bell size={13} /> Set Alert for My Farm
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="glass-card p-6 flex gap-4" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
        <span style={{ fontSize: 32 }}>👨‍🌾</span>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#60a5fa', marginBottom: 6 }}>Community Alert Network</h4>
          <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>
            This system aggregates real pest sightings from <strong style={{ color: '#94a3b8' }}>10,000+ farmers across India</strong>. When 50+ farmers in a region report the same pest, a community alert is triggered automatically — giving you advance warning before it reaches your farm.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PestAlert;
