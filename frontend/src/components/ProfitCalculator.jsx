import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, RefreshCcw, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';

const CROPS = ['Wheat', 'Rice', 'Cotton', 'Mustard', 'Maize'];
const CROP_DEFAULTS = {
  Wheat:   { seed: 2500, fertilizer: 3500, pesticide: 800,  labor: 4000, irrigation: 1500, misc: 500 },
  Rice:    { seed: 1800, fertilizer: 4000, pesticide: 1200, labor: 6000, irrigation: 2000, misc: 600 },
  Cotton:  { seed: 3000, fertilizer: 5000, pesticide: 2500, labor: 7000, irrigation: 2500, misc: 800 },
  Mustard: { seed: 1200, fertilizer: 2800, pesticide: 600,  labor: 3000, irrigation: 1000, misc: 400 },
  Maize:   { seed: 2000, fertilizer: 3200, pesticide: 700,  labor: 3500, irrigation: 1200, misc: 450 },
};

const InputRow = ({ icon, label, value, onChange }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
    <span style={{ fontSize: 20, width: 28, textAlign: 'center', flexShrink: 0 }}>{icon}</span>
    <div className="flex-1">
      <p style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</p>
    </div>
    <div className="flex items-center gap-2">
      <span style={{ fontSize: 14, color: '#475569', fontWeight: 600 }}>₹</span>
      <input type="number" value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ width: 100, padding: '6px 10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9', fontSize: 14, fontWeight: 700, outline: 'none', textAlign: 'right' }} />
    </div>
  </div>
);

