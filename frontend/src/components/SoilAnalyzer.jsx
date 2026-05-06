import React, { useState } from 'react';
import { Activity, CheckCircle2, RefreshCcw, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const SOIL_TYPES = ['Alluvial', 'Black', 'Loamy', 'Clayey', 'Sandy', 'Red'];

const SoilAnalyzer = () => {
  const [soilType, setSoilType] = useState('Alluvial');
  const [n, setN] = useState(45);
  const [p, setP] = useState(35);
  const [k, setK] = useState(55);
  const [ph, setPh] = useState(6.8);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/soil', {
        soil_type: soilType, nitrogen: n, phosphorus: p, potassium: k, ph
      });
      setResult(res.data);
    } catch {
      setResult({
        health_score: 68,
        soil_type: soilType,
        npk: { N: n < 40 ? 'Low' : n < 70 ? 'Medium' : 'High', P: p < 40 ? 'Low' : p < 70 ? 'Medium' : 'High', K: k < 40 ? 'Low' : k < 70 ? 'Medium' : 'High' },
        ph_status: ph < 6 ? 'Acidic' : ph > 7.5 ? 'Alkaline' : 'Optimal',
        suitable_crops: ['Wheat', 'Maize', 'Vegetables'],
        recommendations: [{ nutrient: 'Phosphorus (P)', status: 'Deficient', fix: 'Apply DAP 50 kg/acre', color: '#f59e0b' }],
        organic_matter: 'Medium (0.5-1%)',
      });
    }
    setLoading(false);
  };

  const gradeColor = (g) => g === 'Low' ? '#ef4444' : g === 'Medium' ? '#f59e0b' : '#22c55e';
  const scoreColor = (s) => s >= 80 ? '#22c55e' : s >= 60 ? '#f59e0b' : s >= 40 ? '#f97316' : '#ef4444';
  const scoreLabel = (s) => s >= 80 ? 'Excellent' : s >= 60 ? 'Good' : s >= 40 ? 'Fair' : 'Poor';

  const SliderInput = ({ label, value, onChange, min, max, step = 1, color }) => (
    <div>
      <div className="flex justify-between mb-2">
        <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</label>
        <span style={{ fontSize: 16, fontWeight: 900, color }}>{value}{step < 1 ? '' : ''}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: color, cursor: 'pointer' }} />
      <div className="flex justify-between mt-1">
        <span style={{ fontSize: 10, color: '#ef4444', fontWeight: 600 }}>Low ({min})</span>
        <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 600 }}>High ({max})</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>NPK · pH · Organic Matter</p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Soil Health Analyzer</h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Enter your soil lab data or field observations for an in-depth analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-7 space-y-6">
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 10 }}>Soil Type</label>
            <div className="grid grid-cols-3 gap-2">
              {SOIL_TYPES.map(s => (
                <button key={s} onClick={() => setSoilType(s)}
                  style={{
                    padding: '8px 4px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none',
                    background: soilType === s ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)',
                    color: soilType === s ? '#4ade80' : '#64748b',
                    outline: soilType === s ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.2s'
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <SliderInput label="Nitrogen (N) kg/ha" value={n} onChange={setN} min={0} max={100} color="#22c55e" />
          <SliderInput label="Phosphorus (P) kg/ha" value={p} onChange={setP} min={0} max={100} color="#3b82f6" />
          <SliderInput label="Potassium (K) kg/ha" value={k} onChange={setK} min={0} max={100} color="#f59e0b" />
          <SliderInput label="Soil pH" value={ph} onChange={setPh} min={4} max={9} step={0.1} color={ph < 6 ? '#ef4444' : ph > 7.5 ? '#8b5cf6' : '#22c55e'} />

          <button onClick={analyze} disabled={loading} className="btn-primary w-full justify-center" style={{ fontSize: 14, paddingTop: 14, paddingBottom: 14 }}>
            {loading ? <><RefreshCcw size={16} className="animate-spin" /> Analyzing...</> : <><Leaf size={16} /> Analyze Soil Health</>}
          </button>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              {/* Score Card */}
              <div className="glass-card p-7 text-center" style={{ background: `${scoreColor(result.health_score)}10`, border: `1px solid ${scoreColor(result.health_score)}30` }}>
                <p style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Overall Soil Health Score</p>
                <div style={{ fontSize: '4rem', fontWeight: 900, color: scoreColor(result.health_score), letterSpacing: '-0.04em', lineHeight: 1 }}>{result.health_score}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: scoreColor(result.health_score), marginTop: 4, marginBottom: 16 }}>{scoreLabel(result.health_score)}</div>
                <div className="progress-bar" style={{ height: 10 }}>
                  <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${result.health_score}%` }} transition={{ duration: 1 }}
                    style={{ background: `linear-gradient(90deg, ${scoreColor(result.health_score)}80, ${scoreColor(result.health_score)})` }} />
                </div>
              </div>

              {/* NPK Grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Nitrogen', sym: 'N', val: result.npk.N, color: '#22c55e' },
                  { label: 'Phosphorus', sym: 'P', val: result.npk.P, color: '#3b82f6' },
                  { label: 'Potassium', sym: 'K', val: result.npk.K, color: '#f59e0b' },
                ].map((n, i) => (
                  <div key={i} className="glass-card p-4 text-center">
                    <div style={{ fontSize: 24, fontWeight: 900, color: n.color, marginBottom: 4 }}>{n.sym}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: gradeColor(n.val) }}>{n.val}</div>
                    <div style={{ fontSize: 10, color: '#475569', fontWeight: 600, textTransform: 'uppercase' }}>{n.label}</div>
                  </div>
                ))}
              </div>

              {/* Status Strip */}
              <div className="glass-card p-4 flex items-center justify-between">
                <div>
                  <p style={{ fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Soil pH</p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: result.ph_status === 'Optimal' ? '#4ade80' : '#f59e0b' }}>{ph.toFixed(1)} — {result.ph_status}</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Organic Matter</p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: '#a78bfa' }}>{result.organic_matter}</p>
                </div>
              </div>

              {/* Suitable Crops */}
              <div className="glass-card p-5" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>✓ Best Crops for Your Soil</p>
                <div className="flex flex-wrap gap-2">
                  {result.suitable_crops.map((c, i) => (
                    <span key={i} style={{ padding: '5px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, background: 'rgba(34,197,94,0.12)', color: '#86efac', border: '1px solid rgba(34,197,94,0.2)' }}>{c}</span>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <div className="space-y-3">
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>⚠️ Deficiency Corrections</p>
                  {result.recommendations.map((r, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-2xl" style={{ background: `${r.color}10`, border: `1px solid ${r.color}25` }}>
                      <div className="w-1.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.nutrient} — {r.status}</p>
                        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{r.fix}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="glass-card p-16 flex flex-col items-center justify-center text-center"
              style={{ border: '1px dashed rgba(255,255,255,0.08)', minHeight: 400 }}>
              <Activity size={52} style={{ color: '#1e293b', marginBottom: 16 }} className="animate-float" />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#334155', marginBottom: 8 }}>Set Parameters</h3>
              <p style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.7, maxWidth: 260 }}>Adjust the sliders and click Analyze to get your complete soil health report.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SoilAnalyzer;
