import React, { useState } from 'react';
import { Droplets, Info, FlaskConical, ShieldCheck, AlertTriangle, CheckCircle2, Clock, X, ShoppingCart, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';

const CROP_DATA = {
  Wheat:   { emoji: '🌾', color: '#f59e0b', schedule: 'Oct–Nov · Jan · Mar', npk: '120:60:40', ph: '6.0–7.5' },
  Rice:    { emoji: '🍚', color: '#3b82f6', schedule: 'Jun–Jul · Aug · Sep', npk: '80:40:40',  ph: '5.5–6.5' },
  Cotton:  { emoji: '☁️', color: '#8b5cf6', schedule: 'Jun · Aug · Oct',    npk: '120:60:60',  ph: '6.0–8.0' },
  Mustard: { emoji: '🌼', color: '#22c55e', schedule: 'Oct · Nov–Dec',       npk: '60:40:40',   ph: '6.5–7.5' },
  Maize:   { emoji: '🌽', color: '#ef4444', schedule: 'Jun · Aug · Oct',     npk: '120:60:40',  ph: '5.8–7.0' },
};

const FERT_DETAILS = {
  Urea:            { type: 'Nitrogen',     dosage: '50 kg/acre',  timing: 'Split: Basal + Top dress',    uses: 'Promotes vegetative growth, green leaf color, and high yield.',                      image: '/images/urea.png',         icon: '🧪', price: '266 / 45kg',    desc: 'Urea provides a high concentration of nitrogen, essential for leaf growth and protein formation. It is widely used for all crops.' },
  DAP:             { type: 'Phosphorus',   dosage: '50 kg/acre',  timing: 'Basal dose at sowing',        uses: 'Strengthens root development, early seedling growth, and crop establishment.',       image: '/images/dap.png',          icon: '⚗️', price: '1,350 / 50kg',  desc: 'Di-ammonium Phosphate (DAP) delivers a concentrated dose of phosphorus to help seeds sprout and develop strong roots.' },
  MOP:             { type: 'Potassium',    dosage: '25 kg/acre',  timing: 'Basal dose at sowing',        uses: 'Improves drought tolerance, disease resistance, and crop quality.',                   image: '/images/mop.png',          icon: '🔬', price: '1,700 / 50kg',  desc: 'Muriate of Potash provides potassium which regulates plant water balance, builds disease resistance, and improves grain quality.' },
  'Zinc Sulphate': { type: 'Micronutrient',dosage: '10 kg/acre',  timing: 'Basal dose',                  uses: 'Prevents zinc deficiency, boosts enzyme activity and hormone production.',            image: '/images/zinc_sulphate.png', icon: '🧫', price: '850 / 10kg',    desc: 'Crucial for chlorophyll production and preventing stunted growth in crops. Highly recommended for zinc-deficient soils.' },
  Potash:          { type: 'Potassium',    dosage: '25 kg/acre',  timing: 'Basal + top dress',           uses: 'Improves starch quality, fruit size, and builds disease resistance.',                 image: '/images/potash.png',       icon: '⚗️', price: '1,700 / 50kg',  desc: 'Enhances crop quality, sugar content, and resilience to environmental stress like drought and frost.' },
  Nitrogen:        { type: 'Macronutrient',dosage: '40 kg/acre',  timing: 'Split application',           uses: 'Core building block for amino acids, proteins, and chlorophyll.',                    image: '/images/urea.png',         icon: '🧪', price: '260 / 50kg',    desc: 'Directly supports vigorous vegetative growth, giving plants their vibrant green color and increasing overall yield.' },
  Phosphorus:      { type: 'Macronutrient',dosage: '30 kg/acre',  timing: 'Basal dose',                  uses: 'Supports root and flower development, essential for energy transfer.',                image: '/images/dap.png',          icon: '🔬', price: '1,300 / 50kg',  desc: 'Critical for early root development, seed formation, and energy transfer within the plant.' },
  Potassium:       { type: 'Macronutrient',dosage: '20 kg/acre',  timing: 'Basal dose',                  uses: 'Regulates water movement, activates enzymes, and improves yield quality.',            image: '/images/potash.png',       icon: '⚗️', price: '1,650 / 50kg',  desc: 'Vital for overall plant health, activating over 80 enzymes responsible for plant processes.' },
  Sulphur:         { type: 'Secondary',    dosage: '20 kg/acre',  timing: 'Basal dose',                  uses: 'Improves oil content in oilseed crops and aids in protein synthesis.',               image: '/images/sulphur.png',      icon: '🧫', price: '950 / 25kg',    desc: 'Essential for amino acid synthesis, nodule formation in legumes, and improving oil content in crops like mustard.' },
  SSP:             { type: 'Phosphorus',   dosage: '100 kg/acre', timing: 'Basal dose',                  uses: 'Provides phosphorus, calcium, and sulfur in one shot for balanced nutrition.',       image: '/images/ssp.png',          icon: '🧪', price: '450 / 50kg',    desc: 'Single Super Phosphate offers multi-nutrient benefits at a low cost, improving soil structure and plant health.' },
  Zinc:            { type: 'Micronutrient',dosage: '8 kg/acre',   timing: 'Basal dose',                  uses: 'Activates key enzymes, improves photosynthesis and carbohydrate metabolism.',        image: '/images/zinc.png',         icon: '🔬', price: '800 / 10kg',    desc: 'Important for plant hormone regulation and internode elongation. Essential for achieving optimal yields.' },
  'General NPK':   { type: 'Balanced',     dosage: '50 kg/acre',  timing: 'Basal dose',                  uses: 'Balanced nutrition for all-round crop development and sustained growth.',            image: '/images/npk.png',          icon: '⚗️', price: '1,450 / 50kg',  desc: 'Complete primary nutrition formula suitable for a wide variety of crops, promoting balanced growth.' },
  'Organic Manure':{ type: 'Organic',      dosage: '2 ton/acre',  timing: '2-3 weeks before sowing',     uses: 'Improves soil structure, microbial activity, and water retention.',                  image: '/images/organic_manure.png',icon: '🌿', price: '3,000 / Ton',   desc: 'Eco-friendly alternative that boosts soil fertility naturally, enhances microbial life, and increases water-holding capacity.' },
};

const typeColors = {
  Nitrogen: '#16a34a', Phosphorus: '#2563eb', Potassium: '#d97706',
  Micronutrient: '#7c3aed', Macronutrient: '#0891b2', Secondary: '#db2777',
  Balanced: '#ea580c', Organic: '#65a30d',
};

const FertilizerGuide = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [fertilizers, setFertilizers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFertilizer, setSelectedFertilizer] = useState(null);

  const fetchFertilizers = async (crop) => {
    setLoading(true);
    setSelectedCrop(crop);
    setFertilizers(null);
    try {
      const res = await axios.get(`${API_URL}/api/fertilizers?crop=${crop}`);
      setTimeout(() => { setFertilizers(res.data.fertilizers); setLoading(false); }, 600);
    } catch {
      setTimeout(() => { setFertilizers(['General NPK', 'Organic Manure']); setLoading(false); }, 600);
    }
  };

  const cropInfo = selectedCrop ? CROP_DATA[selectedCrop] : null;

  return (
    <div className="space-y-8 animate-fade-in relative">
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
                  const col = typeColors[detail.type] || '#16a34a';
                  return (
                    <motion.button 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedFertilizer({name: fert, ...detail})}
                      className="p-6 group text-left rounded-2xl w-full" 
                      style={{ 
                        background: '#f8fafc', // Light background for dark text
                        borderTop: `4px solid ${col}`,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      }}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                            <img src={detail.image} alt={fert} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{fert}</h4>
                            <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 999, background: `${col}20`, color: col, border: `1px solid ${col}40`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              {detail.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {[
                          { icon: '⚖️', label: 'Dosage',  val: detail.dosage },
                          { icon: '⏰', label: 'Timing',  val: detail.timing },
                        ].map((d, j) => (
                          <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200">
                            <span style={{ fontSize: 16 }}>{d.icon}</span>
                            <div>
                              <p style={{ fontSize: 10, fontWeight: 800, color: '#374151', textTransform: 'uppercase' }}>{d.label}</p>
                              <p style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{d.val}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl mt-4 flex justify-between items-center bg-white border border-slate-200">
                         <div>
                            <p style={{ fontSize: 11, color: '#374151', fontWeight: 800, textTransform: 'uppercase' }}>Market Price</p>
                            <p style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>₹{detail.price}</p>
                         </div>
                         <div className="text-blue-600 font-bold text-sm flex items-center gap-1">
                            Details <Info size={14} />
                         </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {!fertilizers && !loading && (
            <div className="glass-card p-16 text-center flex flex-col items-center gap-4" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
              <FlaskConical size={48} style={{ color: '#6b7280' }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>Select a crop above</h3>
              <p style={{ fontSize: 13, color: '#9ca3af' }}>Your fertilizer schedule will appear here</p>
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
                  <p style={{ fontSize: 12, color: '#e2e8f0', lineHeight: 1.6, fontWeight: 500 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <div className="flex items-center gap-3 mb-4">
              <span style={{ fontSize: 20 }}>🌿</span>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#4ade80' }}>Organic Farming Guidance</h4>
            </div>
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-green-500/20">
                <p className="text-xs font-bold text-green-300 mb-1">Natural Fertilizers</p>
                <p style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 500, lineHeight: 1.6 }}>Use Vermicompost and Cow Dung Manure to enrich soil microbes naturally.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-green-500/20">
                <p className="text-xs font-bold text-green-300 mb-1">Compost Preparation</p>
                <p style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 500, lineHeight: 1.6 }}>Mix farm waste with cow dung and let it decompose for 45-60 days in a shaded pit.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-green-500/20">
                <p className="text-xs font-bold text-green-300 mb-1">Organic Pest Control</p>
                <p style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 500, lineHeight: 1.6 }}>Spray Neem Oil (5ml/L water) every 15 days as a preventive measure against aphids and borers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fertilizer Detail Modal */}
      <AnimatePresence>
        {selectedFertilizer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedFertilizer(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 z-10"
            >
              {/* Header Image */}
              <div className="h-48 w-full relative">
                <img src={selectedFertilizer.image} alt={selectedFertilizer.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-6">
                   <h3 className="text-3xl font-black text-white">{selectedFertilizer.name}</h3>
                   <p className="text-slate-200 font-medium">{selectedFertilizer.type} Fertilizer</p>
                </div>
                <button 
                  onClick={() => setSelectedFertilizer(null)}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Recommended Dosage</p>
                    <p className="text-slate-800 font-bold">{selectedFertilizer.dosage}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Application Timing</p>
                    <p className="text-slate-800 font-bold">{selectedFertilizer.timing}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-2">Description & Uses</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{selectedFertilizer.desc}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-2">{selectedFertilizer.uses}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Market Price</p>
                    <p className="text-2xl font-black text-slate-900">₹{selectedFertilizer.price}</p>
                  </div>
                  
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-green-600/30">
                    <ShoppingCart size={18} />
                    Purchase Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FertilizerGuide;

