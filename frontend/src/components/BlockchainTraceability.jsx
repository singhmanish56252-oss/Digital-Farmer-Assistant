import React, { useState } from 'react';
import { ShieldCheck, Package, Truck, Store, MapPin, Search, ChevronRight, Hash, Database, CheckCircle2, History } from 'lucide-react';
import { motion } from 'framer-motion';

const BlockchainTraceability = () => {
  const [batchId, setBatchId] = useState('KS-WHT-2026-0042');
  const [isSearching, setIsSearching] = useState(false);

  const timeline = [
    { 
      stage: 'Seed Selection', 
      date: 'Oct 15, 2025', 
      location: 'Certified Seed Bank, Punjab', 
      hash: '0x8f2a...3e12', 
      status: 'Verified',
      icon: CheckCircle2,
      details: 'Sonalika Grade-A Certified Seeds'
    },
    { 
      stage: 'Cultivation', 
      date: 'Oct 2025 - Mar 2026', 
      location: 'Farmer ID: #4492 (Patna, Bihar)', 
      hash: '0x1c4d...a9b0', 
      status: 'Verified',
      icon: CheckCircle2,
      details: 'Organic fertilizer usage recorded on-chain.'
    },
    { 
      stage: 'Harvesting', 
      date: 'Mar 12, 2026', 
      location: 'Patna Farm Sector-4', 
      hash: '0x5e2b...f8c1', 
      status: 'Verified',
      icon: CheckCircle2,
      details: 'Moisture content at harvest: 14.2%'
    },
    { 
      stage: 'Quality Check', 
      date: 'Mar 15, 2026', 
      location: 'District Testing Lab', 
      hash: '0x7a8c...2d4e', 
      status: 'Verified',
      icon: CheckCircle2,
      details: 'Protein content: 12.5%, Grade: Premium'
    },
    { 
      stage: 'Packaging & QR', 
      date: 'Mar 18, 2026', 
      location: 'Kisan Seva Processing Hub', 
      hash: '0x9b3f...e6d7', 
      status: 'Processing',
      icon: History,
      details: 'Batch assigned QR ID for retail tracking.'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 400);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="section-label mb-1">🔗 Agri-Chain Ledger</p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Blockchain Traceability</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>End-to-end provenance for crop transparency and trust</p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center gap-2">
            <Database size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Mainnet Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Batch Info & Search */}
        <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6 border border-slate-800">
                <h3 className="text-sm font-bold text-slate-100 mb-4">Track Batch</h3>
                <form onSubmit={handleSearch} className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                        type="text" 
                        value={batchId}
                        onChange={(e) => setBatchId(e.target.value)}
                        className="input-dark pl-10 pr-4 py-3 text-sm" 
                        placeholder="Enter Batch ID..." 
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary rounded-lg text-black hover:scale-105 transition-transform">
                        <ChevronRight size={14} />
                    </button>
                </form>

                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Current Batch</p>
                        <p className="text-sm font-black text-white flex items-center gap-2">
                            <Package size={16} className="text-primary" /> {batchId}
                        </p>
                        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Product</span>
                            <span className="text-xs font-bold text-slate-300">Wheat (Premium Grade)</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-green-500">Authenticity Verified</p>
                            <p className="text-[10px] text-green-500/60 font-medium">Verified by Smart Contract v2.1</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800">
                <h3 className="text-sm font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <Hash size={16} className="text-slate-500" /> Genesis Record
                </h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500 font-bold uppercase">Contract Address</span>
                        <span className="text-primary font-mono font-bold">0xAgri...7fE9</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500 font-bold uppercase">Token Standard</span>
                        <span className="text-slate-300 font-bold">ERC-721 (Agri-NFT)</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500 font-bold uppercase">Block Height</span>
                        <span className="text-slate-300 font-bold">#19,442,105</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Right: Traceability Timeline */}
        <div className="lg:col-span-2">
            <div className="glass-card p-8 border border-slate-800 min-h-[500px]">
                <h3 className="text-lg font-bold text-slate-100 mb-8 flex items-center gap-2">
                    <History size={20} className="text-primary" /> Provenance Journey
                </h3>
                
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800" />
                    
                    <div className="space-y-8 relative z-10">
                        {timeline.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-8 group"
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-slate-900 z-10 transition-colors ${step.status === 'Verified' ? 'bg-primary text-black' : 'bg-slate-700 text-slate-400'}`}>
                                    <step.icon size={14} />
                                </div>
                                
                                <div className="flex-1 pb-8 border-b border-slate-800 group-last:border-none">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                        <h4 className="text-base font-black text-white">{step.stage}</h4>
                                        <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded uppercase tracking-widest">{step.date}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                                        <MapPin size={12} className="text-slate-600" /> {step.location}
                                    </div>
                                    
                                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 leading-relaxed italic">
                                        "{step.details}"
                                    </div>
                                    
                                    <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-slate-600">
                                        <Hash size={10} /> {step.hash}
                                        <button className="text-primary hover:underline font-bold ml-2">VIEW TRANSACTION</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainTraceability;
