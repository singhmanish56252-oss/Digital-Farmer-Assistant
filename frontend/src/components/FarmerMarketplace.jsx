import React, { useState } from 'react';
import { 
  Store, ShoppingBag, Tag, Plus, Search, Star, 
  ShieldCheck, MapPin, TrendingUp, Filter, CheckCircle2,
  PackageOpen, IndianRupee, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const activeListings = [
  { id: 1, crop: 'Organic Sharbati Wheat', qty: '50 Quintals', price: 2850, unit: 'Quintal', status: 'Active', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop', views: 142 },
  { id: 2, crop: 'Basmati Rice (Premium)', qty: '20 Quintals', price: 4200, unit: 'Quintal', status: 'Pending Offer', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop', views: 89 },
];

const buyerRequests = [
  { id: 101, buyer: 'ITC AgriTech', req: 'Wheat (Lok-1)', qty: '100+ Qtl', price: 2400, location: 'Indore, MP', verified: true },
  { id: 102, buyer: 'Nature Fresh Organics', req: 'Organic Mustard', qty: '30 Qtl', price: 5800, location: 'Bhopal, MP', verified: true },
  { id: 103, buyer: 'Local Traders Assoc.', req: 'Soyabean', qty: '50 Qtl', price: 4100, location: 'Ujjain, MP', verified: false },
];

const FarmerMarketplace = () => {
  const [activeTab, setActiveTab] = useState('sell'); // 'sell' or 'requests'
  const [showAddListing, setShowAddListing] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Direct to Buyer · 0% Commission
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Farmer Marketplace</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Sell your harvest directly to verified buyers and eliminate middleman cuts</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost" style={{ fontSize: 13 }}>
            <Filter size={16} /> Filters
          </button>
          <button className="btn-primary" style={{ fontSize: 13, background: 'linear-gradient(135deg, #f59e0b, #d97706)' }} onClick={() => setShowAddListing(!showAddListing)}>
            {showAddListing ? 'Cancel' : <><Plus size={16} /> New Listing</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left column stats */}
        <div className="md:col-span-1 space-y-4">
          <div className="glass-card p-5" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: 24 }}>💰</span>
              <TrendingUp size={16} style={{ color: '#22c55e' }} />
            </div>
            <p style={{ fontSize: 11, color: '#d97706', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Extra Profit Earned</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f1f5f9' }}>₹14,250</h3>
            <p style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>by bypassing mandi agents</p>
          </div>

          <div className="glass-card p-5">
            <h3 style={{ fontSize: 14, fontWeight: 800, color: '#f1f5f9', marginBottom: 12 }}>Platform Benefits</h3>
            <div className="space-y-3">
              {[
                { icon: ShieldCheck, text: 'Verified Buyers', color: '#38bdf8' },
                { icon: IndianRupee, text: 'Instant Payment', color: '#22c55e' },
                { icon: PackageOpen, text: 'Farm Pickup', color: '#f59e0b' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg" style={{ background: `${b.color}20` }}>
                    <b.icon size={14} style={{ color: b.color }} />
                  </div>
                  <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 600 }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            {showAddListing ? (
              <motion.div key="add-listing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="glass-card p-6 border border-amber-500/20">
                <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
                  <Tag size={18} className="text-amber-500" /> Create New Listing
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Crop Name</label>
                    <input type="text" className="input-dark w-full" placeholder="e.g., Wheat (Lok-1)" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quantity (Quintals)</label>
                    <input type="number" className="input-dark w-full" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Price per Quintal (₹)</label>
                    <input type="number" className="input-dark w-full" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Harvest Date</label>
                    <input type="date" className="input-dark w-full" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Upload Photos</label>
                    <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center bg-slate-800/30 cursor-pointer hover:bg-slate-800/50 transition-colors">
                      <Plus size={24} className="text-slate-500 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">Click to upload harvest photos</p>
                    </div>
                  </div>
                </div>
                <button className="btn-primary w-full justify-center py-3" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }} onClick={() => setShowAddListing(false)}>
                  Publish Listing
                </button>
              </motion.div>
            ) : (
              <motion.div key="listings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Tabs */}
                <div className="flex items-center gap-2 p-1 bg-slate-800/50 rounded-xl mb-6 w-fit border border-slate-700/50">
                  <button onClick={() => setActiveTab('sell')} 
                    className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'sell' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>
                    My Active Listings
                  </button>
                  <button onClick={() => setActiveTab('requests')} 
                    className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'requests' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>
                    Buyer Requests
                  </button>
                </div>

                {activeTab === 'sell' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {activeListings.map(item => (
                      <div key={item.id} className="glass-card overflow-hidden group">
                        <div className="h-32 bg-slate-800 relative overflow-hidden">
                          <img src={item.image} alt={item.crop} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" />
                          <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold backdrop-blur-md bg-black/40 border border-white/10 text-white flex items-center gap-1">
                            <Star size={12} className="text-amber-400 fill-amber-400" /> {item.views} Views
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-slate-100">{item.crop}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full font-bold border ${item.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                            <span className="flex items-center gap-1"><ShoppingBag size={14} /> {item.qty}</span>
                            <span className="flex items-center gap-1 font-bold text-slate-200"><IndianRupee size={14} /> {item.price}/{item.unit}</span>
                          </div>
                          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-bold transition-colors border border-slate-700">
                            Edit Listing
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {buyerRequests.map(req => (
                      <div key={req.id} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4" style={{ borderLeftColor: req.verified ? '#22c55e' : '#64748b' }}>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-bold text-slate-200">{req.buyer}</h4>
                            {req.verified && <CheckCircle2 size={14} className="text-green-500" />}
                          </div>
                          <p className="text-lg font-bold text-white">{req.req}</p>
                          <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                            <span className="flex items-center gap-1"><ShoppingBag size={12} /> Needs {req.qty}</span>
                            <span className="flex items-center gap-1"><MapPin size={12} /> {req.location}</span>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
                          <div className="text-left sm:text-right">
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Offering</p>
                            <p className="text-xl font-black text-amber-400 flex items-center">
                              <IndianRupee size={18} /> {req.price} <span className="text-sm text-slate-500 ml-1 font-normal">/ Qtl</span>
                            </p>
                          </div>
                          <button className="btn-primary py-1.5 px-4 text-xs">
                            Contact Buyer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FarmerMarketplace;
