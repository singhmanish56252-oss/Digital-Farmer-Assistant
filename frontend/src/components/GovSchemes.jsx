import React, { useState, useEffect } from 'react';
import { Building2, RefreshCcw, ExternalLink, CheckCircle2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const CATEGORIES = ['All', 'Income Support', 'Insurance', 'Credit', 'Irrigation', 'Market Access', 'Equipment'];

const catColors = {
  'Income Support': '#22c55e',
  'Insurance':      '#3b82f6',
  'Credit':         '#f59e0b',
  'Irrigation':     '#06b6d4',
  'Market Access':  '#8b5cf6',
  'Equipment':      '#f97316',
};

const GovSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const fetchSchemes = async (cat) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/schemes?category=${cat}`);
      setSchemes(res.data);
    } catch {
      setSchemes([
        { name: 'PM-KISAN', full_name: 'Pradhan Mantri Kisan Samman Nidhi', benefit: '₹6,000/year in 3 installments', eligibility: 'All landholding farmer families', deadline: 'Open year-round', category: 'Income Support', link: 'pmkisan.gov.in', icon: '💰' },
        { name: 'PMFBY', full_name: 'PM Fasal Bima Yojana', benefit: 'Crop insurance up to ₹2 lakh', eligibility: 'All farmers growing notified crops', deadline: 'Before sowing season', category: 'Insurance', link: 'pmfby.gov.in', icon: '🛡️' },
        { name: 'KCC', full_name: 'Kisan Credit Card', benefit: 'Credit up to ₹3 lakh @ 4% interest', eligibility: 'All farmers, sharecroppers', deadline: 'Open year-round', category: 'Credit', link: 'nabard.org', icon: '💳' },
        { name: 'PMKSY', full_name: 'PM Krishi Sinchayee Yojana', benefit: 'Subsidy on drip/sprinkler irrigation', eligibility: 'Individual farmers, SHGs', deadline: 'Apply via state agriculture dept', category: 'Irrigation', link: 'pmksy.gov.in', icon: '💧' },
        { name: 'eNAM', full_name: 'National Agriculture Market', benefit: 'Online crop trading at best prices', eligibility: 'All registered farmers', deadline: 'Open year-round', category: 'Market Access', link: 'enam.gov.in', icon: '📊' },
        { name: 'SMAM', full_name: 'Sub-Mission on Agricultural Mechanization', benefit: '50-80% subsidy on farm machinery', eligibility: 'Small & marginal farmers', deadline: 'Apply via CHC portal', category: 'Equipment', link: 'agrimachinery.nic.in', icon: '🚜' },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchSchemes(category); }, [category]);

  const filtered = schemes.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Central & State Benefits</p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Government Scheme Finder</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Find schemes you're eligible for — subsidies, insurance, credit & more</p>
        </div>
        <div className="relative">
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search scheme..."
            style={{ paddingLeft: 34, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 13, color: '#94a3b8', outline: 'none', width: 220 }} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Schemes', val: '6+', icon: '🏛️', color: '#22c55e' },
          { label: 'Total Benefit', val: '₹12L+', icon: '💰', color: '#f59e0b' },
          { label: 'Farmer Coverage', val: '12 Cr', icon: '👨‍🌾', color: '#3b82f6' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, color: s.color, letterSpacing: '-0.03em' }}>{s.val}</p>
            <p style={{ fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            style={{
              padding: '7px 16px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none',
              background: category === cat ? `${catColors[cat] || '#22c55e'}25` : 'rgba(255,255,255,0.04)',
              color: category === cat ? (catColors[cat] || '#4ade80') : '#64748b',
              outline: category === cat ? `1px solid ${catColors[cat] || '#22c55e'}50` : '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.2s'
            }}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><RefreshCcw size={32} className="animate-spin" style={{ color: '#22c55e' }} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((scheme, i) => {
            const col = catColors[scheme.category] || '#22c55e';
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="glass-card p-6 flex flex-col" style={{ borderTop: `3px solid ${col}` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div style={{ fontSize: 32, marginBottom: 6 }}>{scheme.icon}</div>
                    <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 999, background: `${col}18`, color: col, border: `1px solid ${col}30`, fontWeight: 700, textTransform: 'uppercase' }}>
                      {scheme.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: col }}>{scheme.name}</h3>
                  </div>
                </div>

                <h4 style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 12, lineHeight: 1.4 }}>{scheme.full_name}</h4>

                <div className="space-y-3 flex-1 mb-5">
                  <div className="p-3 rounded-xl" style={{ background: `${col}0d`, border: `1px solid ${col}1a` }}>
                    <p style={{ fontSize: 10, color: col, fontWeight: 700, textTransform: 'uppercase', marginBottom: 3 }}>💰 Benefit</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>{scheme.benefit}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 3 }}>✓ Eligibility</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>{scheme.eligibility}</p>
                  </div>
                  <div className="flex items-center gap-2" style={{ padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)' }}>
                    <span style={{ fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>📅 Deadline:</span>
                    <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{scheme.deadline}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="btn-ghost flex-1 justify-center" style={{ fontSize: 12 }}>
                    Check Eligibility
                  </button>
                  <button className="btn-primary flex-1 justify-center" style={{ fontSize: 12, background: `linear-gradient(135deg, ${col}cc, ${col})` }}>
                    <ExternalLink size={13} /> Apply Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GovSchemes;
