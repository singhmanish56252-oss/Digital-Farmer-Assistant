import React, { useState } from 'react';
import { Droplets, Info, FlaskConical, ShieldCheck, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const CROP_DATA = {
  Wheat:   { emoji: '🌾', color: '#f59e0b', schedule: 'Oct–Nov · Jan · Mar', npk: '120:60:40', ph: '6.0–7.5' },
  Rice:    { emoji: '🍚', color: '#3b82f6', schedule: 'Jun–Jul · Aug · Sep', npk: '80:40:40',  ph: '5.5–6.5' },
  Cotton:  { emoji: '☁️', color: '#8b5cf6', schedule: 'Jun · Aug · Oct',    npk: '120:60:60',  ph: '6.0–8.0' },
  Mustard: { emoji: '🌼', color: '#22c55e', schedule: 'Oct · Nov–Dec',       npk: '60:40:40',   ph: '6.5–7.5' },
  Maize:   { emoji: '🌽', color: '#ef4444', schedule: 'Jun · Aug · Oct',     npk: '120:60:40',  ph: '5.8–7.0' },
};

const FERT_DETAILS = {
  Urea:          { type: 'Nitrogen', dosage: '50 kg/acre', timing: 'Split: Basal + Top dress', benefit: 'Promotes vegetative growth and green leaf color', icon: '🧪' },
  DAP:           { type: 'Phosphorus', dosage: '50 kg/acre', timing: 'Basal dose at sowing', benefit: 'Strengthens root development and early seedling growth', icon: '⚗️' },
  MOP:           { type: 'Potassium', dosage: '25 kg/acre', timing: 'Basal dose at sowing', benefit: 'Improves drought tolerance and crop quality', icon: '🔬' },
  'Zinc Sulphate': { type: 'Micronutrient', dosage: '10 kg/acre', timing: 'Basal dose', benefit: 'Prevents zinc deficiency, boosts enzyme activity', icon: '🧫' },
  Potash:        { type: 'Potassium', dosage: '25 kg/acre', timing: 'Basal + top dress', benefit: 'Improves starch quality and disease resistance', icon: '⚗️' },
  Nitrogen:      { type: 'Macronutrient', dosage: '40 kg/acre', timing: 'Split application', benefit: 'Core building block for amino acids and chlorophyll', icon: '🧪' },
  Phosphorus:    { type: 'Macronutrient', dosage: '30 kg/acre', timing: 'Basal dose', benefit: 'Supports root and flower development', icon: '🔬' },
  Potassium:     { type: 'Macronutrient', dosage: '20 kg/acre', timing: 'Basal dose', benefit: 'Regulates water movement and improves yield quality', icon: '⚗️' },
  Sulphur:       { type: 'Secondary', dosage: '20 kg/acre', timing: 'Basal dose', benefit: 'Improves oil content in oilseed crops like mustard', icon: '🧫' },
  SSP:           { type: 'Phosphorus', dosage: '100 kg/acre', timing: 'Basal dose', benefit: 'Provides phosphorus + calcium + sulfur in one shot', icon: '🧪' },
  Zinc:          { type: 'Micronutrient', dosage: '8 kg/acre', timing: 'Basal dose', benefit: 'Activates key enzymes, improves photosynthesis', icon: '🔬' },
  'General NPK': { type: 'Balanced', dosage: '50 kg/acre', timing: 'Basal dose', benefit: 'Balanced nutrition for all-round crop development', icon: '⚗️' },
  'Organic Manure': { type: 'Organic', dosage: '2 ton/acre', timing: '2-3 weeks before sowing', benefit: 'Improves soil structure, microbial activity, and water retention', icon: '🌿' },
};

const typeColors = {
  Nitrogen: '#22c55e', Phosphorus: '#3b82f6', Potassium: '#f59e0b',
  Micronutrient: '#8b5cf6', Macronutrient: '#06b6d4', Secondary: '#ec4899',
  Balanced: '#f97316', Organic: '#84cc16',
};

const FertilizerGuide = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [fertilizers, setFertilizers] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFertilizers = async (crop) => {
    setLoading(true);
    setSelectedCrop(crop);
    setFertilizers(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/fertilizers?crop=${crop}`);
      setTimeout(() => { setFertilizers(res.data.fertilizers); setLoading(false); }, 600);
    } catch {
      setTimeout(() => { setFertilizers(['General NPK', 'Organic Manure']); setLoading(false); }, 600);
    }
  };

  const cropInfo = selectedCrop ? CROP_DATA[selectedCrop] : null;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Precision Nutrition System
        </p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Fertilizer Guide</h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Select your crop for AI-optimized fertilizer schedule</p>
      </div>

      {/* Crop Selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(CROP_DATA).map(([crop, data]) => {
          const isActive = selectedCrop === crop;
          return (
            <motion.button key={crop} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => fetchFertilizers(crop)}
              className="p-5 rounded-2xl text-center transition-all"
              style={{
                background: isActive ? `${data.color}18` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? data.color + '40' : 'rgba(255,255,255,0.07)'}`,
                boxShadow: isActive ? `0 0 20px ${data.color}20` : 'none',
              }}>
              <div className="text-4xl mb-3">{data.emoji}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: isActive ? data.color : '#94a3b8' }}>{crop}</p>
              {isActive && <div className="w-1 h-1 rounded-full mx-auto mt-2" style={{ background: data.color }} />}
            </motion.button>
          );
        })}
      </div>

      {/* Crop Summary */}
      <AnimatePresence>
        {cropInfo && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="glass-card p-5 flex flex-wrap gap-6 items-center"
            style={{ background: `${cropInfo.color}0a`, border: `1px solid ${cropInfo.color}25` }}>
            <div className="text-3xl">{cropInfo.emoji}</div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Recommended NPK', val: cropInfo.npk },
                { label: 'Optimal Soil pH', val: cropInfo.ph },
                { label: 'Application Schedule', val: cropInfo.schedule },
              ].map((item, i) => (
                <div key={i}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>{item.label}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: cropInfo.color }}>{item.val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center py-16 gap-4">
          <div className="animate-spin w-10 h-10 border-2 rounded-full" style={{ borderColor: 'rgba(34,197,94,0.2)', borderTopColor: '#22c55e' }} />
          <p style={{ color: '#64748b', fontSize: 13 }}>Fetching fertilizer recommendations...</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fertilizer Cards */}
        <div className="lg:col-span-2">
          <AnimatePresence>
            {fertilizers && !loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {fertilizers.map((fert, i) => {
                  const detail = FERT_DETAILS[fert] || FERT_DETAILS['General NPK'];
                  const col = typeColors[detail.type] || '#22c55e';
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="glass-card p-6 group" style={{ borderTop: `3px solid ${col}` }}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-2xl mb-2">{detail.icon}</div>
                          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#f1f5f9' }}>{fert}</h4>
                        </div>
                        <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 999, background: `${col}18`, color: col, border: `1px solid ${col}30`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {detail.type}
                        </span>
                      </div>

                      <div className="space-y-3 mb-4">
                        {[
                          { icon: '⚖️', label: 'Dosage',  val: detail.dosage },
                          { icon: '⏰', label: 'Timing',  val: detail.timing },
                        ].map((d, j) => (
                          <div key={j} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: 16 }}>{d.icon}</span>
                            <div>
                              <p style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>{d.label}</p>
                              <p style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{d.val}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl" style={{ background: `${col}0d`, border: `1px solid ${col}1a` }}>
                        <p style={{ fontSize: 11, color: col, fontWeight: 600, lineHeight: 1.6 }}>✦ {detail.benefit}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {!fertilizers && !loading && (
            <div className="glass-card p-16 text-center flex flex-col items-center gap-4" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
              <FlaskConical size={48} style={{ color: '#1e293b' }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#334155' }}>Select a crop above</h3>
              <p style={{ fontSize: 13, color: '#1e293b' }}>Your fertilizer schedule will appear here</p>
            </div>
          )}
        </div>

        {/* Safety Panel */}
        <div className="space-y-5">
          <div className="glass-card p-6" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}>
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck size={20} style={{ color: '#a78bfa' }} />
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Safety Guidelines</h4>
            </div>
            <div className="space-y-4">
              {[
                { icon: AlertTriangle, col: '#f59e0b', text: 'Avoid over-applying Urea — excess leads to leaf burn and pest susceptibility.' },
                { icon: CheckCircle2,  col: '#22c55e', text: 'Always wear gloves and mask when handling chemical fertilizers.' },
                { icon: CheckCircle2,  col: '#22c55e', text: 'Test soil every 2 years to identify specific nutrient deficiencies.' },
                { icon: Clock,         col: '#3b82f6', text: 'Apply fertilizers early morning or late evening for best absorption.' },
              ].map(({ icon: Icon, col, text }, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <Icon size={16} style={{ color: col, flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#4ade80', marginBottom: 12 }}>💡 Pro Tip</h4>
            <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.7 }}>
              Combine chemical fertilizers with <strong style={{ color: '#86efac' }}>organic manure (2 tons/acre)</strong> for 20–30% better yield and long-term soil health improvement.
            </p>
            <button className="btn-primary w-full justify-center mt-4" style={{ fontSize: 13 }}>
              <FlaskConical size={15} /> Calculate Quantity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerGuide;
