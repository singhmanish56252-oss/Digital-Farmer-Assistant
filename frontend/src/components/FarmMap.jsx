import React, { useState } from 'react';
import { 
  Map as MapIcon, MapPin, Navigation, Target, Ruler, 
  Save, Plus, Layers, Search, Crosshair, ArrowRight,
  Maximize, AlertCircle, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FarmMap = () => {
  const [activeLayer, setActiveLayer] = useState('satellite');
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [savedZones, setSavedZones] = useState([
    { id: 1, name: 'North Field (Wheat)', area: '2.4 Acres', color: '#22c55e' },
    { id: 2, name: 'South Plot (Mustard)', area: '1.8 Acres', color: '#e8a838' },
  ]);

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-120px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
        <div>
          <p style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            GPS Tracking · Satellite View
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Farm Mapping System</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Mark boundaries, measure area, and monitor field health via satellite</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost" style={{ fontSize: 13 }}>
            <Layers size={16} /> Layers
          </button>
          <button className="btn-primary" style={{ fontSize: 13 }} onClick={() => setIsDrawing(!isDrawing)}>
            {isDrawing ? <><Save size={16} /> Save Area</> : <><Plus size={16} /> Draw Boundary</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Left Panel - Zones & Stats */}
        <div className="glass-card flex flex-col overflow-hidden h-full">
          <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="relative">
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input type="text" placeholder="Search coordinates..." 
                className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm rounded-xl outline-none"
                style={{ padding: '8px 12px 8px 34px' }} />
            </div>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Saved Fields</p>
              <div className="space-y-2">
                {savedZones.map(zone => (
                  <div key={zone.id} className="p-3 rounded-xl border transition-all cursor-pointer hover:bg-slate-800/50"
                    style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: zone.color, boxShadow: `0 0 8px ${zone.color}` }} />
                        <span className="text-sm font-bold text-slate-200">{zone.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Ruler size={12} /> {zone.area}</span>
                      <span className="flex items-center gap-1 text-green-400 font-semibold"><TrendingUp size={12} /> High Yield</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Map Tools</p>
              <div className="grid grid-cols-2 gap-2">
                <button className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${isDrawing ? 'bg-sky-500/10 border-sky-500/30' : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50'}`}>
                  <Ruler size={20} className={isDrawing ? 'text-sky-400' : 'text-slate-400'} />
                  <span className={`text-xs font-bold ${isDrawing ? 'text-sky-400' : 'text-slate-400'}`}>Measure</span>
                </button>
                <button className="p-3 rounded-xl border bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 flex flex-col items-center gap-2 transition-all">
                  <Navigation size={20} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-400">Navigate</span>
                </button>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={16} className="text-amber-500" />
                <span className="text-sm font-bold text-slate-200">Soil Moisture Low</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Satellite data indicates low moisture in the North Field. Irrigation recommended.</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Map View */}
        <div className="lg:col-span-3 glass-card relative overflow-hidden group">
          {/* Simulated Map Image / Background */}
          <div className="absolute inset-0 bg-slate-900" style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1586771107445-d3af9e170cdd?q=80&w=2000&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: activeLayer === 'ndvi' ? 'hue-rotate(180deg) saturate(2)' : 'saturate(1.2)'
            }} 
          />
          <div className="absolute inset-0 bg-slate-900/40" />

          {/* Simulated Overlays */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* North Field */}
            <polygon points="20%,20% 60%,25% 55%,60% 15%,50%" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="2" />
            <circle cx="37%" cy="38%" r="4" fill="#22c55e" className="animate-pulse" />
            
            {/* South Plot */}
            <polygon points="65%,30% 90%,35% 85%,70% 60%,65%" fill="rgba(232,168,56,0.2)" stroke="#e8a838" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <div className="glass-card p-1 flex flex-col gap-1 backdrop-blur-md bg-slate-900/60">
              <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors"><Plus size={18} /></button>
              <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors"><div className="w-3 h-0.5 bg-slate-300 mx-auto" /></button>
            </div>
            <button className="glass-card p-3 backdrop-blur-md bg-slate-900/60 hover:bg-slate-800 rounded-xl text-slate-300 transition-colors">
              <Crosshair size={18} />
            </button>
            <button className="glass-card p-3 backdrop-blur-md bg-slate-900/60 hover:bg-slate-800 rounded-xl text-slate-300 transition-colors">
              <Maximize size={18} />
            </button>
          </div>

          {/* Layer Selector */}
          <div className="absolute bottom-4 left-4 glass-card p-2 backdrop-blur-md bg-slate-900/60 rounded-xl flex gap-1">
            <button onClick={() => setActiveLayer('satellite')} 
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeLayer === 'satellite' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              Satellite
            </button>
            <button onClick={() => setActiveLayer('terrain')} 
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeLayer === 'terrain' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              Terrain
            </button>
            <button onClick={() => setActiveLayer('ndvi')} 
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeLayer === 'ndvi' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              NDVI (Health)
            </button>
          </div>

          {/* Drawing Tooltip */}
          <AnimatePresence>
            {isDrawing && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 glass-card px-6 py-3 backdrop-blur-md bg-sky-900/80 border-sky-500/30 rounded-full flex items-center gap-3 shadow-xl">
                <MapPin size={16} className="text-sky-400 animate-bounce" />
                <span className="text-sm font-bold text-white">Click on map to drop points for boundary</span>
                <button onClick={() => setIsDrawing(false)} className="ml-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-white transition-colors">Cancel</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FarmMap;
