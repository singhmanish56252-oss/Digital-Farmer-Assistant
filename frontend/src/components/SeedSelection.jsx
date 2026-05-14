import React, { useState } from 'react';
import { Sprout, CheckCircle2, MapPin, Award, Activity, Search, ShieldCheck, ThermometerSun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SEED_DATA = {
  Wheat: [
    { name: 'HD-2967', type: 'Hybrid', traits: ['High Yield', 'Rust Resistant'], germination: '95%', price: '₹45/kg', shop: 'Kisan Agro Kendra, 2.4 km' },
    { name: 'Lok-1', type: 'Standard', traits: ['Heat Tolerant', 'Early Maturity'], germination: '92%', price: '₹38/kg', shop: 'Govt Seed Depot, 5.1 km' },
    { name: 'Sharbati', type: 'Premium', traits: ['Premium Quality', 'Drought Tolerant'], germination: '90%', price: '₹55/kg', shop: 'Ramesh Seeds, 1.2 km' },
  ],
  Rice: [
    { name: 'Pusa Basmati 1121', type: 'Premium', traits: ['Long Grain', 'Aromatic'], germination: '94%', price: '₹120/kg', shop: 'Kisan Agro Kendra, 2.4 km' },
    { name: 'IR64', type: 'Hybrid', traits: ['High Yield', 'Pest Resistant'], germination: '96%', price: '₹35/kg', shop: 'Govt Seed Depot, 5.1 km' },
    { name: 'Swarna (MTU 7029)', type: 'Standard', traits: ['Water Logging Tolerant'], germination: '91%', price: '₹30/kg', shop: 'Agri Supply Co, 3.8 km' },
  ]
};

const SeedSelection = () => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [seeds, setSeeds] = useState(SEED_DATA['Wheat']);

  const handleCropChange = (crop) => {
    setSelectedCrop(crop);
    setSeeds(SEED_DATA[crop] || []);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Genetics & Quality Analysis
        </p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Seed Selection Assistant</h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Discover high-yield, disease-resistant seeds with AI germination prediction</p>
      </div>

      {/* Crop Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {['Wheat', 'Rice', 'Cotton', 'Mustard', 'Maize'].map(crop => (
          <button key={crop} onClick={() => handleCropChange(crop)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${selectedCrop === crop ? 'bg-primary text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
            {crop}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div key={selectedCrop} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              {seeds.length > 0 ? seeds.map((seed, i) => (
                <div key={i} className="glass-card p-5 mb-4 border-l-4" style={{ borderLeftColor: seed.type === 'Hybrid' ? '#3ddc84' : (seed.type === 'Premium' ? '#f59e0b' : '#3b82f6') }}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>{seed.name}</h3>
                        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                          {seed.type}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {seed.traits.map((trait, j) => (
                          <span key={j} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(56,189,248,0.1)', color: '#38bdf8', fontWeight: 600 }}>
                            <ShieldCheck size={12} className="inline mr-1" />{trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p style={{ fontSize: 18, fontWeight: 900, color: '#3ddc84' }}>{seed.price}</p>
                      <p style={{ fontSize: 11, color: '#64748b' }}>Govt Certified</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 p-3 rounded-xl bg-slate-800/50">
                    <div>
                      <p style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>⚡ Germination Rate</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: seed.germination }} />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#e2e8f0' }}>{seed.germination}</span>
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>📍 Availability</p>
                      <p style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={14} className="text-red-400" /> {seed.shop}
                      </p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="glass-card p-10 text-center text-slate-400">
                  <Sprout size={40} className="mx-auto mb-4 opacity-50" />
                  <p>Seed data for {selectedCrop} is currently being updated by AI.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AI Analyzer Sidebar */}
        <div className="space-y-4">
          <div className="glass-card p-5 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Search size={18} className="text-indigo-400" /> Seed Quality Scanner
            </h3>
            <div className="h-32 border-2 border-dashed border-indigo-500/30 rounded-xl flex flex-col items-center justify-center mb-4 cursor-pointer hover:bg-indigo-500/10 transition-colors">
              <Activity size={28} className="text-indigo-400 mb-2" />
              <p className="text-xs text-indigo-200 font-medium">Upload Seed Photo for AI Analysis</p>
              <p className="text-[10px] text-indigo-300 mt-1">Detects impurities & damage</p>
            </div>
            <button className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-colors">
              Scan Seeds
            </button>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider text-slate-400">Recommendation Engine</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <ThermometerSun size={16} className="text-amber-500 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed"><strong className="text-white">Climate Match:</strong> HD-2967 is highly recommended for upcoming summer temperatures in your region.</p>
              </li>
              <li className="flex gap-3 items-start">
                <Award size={16} className="text-blue-400 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed"><strong className="text-white">Subsidy Active:</strong> 25% subsidy available on Hybrid seeds under National Food Security Mission.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedSelection;
