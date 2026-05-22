import React, { useState } from 'react';
import { Satellite, Map, Layers, Cloud, Sun, Info, Maximize2, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const SatelliteMonitoring = () => {
  const [activeLayer, setActiveLayer] = useState('NDVI');
  const [isScanning, setIsScanning] = useState(false);

  const layers = [
    { id: 'NDVI', label: 'Vegetation Index', color: '#10b981', desc: 'Normalized Difference Vegetation Index (NDVI) shows plant health.' },
    { id: 'Moisture', label: 'Surface Moisture', color: '#3b82f6', desc: 'Tracks water content in soil and plant leaves.' },
    { id: 'Thermal', label: 'Land Temperature', color: '#ef4444', desc: 'Identifies heat stress zones in the field.' },
    { id: 'RGB', label: 'True Color', color: '#94a3b8', desc: 'Satellite view as seen by the human eye.' }
  ];

  const scanField = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="section-label mb-1">🛰️ Remote Sensing AI</p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Satellite Intelligence</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>High-resolution spectral analysis of your farm acreage</p>
        </div>
        <div className="flex gap-2">
          <button onClick={scanField} className="btn-primary !py-2 !px-4 !text-sm">
            <RefreshCw size={14} className={isScanning ? 'animate-spin' : ''} /> {isScanning ? 'Analyzing...' : 'Request New Scan'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Layer Selector */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-5 border border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Layers size={16} className="text-primary" /> Spectral Layers
            </h3>
            <div className="space-y-2">
              {layers.map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all border ${activeLayer === layer.id ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-slate-800/50 border-transparent text-slate-400 hover:bg-slate-800'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider">{layer.id}</span>
                    {activeLayer === layer.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </div>
                  <p className="text-[11px] font-medium leading-tight">{layer.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-5 border border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 mb-3 flex items-center gap-2">
              <Info size={16} className="text-amber-400" /> Layer Insights
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {layers.find(l => l.id === activeLayer).desc}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                <span>Health Legend</span>
                <span>(NDVI)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500" />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-bold">
                <span>LOW</span>
                <span>MODERATE</span>
                <span>HIGH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map View */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card aspect-video relative overflow-hidden border border-slate-800 bg-slate-900 group">
            {/* Mock Map Background */}
            <div className="absolute inset-0 opacity-40">
                <img 
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
                    alt="Satellite Field" 
                    className="w-full h-full object-cover grayscale"
                />
            </div>
            
            {/* Spectral Overlay Filter */}
            <div 
                className={`absolute inset-0 transition-opacity duration-1000 ${isScanning ? 'opacity-20' : 'opacity-60'}`}
                style={{ 
                    background: activeLayer === 'NDVI' ? 'radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.4), rgba(245, 158, 11, 0.3), rgba(239, 68, 68, 0.2))' :
                                activeLayer === 'Moisture' ? 'radial-gradient(circle at 60% 50%, rgba(59, 130, 246, 0.5), rgba(59, 130, 246, 0.2), transparent)' :
                                activeLayer === 'Thermal' ? 'radial-gradient(circle at 30% 70%, rgba(239, 68, 68, 0.5), rgba(245, 158, 11, 0.3), transparent)' : 'transparent'
                }}
            />

            {/* Scanning Line */}
            {isScanning && (
                <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5 bg-primary/80 z-20 shadow-[0_0_15px_rgba(61,220,132,0.8)]"
                />
            )}

            {/* UI Controls on Map */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button className="p-2 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-700 text-white hover:bg-slate-800"><Maximize2 size={16}/></button>
                <button className="p-2 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-700 text-white hover:bg-slate-800"><ZoomIn size={16}/></button>
                <button className="p-2 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-700 text-white hover:bg-slate-800"><ZoomOut size={16}/></button>
            </div>

            <div className="absolute bottom-4 left-4 z-10">
                <div className="px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-700">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Sentinel-2B Imagery</p>
                    <p className="text-xs font-bold text-white">May 12, 2026 · 10:24 AM</p>
                </div>
            </div>

            {/* Target Reticles */}
            <div className="absolute top-1/3 left-1/4 w-8 h-8 border-2 border-primary/50 rounded-full animate-ping pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {isScanning && <p className="text-primary font-black text-sm tracking-widest bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-primary/20">AI CLASSIFYING...</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 border border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Acreage Managed</p>
                <p className="text-xl font-black text-white">12.4 <span className="text-xs font-medium text-slate-400 uppercase">Acres</span></p>
            </div>
            <div className="glass-card p-4 border border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Mean NDVI</p>
                <p className="text-xl font-black text-primary">0.72 <span className="text-xs font-medium text-slate-400 uppercase">Healthy</span></p>
            </div>
            <div className="glass-card p-4 border border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Cloud Cover</p>
                <p className="text-xl font-black text-blue-400">4% <span className="text-xs font-medium text-slate-400 uppercase">Clear Sky</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteMonitoring;
