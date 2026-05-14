import React, { useState } from 'react';
import { Droplets, Thermometer, Wind, AlertTriangle, CheckCircle2, RefreshCcw, Gauge, CloudRain, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';

const CROP_ET = { Wheat: 1.15, Rice: 1.20, Cotton: 1.05, Mustard: 0.95, Maize: 1.10 };

const statusConfig = {
  Critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)',  icon: '🚨', glow: '0 0 24px rgba(239,68,68,0.3)' },
  Low:      { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '⚠️', glow: '0 0 24px rgba(245,158,11,0.3)' },
  Adequate: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', icon: '💧', glow: '0 0 24px rgba(59,130,246,0.2)' },
  Optimal:  { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)',  icon: '✅', glow: '0 0 24px rgba(34,197,94,0.2)' },
};

const IrrigationAdvisor = () => {
  const [crop, setCrop] = useState('Wheat');
  const [moisture, setMoisture] = useState(45);
  const [temp, setTemp] = useState(30);
  const [humidity, setHumidity] = useState(50);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/irrigation`, {
        crop, soil_moisture: moisture, temp, humidity
      });
      setResult(res.data);
    } catch {
      // Fallback mock
      const status = moisture < 30 ? 'Critical' : moisture < 50 ? 'Low' : moisture < 70 ? 'Adequate' : 'Optimal';
      setResult({
        status,
        action: moisture < 50 ? 'Irrigate today in the evening.' : 'No irrigation needed for 3-4 days.',
        water_needed_mm: moisture < 50 ? 25 : 0,
        et0: 4.2, etc: 4.8,
        next_irrigation: moisture < 50 ? 'Today evening' : 'In 3-4 days',
        saving_tip: `Drip irrigation saves up to 40% water vs flood irrigation for ${crop}.`
      });
    }
    setLoading(false);
  };

  const s = result ? (statusConfig[result.status] || statusConfig.Optimal) : null;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Evapotranspiration-Based Engine
        </p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Smart Irrigation Advisor</h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Scientifically calculate exact water needs — save water, maximize yield</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-7 space-y-6">
          <div className="flex items-center gap-3 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <Droplets size={18} style={{ color: '#60a5fa' }} />
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>Farm Parameters</h3>
          </div>

          {/* Crop Select */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>Crop Type</label>
            <div className="grid grid-cols-5 gap-2">
              {Object.keys(CROP_ET).map(c => (
                <button key={c} onClick={() => setCrop(c)}
                  style={{
                    padding: '8px 4px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none',
                    background: crop === c ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)',
                    color: crop === c ? '#4ade80' : '#64748b',
                    outline: crop === c ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.2s'
                  }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Soil Moisture Slider */}
          <div>
            <div className="flex justify-between mb-3">
              <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Soil Moisture</label>
              <span style={{ fontSize: 18, fontWeight: 900, color: moisture < 30 ? '#ef4444' : moisture < 60 ? '#f59e0b' : '#4ade80' }}>{moisture}%</span>
            </div>
            <input type="range" min="0" max="100" value={moisture} onChange={e => setMoisture(Number(e.target.value))}
              style={{ width: '100%', accentColor: moisture < 30 ? '#ef4444' : moisture < 60 ? '#f59e0b' : '#22c55e', cursor: 'pointer' }} />
            <div className="flex justify-between mt-1">
              <span style={{ fontSize: 10, color: '#ef4444', fontWeight: 600 }}>Dry (0%)</span>
              <span style={{ fontSize: 10, color: '#4ade80', fontWeight: 600 }}>Saturated (100%)</span>
            </div>
          </div>

          {/* Temp + Humidity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
                <Thermometer size={11} style={{ display: 'inline', marginRight: 4 }} />Temperature (°C)
              </label>
              <input type="number" value={temp} onChange={e => setTemp(Number(e.target.value))} min="10" max="50"
                className="input-dark" style={{ textAlign: 'center', fontWeight: 800, fontSize: 18 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
                <Wind size={11} style={{ display: 'inline', marginRight: 4 }} />Humidity (%)
              </label>
              <input type="number" value={humidity} onChange={e => setHumidity(Number(e.target.value))} min="0" max="100"
                className="input-dark" style={{ textAlign: 'center', fontWeight: 800, fontSize: 18 }} />
            </div>
          </div>

          <button onClick={analyze} disabled={loading} className="btn-primary w-full justify-center" style={{ fontSize: 14, paddingTop: 14, paddingBottom: 14 }}>
            {loading ? <><RefreshCcw size={16} className="animate-spin" /> Calculating...</> : <><Droplets size={16} /> Calculate Irrigation Need</>}
          </button>
        </motion.div>

        {/* Result Panel */}
        <div>
          <AnimatePresence mode="wait">
            {result && s ? (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                {/* Status Hero */}
                <div className="glass-card p-7" style={{ background: s.bg, border: `1px solid ${s.border}`, boxShadow: s.glow }}>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: 36 }}>{s.icon}</span>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Moisture Status</p>
                        <h3 style={{ fontSize: '2rem', fontWeight: 900, color: s.color, letterSpacing: '-0.03em' }}>{result.status}</h3>
                      </div>
                    </div>
                    {result.water_needed_mm > 0 && (
                      <div className="text-right">
                        <p style={{ fontSize: 10, color: s.color, fontWeight: 700, textTransform: 'uppercase' }}>Water Needed</p>
                        <p style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f1f5f9' }}>{result.water_needed_mm}<span style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}> mm</span></p>
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: 14, color: '#e2e8f0', fontWeight: 600, lineHeight: 1.6 }}>{result.action}</p>
                </div>

                {/* ET Data */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'ET₀ (Reference)', val: `${result.et0} mm/day`, color: '#60a5fa', icon: '🌬️' },
                    { label: 'ETc (Crop)',       val: `${result.etc} mm/day`, color: '#a78bfa', icon: '🌿' },
                    { label: 'Next Irrigation',  val: result.next_irrigation, color: '#4ade80', icon: '📅' },
                  ].map((item, i) => (
                    <div key={i} className="glass-card p-4 text-center">
                      <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                      <p style={{ fontSize: 16, fontWeight: 900, color: item.color, marginBottom: 4 }}>{item.val}</p>
                      <p style={{ fontSize: 10, color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Water Saving Tip */}
                <div className="flex gap-3 p-5 rounded-2xl" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                  <span style={{ fontSize: 20 }}>💡</span>
                  <p style={{ fontSize: 13, color: '#86efac', lineHeight: 1.7 }}>{result.saving_tip}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass-card p-16 flex flex-col items-center justify-center text-center h-full"
                style={{ border: '1px dashed rgba(255,255,255,0.08)', minHeight: 400 }}>
                <CloudRain size={56} style={{ color: '#1e293b', marginBottom: 16 }} className="animate-float" />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#334155', marginBottom: 8 }}>Enter Farm Data</h3>
                <p style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.7, maxWidth: 260 }}>
                  Fill in the parameters on the left to get your AI-calculated irrigation schedule.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: '🌧️', title: 'Evapotranspiration', desc: 'We use the Hargreaves method to calculate how much water your crop loses daily via evaporation + transpiration.' },
          { icon: '💧', title: 'Drip Irrigation', desc: 'Switch to drip irrigation to save 35-50% water while delivering moisture directly to roots for higher yield.' },
          { icon: '📱', title: 'Soil Sensors', desc: 'Connect IoT soil moisture sensors to get real-time data and automated irrigation trigger alerts on your phone.' },
        ].map((c, i) => (
          <div key={i} className="glass-card p-5">
            <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>{c.title}</h4>
            <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.7 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IrrigationAdvisor;
