import React, { useState, useEffect } from 'react';
import { CloudSun, Wind, Droplets, Thermometer, MapPin, RefreshCcw, Eye, Gauge, Umbrella } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const icons = ['☀️', '⛅', '🌧️', '☀️', '🌤️', '🌩️', '☀️'];
const temps = [32, 29, 26, 33, 31, 28, 34];

const StatPill = ({ icon: Icon, label, value, color }) => (
  <div className="flex flex-col items-center gap-2 px-6 py-5 rounded-2xl"
    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
    <Icon size={22} style={{ color }} />
    <p style={{ fontSize: 20, fontWeight: 800, color: '#f1f5f9' }}>{value}</p>
    <p style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
  </div>
);

const Weather = ({ userLocation }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const city = userLocation ? userLocation.split(',')[0] : 'New Delhi';
      const res = await axios.get(`http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`);
      setWeather(res.data);
    } catch {
      setWeather({ city: userLocation || 'New Delhi, India', temp: 32, condition: 'Sunny', humidity: 40, wind_speed: 12 });
    }
    setLoading(false);
  };

  useEffect(() => { fetchWeather(); }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <RefreshCcw size={36} className="animate-spin" style={{ color: '#22c55e' }} />
      <p style={{ color: '#64748b', fontSize: 14 }}>Fetching live weather data...</p>
    </div>
  );

  const conditionColor = weather.condition === 'Sunny' ? '#f59e0b' : weather.condition === 'Rainy' ? '#3b82f6' : '#94a3b8';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Live Weather Intelligence</p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Weather Insights</h2>
        </div>
        <button onClick={fetchWeather} className="btn-ghost">
          <RefreshCcw size={16} /> Refresh
        </button>
      </div>

      {/* Hero Weather Card */}
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(99,102,241,0.1) 50%, rgba(8,12,18,0) 100%)', border: '1px solid rgba(59,130,246,0.25)' }}>
        
        {/* BG Blur Orb */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} style={{ color: '#60a5fa' }} />
              <span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>{weather.city}</span>
            </div>
            <div className="flex items-end gap-3 mb-2">
              <span style={{ fontSize: '5rem', fontWeight: 900, color: '#f1f5f9', lineHeight: 1, letterSpacing: '-0.04em' }}>{weather.temp}°</span>
              <span style={{ fontSize: 20, color: '#64748b', marginBottom: 12, fontWeight: 600 }}>C</span>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: 28 }}>{weather.condition === 'Sunny' ? '☀️' : weather.condition === 'Rainy' ? '🌧️' : '⛅'}</span>
              <span style={{ fontSize: 18, color: '#e2e8f0', fontWeight: 700 }}>{weather.condition}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <StatPill icon={Droplets}    label="Humidity"   value={`${weather.humidity}%`}      color="#60a5fa" />
            <StatPill icon={Wind}        label="Wind"       value={`${weather.wind_speed}km/h`} color="#a78bfa" />
            <StatPill icon={Thermometer} label="Feels Like" value={`${weather.temp - 2}°C`}     color="#f59e0b" />
          </div>
        </div>
      </motion.div>

      {/* 7-Day Forecast */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6">
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>7-Day Forecast</h3>
        <div className="flex justify-between gap-2">
          {days.map((d, i) => (
            <div key={d} className="flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl transition-all cursor-pointer"
              style={i === 0 ? { background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' } : { background: 'rgba(255,255,255,0.03)', border: '1px solid transparent' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? '#4ade80' : '#64748b', textTransform: 'uppercase' }}>{d}</p>
              <span style={{ fontSize: 22 }}>{icons[i]}</span>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9' }}>{temps[i]}°</p>
              <div className="progress-bar w-3/4" style={{ height: 3 }}>
                <div className="progress-fill" style={{ width: `${(temps[i] - 24) * 10}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Agricultural Impact + Extra Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <Umbrella size={16} style={{ color: '#4ade80' }} />
            </div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Agricultural Impact</h4>
          </div>
          <div className="space-y-3">
            {[
              { dot: '#22c55e', text: 'Perfect sowing conditions for Wheat today. Soil temp 19°C.' },
              { dot: '#f59e0b', text: 'High evaporation rate — plan evening irrigation to minimize loss.' },
              { dot: '#3b82f6', text: 'UV index high; apply pesticide before 8AM or after 5PM.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.dot, boxShadow: `0 0 6px ${item.dot}` }} />
                <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <Gauge size={16} style={{ color: '#a78bfa' }} />
            </div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Live Metrics</h4>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Soil Moisture',    val: 62, unit: '%',    color: '#22c55e' },
              { label: 'UV Index',         val: 78, unit: '7.8',  color: '#f59e0b' },
              { label: 'Visibility',       val: 85, unit: '8.5km',color: '#3b82f6' },
              { label: 'Air Quality (AQI)',val: 45, unit: '45',   color: '#a78bfa' },
            ].map((m, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>{m.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: m.color }}>{m.unit}</span>
                </div>
                <div className="progress-bar">
                  <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${m.val}%` }} transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                    style={{ background: `linear-gradient(90deg, ${m.color}99, ${m.color})` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Weather;
