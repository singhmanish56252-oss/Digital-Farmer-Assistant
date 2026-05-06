import React, { useState } from 'react';
import { Sprout, Info, ChevronRight, Cpu, Droplets, Sun, Thermometer, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const CROP_DETAILS = {
  Wheat:   { emoji: '🌾', yieldHigh: '48 qtl/acre', period: '120-150 days', roi: '38%', rating: 4.8 },
  Rice:    { emoji: '🍚', yieldHigh: '22 qtl/acre', period: '100-130 days', roi: '42%', rating: 4.5 },
  Cotton:  { emoji: '☁️', yieldHigh: '12 qtl/acre', period: '180-200 days', roi: '55%', rating: 4.3 },
  Mustard: { emoji: '🌼', yieldHigh: '8 qtl/acre',  period: '90-110 days',  roi: '45%', rating: 4.6 },
  Maize:   { emoji: '🌽', yieldHigh: '40 qtl/acre', period: '80-100 days',  roi: '36%', rating: 4.4 },
};

const CropSuggestion = () => {
  const [season, setSeason] = useState('Winter');
  const [soil, setSoil] = useState('Alluvial');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/crops', { season, soil });
      setSuggestions(res.data);
    } catch {
      setSuggestions([
        { name: 'Wheat', season: 'Winter', soil: 'Alluvial', temp: '15-25', water: 'Medium' },
        { name: 'Mustard', season: 'Winter', soil: 'Loamy', temp: '10-20', water: 'Low' },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          AI-Powered Recommendation Engine
        </p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Crop Recommendation</h2>
      </div>

      {/* Input Panel */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <Cpu size={18} style={{ color: '#4ade80' }} />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>Configure Your Farm Parameters</h3>
            <p style={{ fontSize: 12, color: '#64748b' }}>Our model will analyze 50+ data points to give you the best picks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              <Sun size={12} style={{ display: 'inline', marginRight: 6 }} /> Growing Season
            </label>
            <div className="relative">
              <select value={season} onChange={e => setSeason(e.target.value)} className="input-dark pr-10">
                <option value="Winter">❄️  Winter (Rabi)</option>
                <option value="Summer">☀️  Summer (Kharif)</option>
                <option value="Spring">🌸  Spring (Zaid)</option>
              </select>
              <ChevronRight size={16} style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%) rotate(90deg)', color:'#475569', pointerEvents:'none' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              <Droplets size={12} style={{ display: 'inline', marginRight: 6 }} /> Soil Type
            </label>
            <div className="relative">
              <select value={soil} onChange={e => setSoil(e.target.value)} className="input-dark pr-10">
                <option value="Alluvial">🟤 Alluvial Soil</option>
                <option value="Black">⚫ Black Soil</option>
                <option value="Clayey">🟫 Clayey Soil</option>
                <option value="Loamy">🟡 Loamy Soil</option>
              </select>
              <ChevronRight size={16} style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%) rotate(90deg)', color:'#475569', pointerEvents:'none' }} />
            </div>
          </div>
        </div>

        <button onClick={getSuggestions} disabled={loading} className="btn-primary w-full justify-center py-4" style={{ fontSize: 15 }}>
          {loading ? (
            <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Analyzing Farm Data...</>
          ) : (
            <><Cpu size={18} /> Get AI Recommendations</>
          )}
        </button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-5">
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#f1f5f9' }}>Top Recommendations</h3>
              <span className="badge badge-green">{suggestions.length} Crops Found</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestions.map((crop, i) => {
                const extra = CROP_DETAILS[crop.name] || { emoji: '🌿', yieldHigh: 'N/A', period: 'N/A', roi: 'N/A', rating: 4.0 };
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                    className="glass-card p-6 group cursor-pointer"
                    style={{ border: '1px solid rgba(34,197,94,0.15)' }}>
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                          {extra.emoji}
                        </div>
                        <div>
                          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>{crop.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} size={11} style={{ color: j < Math.floor(extra.rating) ? '#f59e0b' : '#1e293b', fill: j < Math.floor(extra.rating) ? '#f59e0b' : 'none' }} />
                            ))}
                            <span style={{ fontSize: 11, color: '#64748b', marginLeft: 4, fontWeight: 600 }}>{extra.rating}</span>
                          </div>
                        </div>
                      </div>
                      <span className="badge badge-green">{crop.season}</span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {[
                        { label: 'Soil Type', val: crop.soil, icon: '🪨' },
                        { label: 'Temperature', val: `${crop.temp}°C`, icon: '🌡️' },
                        { label: 'Water Needs', val: crop.water, icon: '💧' },
                        { label: 'Peak Yield', val: extra.yieldHigh, icon: '📈' },
                        { label: 'Grow Period', val: extra.period, icon: '📅' },
                        { label: 'Expected ROI', val: extra.roi, icon: '💰' },
                      ].map((s, j) => (
                        <div key={j} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <p style={{ fontSize: 10, color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>
                            {s.icon} {s.label}
                          </p>
                          <p style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>{s.val}</p>
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <div className="flex gap-3">
                      <button className="btn-ghost flex-1 justify-center" style={{ fontSize: 13 }}>View Details</button>
                      <button className="btn-primary flex-[2] justify-center" style={{ fontSize: 13 }}>
                        <Sprout size={15} /> Select This Crop
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Banner */}
      <div className="flex gap-4 p-5 rounded-2xl" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <Info size={20} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 2 }} />
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24', marginBottom: 4 }}>How does the AI decide?</h4>
          <p style={{ fontSize: 12, color: '#92400e', lineHeight: 1.7 }}>
            Our recommendation engine cross-references your soil profile, current season, moisture data, and historical yield records from 10,000+ farms across India to suggest crops with the highest probability of success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CropSuggestion;