const ProfitCalculator = () => {
  const [crop, setCrop] = useState('Wheat');
  const [area, setArea] = useState(2);
  const [costs, setCosts] = useState(CROP_DEFAULTS['Wheat']);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeCrop = (c) => { setCrop(c); setCosts(CROP_DEFAULTS[c]); setResult(null); };
  const updateCost = (key, val) => setCosts(prev => ({ ...prev, [key]: val }));

  const calculate = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/profit`, { crop, area, ...costs });
      setResult(res.data);
    } catch {
      const totalCost = Object.values(costs).reduce((a, b) => a + b, 0);
      const yields = { Wheat: 18, Rice: 20, Cotton: 8, Mustard: 7, Maize: 22 };
      const prices = { Wheat: 2100, Rice: 2400, Cotton: 6500, Mustard: 5400, Maize: 1800 };
      const yld = (yields[crop] || 15) * area;
      const rev = yld * (prices[crop] || 2000);
      const profit = rev - totalCost;
      const roi = totalCost > 0 ? Math.round((profit / totalCost) * 100) : 0;
      setResult({
        total_cost: totalCost, expected_yield_qtl: yld, market_price_per_qtl: prices[crop],
        gross_revenue: rev, net_profit: profit, roi_percent: roi,
        cost_per_quintal: Math.round(totalCost / yld),
        profit_grade: roi > 40 ? 'Excellent' : roi > 20 ? 'Good' : roi > 0 ? 'Marginal' : 'Loss',
      });
    }
    setLoading(false);
  };

  const gradeConfig = {
    Excellent: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)' },
    Good:      { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)' },
    Marginal:  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
    Loss:      { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)' },
  };

  const fmt = (n) => n >= 0 ? `₹${Math.abs(Math.round(n)).toLocaleString()}` : `-₹${Math.abs(Math.round(n)).toLocaleString()}`;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>ROI · Break-even · Yield Forecast</p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Profit Calculator</h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Plan your farming income and optimize costs before the season starts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-7 space-y-5">
          {/* Crop + Area */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>Crop</label>
              <div className="relative">
                <select value={crop} onChange={e => changeCrop(e.target.value)} className="input-dark pr-8">
                  {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>Farm Area (acres)</label>
              <input type="number" value={area} onChange={e => setArea(Number(e.target.value))} min="0.5" max="100" step="0.5" className="input-dark" style={{ fontWeight: 800, fontSize: 16, textAlign: 'center' }} />
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cost Breakdown (per acre ₹)</p>

          <InputRow icon="🌱" label="Seed Cost"       value={costs.seed}       onChange={v => updateCost('seed', v)} />
          <InputRow icon="🧪" label="Fertilizer"      value={costs.fertilizer} onChange={v => updateCost('fertilizer', v)} />
          <InputRow icon="🛡️" label="Pesticide"       value={costs.pesticide}  onChange={v => updateCost('pesticide', v)} />
          <InputRow icon="👷" label="Labour"          value={costs.labor}      onChange={v => updateCost('labor', v)} />
          <InputRow icon="💧" label="Irrigation"      value={costs.irrigation} onChange={v => updateCost('irrigation', v)} />
          <InputRow icon="📦" label="Misc / Transport" value={costs.misc}       onChange={v => updateCost('misc', v)} />

          <button onClick={calculate} disabled={loading} className="btn-primary w-full justify-center" style={{ fontSize: 14, paddingTop: 14, paddingBottom: 14 }}>
            {loading ? <><RefreshCcw size={16} className="animate-spin" /> Calculating...</> : <><Calculator size={16} /> Calculate Profit</>}
          </button>
        </motion.div>

        {/* Results */}
        <div>
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                {/* Profit Grade Card */}
                {(() => {
                  const gc = gradeConfig[result.profit_grade] || gradeConfig.Good;
                  const isProfit = result.net_profit >= 0;
                  return (
                    <div className="glass-card p-7" style={{ background: gc.bg, border: `1px solid ${gc.border}` }}>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p style={{ fontSize: 11, color: gc.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                            {isProfit ? '📈 Net Profit' : '📉 Net Loss'}
                          </p>
                          <p style={{ fontSize: '2.8rem', fontWeight: 900, color: gc.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{fmt(result.net_profit)}</p>
                        </div>
                        <div className="text-right">
                          <p style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>ROI</p>
                          <p style={{ fontSize: '2rem', fontWeight: 900, color: gc.color }}>{result.roi_percent}%</p>
                          <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 999, background: gc.bg, color: gc.color, border: `1px solid ${gc.border}`, fontWeight: 700 }}>
                            {result.profit_grade}
                          </span>
                        </div>
                      </div>
                      <div className="progress-bar" style={{ height: 8 }}>
                        <motion.div className="progress-fill" initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, Math.max(0, result.roi_percent))}%` }}
                          transition={{ duration: 1 }}
                          style={{ background: `linear-gradient(90deg, ${gc.color}80, ${gc.color})` }} />
                      </div>
                    </div>
                  );
                })()}

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Total Cost',         val: fmt(result.total_cost),          icon: '💸', color: '#ef4444' },
                    { label: 'Gross Revenue',      val: fmt(result.gross_revenue),        icon: '💹', color: '#22c55e' },
                    { label: 'Expected Yield',     val: `${result.expected_yield_qtl} qtl`, icon: '🌾', color: '#f59e0b' },
                    { label: 'Market Price/qtl',   val: fmt(result.market_price_per_qtl), icon: '📊', color: '#3b82f6' },
                    { label: 'Cost/Quintal',       val: fmt(result.cost_per_quintal),     icon: '⚖️', color: '#8b5cf6' },
                    { label: 'Break-even Price',   val: fmt(result.breakeven_price || result.cost_per_quintal), icon: '🎯', color: '#ec4899' },
                  ].map((m, i) => (
                    <div key={i} className="glass-card p-4">
                      <div style={{ fontSize: 22, marginBottom: 6 }}>{m.icon}</div>
                      <p style={{ fontSize: 16, fontWeight: 900, color: m.color, marginBottom: 2 }}>{m.val}</p>
                      <p style={{ fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-card p-5" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                  <p style={{ fontSize: 12, color: '#4ade80', fontWeight: 700, marginBottom: 6 }}>💡 Pro Tip</p>
                  <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.7 }}>
                    To improve ROI, reduce labour costs with mechanization (tractor hire) and reduce fertilizer waste by following the recommended NPK split doses from the Fertilizer Guide.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass-card p-16 flex flex-col items-center justify-center text-center"
                style={{ border: '1px dashed rgba(255,255,255,0.08)', minHeight: 500 }}>
                <DollarSign size={52} style={{ color: '#1e293b', marginBottom: 16 }} className="animate-float" />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#334155', marginBottom: 8 }}>Ready to Calculate</h3>
                <p style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.7, maxWidth: 260 }}>
                  Enter your costs on the left and click Calculate to see your expected profit, ROI, and break-even price.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
