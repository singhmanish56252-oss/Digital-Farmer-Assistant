import React, { useState, useEffect } from 'react';
import { Truck, Star, MapPin, Phone, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';

const TYPES = ['All', 'Tractor', 'Harvester', 'Thresher', 'Irrigation', 'Sprayer'];

const typeIcons = { Tractor: '🚜', Harvester: '🌾', Thresher: '⚙️', Irrigation: '💧', Sprayer: '💨' };

const EquipmentRental = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('All');
  const [booked, setBooked] = useState({});

  const fetchEquipment = async (t) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/equipment?type=${t}`);
      setEquipment(res.data);
    } catch {
      setEquipment([
        { name: 'John Deere Tractor 55HP', owner: 'Ramesh Yadav',  location: 'Kalyanpur',   rate: 800,  unit: 'hr',  available: true,  rating: 4.8, type: 'Tractor' },
        { name: 'Paddy Thresher',          owner: 'Suresh Patel',  location: 'Patna Rural', rate: 1200, unit: 'day', available: true,  rating: 4.5, type: 'Thresher' },
        { name: 'Combine Harvester',       owner: 'Agro Services', location: 'District HQ', rate: 1500, unit: 'hr',  available: true,  rating: 4.9, type: 'Harvester' },
        { name: 'Drip Irrigation Kit',     owner: 'AquaFarm',      location: 'Alwar',       rate: 2000, unit: 'day', available: true,  rating: 4.6, type: 'Irrigation' },
        { name: 'Power Sprayer',           owner: 'Vijay Kumar',   location: 'Kalyanpur',   rate: 300,  unit: 'hr',  available: true,  rating: 4.3, type: 'Sprayer' },
        { name: 'Rotavator (7ft)',         owner: 'Mahesh Singh',  location: 'Kalyanpur',   rate: 600,  unit: 'hr',  available: false, rating: 4.7, type: 'Tractor' },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchEquipment(type); }, [type]);

  const handleBook = (idx) => {
    setBooked(prev => ({ ...prev, [idx]: true }));
    setTimeout(() => setBooked(prev => ({ ...prev, [idx]: false })), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Village Equipment Network</p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Equipment Rental</h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Rent farm machinery from nearby owners — affordable, verified, and nearby</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Listed Equipment', val: equipment.length, icon: '🚜', color: '#f59e0b' },
          { label: 'Available Now', val: equipment.filter(e => e.available).length, icon: '✅', color: '#22c55e' },
          { label: 'Avg Rating', val: '4.6 ★', icon: '⭐', color: '#a78bfa' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <p style={{ fontSize: '1.8rem', fontWeight: 900, color: s.color, letterSpacing: '-0.03em' }}>{s.val}</p>
            <p style={{ fontSize: 10, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {TYPES.map(t => (
          <button key={t} onClick={() => setType(t)}
            style={{
              padding: '7px 16px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none',
              background: type === t ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)',
              color: type === t ? '#fbbf24' : '#64748b',
              outline: type === t ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.2s'
            }}>
            {typeIcons[t] ? `${typeIcons[t]} ` : ''}{t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><RefreshCcw size={32} className="animate-spin" style={{ color: '#f59e0b' }} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {equipment.map((eq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="glass-card p-6 flex flex-col" style={{ opacity: eq.available ? 1 : 0.6 }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div style={{ fontSize: 36, marginBottom: 6 }}>{typeIcons[eq.type] || '🚜'}</div>
                  <span style={{
                    fontSize: 10, padding: '3px 10px', borderRadius: 999, fontWeight: 700, textTransform: 'uppercase',
                    background: eq.available ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                    color: eq.available ? '#4ade80' : '#f87171',
                    border: `1px solid ${eq.available ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                  }}>
                    {eq.available ? '✓ Available' : '✗ Booked'}
                  </span>
                </div>
                <div className="text-right">
                  <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f59e0b' }}>₹{eq.rate}</p>
                  <p style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>per {eq.unit}</p>
                </div>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', marginBottom: 8 }}>{eq.name}</h3>

              <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: 10, color: '#475569', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>👤 Owner</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0' }}>{eq.owner}</p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: 10, color: '#475569', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>📍 Location</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0' }}>{eq.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={13} style={{ color: j < Math.floor(eq.rating) ? '#f59e0b' : '#1e293b', fill: j < Math.floor(eq.rating) ? '#f59e0b' : 'none' }} />
                ))}
                <span style={{ fontSize: 12, color: '#64748b', marginLeft: 4, fontWeight: 600 }}>{eq.rating}</span>
              </div>

              <div className="flex gap-2">
                <button className="btn-ghost flex-1 justify-center" style={{ fontSize: 12 }}>
                  <Phone size={13} /> Contact
                </button>
                <button
                  disabled={!eq.available || booked[i]}
                  onClick={() => handleBook(i)}
                  className="btn-primary flex-[2] justify-center"
                  style={{ fontSize: 12, background: booked[i] ? 'linear-gradient(135deg,#16a34a,#22c55e)' : undefined }}>
                  {booked[i] ? <><CheckCircle2 size={13} /> Booked!</> : <><Truck size={13} /> Book Now</>}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="glass-card p-5 flex gap-4" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
        <span style={{ fontSize: 28 }}>💡</span>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24', marginBottom: 4 }}>Save up to 70% vs owning equipment</h4>
          <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.7 }}>
            A tractor costs ₹8-15 lakhs to buy. By renting for ₹800/hr during peak seasons (only ~100 hours/year), you save ₹7+ lakhs in capital while accessing the same machinery. The SMAM scheme also provides 50-80% subsidy on equipment purchase for small farmers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EquipmentRental;
