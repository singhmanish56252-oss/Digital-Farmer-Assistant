import React, { useState, useEffect } from 'react';
import { Wifi, Droplets, Thermometer, Battery, Activity, AlertTriangle, Play, Pause, Settings, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const IoTDashboard = () => {
  const [sensors, setSensors] = useState([
    { id: 'S1', type: 'Moisture', value: 42, unit: '%', status: 'optimal', battery: 85, location: 'North Field' },
    { id: 'S2', type: 'Moisture', value: 28, unit: '%', status: 'critical', battery: 62, location: 'South Field' },
    { id: 'S3', type: 'Temperature', value: 31, unit: '°C', status: 'warning', battery: 90, location: 'Greenhouse' },
    { id: 'S4', type: 'Water Level', value: 85, unit: '%', status: 'optimal', battery: 100, location: 'Main Tank' }
  ]);
  
  const [pumpActive, setPumpActive] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const refreshSensors = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setSensors(sensors.map(s => {
        let diff = Math.floor(Math.random() * 5) - 2;
        return { ...s, value: Math.max(0, s.value + diff) };
      }));
      setIsUpdating(false);
    }, 400);
  };

  useEffect(() => {
    const interval = setInterval(refreshSensors, 5000);
    return () => clearInterval(interval);
  }, [sensors]);

  const togglePump = () => {
    setPumpActive(!pumpActive);
    if (!pumpActive) {
      setTimeout(() => {
        setSensors(sensors.map(s => s.id === 'S2' ? { ...s, value: 45, status: 'optimal' } : s));
      }, 1000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Advanced Farm Automation
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>IoT Sensor Dashboard</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Live telemetry and automated irrigation control</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700">
            <Wifi size={16} className="text-green-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-300">Hub Online</span>
          </div>
          <button onClick={refreshSensors} className="btn-ghost !px-3">
            <RefreshCcw size={16} className={isUpdating ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="glass-card p-6 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors ${pumpActive ? 'bg-blue-500 shadow-blue-500/40' : 'bg-slate-700'}`}>
            <Droplets size={28} className={pumpActive ? 'text-white' : 'text-slate-400'} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Main Irrigation Pump</h3>
            <p className="text-sm text-slate-400 flex items-center gap-2">
              Status: <span className={pumpActive ? 'text-blue-400 font-bold' : 'text-slate-500'}>{pumpActive ? 'ACTIVE (Pumping 40L/min)' : 'STANDBY'}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={togglePump} className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${pumpActive ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20'}`}>
            {pumpActive ? <><Pause size={18} /> Stop Pump</> : <><Play size={18} /> Start Pump</>}
          </button>
          <button className="px-4 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {sensors.map((sensor, i) => {
          let color = '#3ddc84'; // optimal
          if (sensor.status === 'warning') color = '#f59e0b';
          if (sensor.status === 'critical') color = '#ef4444';
          
          const Icon = sensor.type === 'Temperature' ? Thermometer : (sensor.type === 'Moisture' ? Droplets : Activity);

          return (
            <motion.div key={sensor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass-card p-5 relative overflow-hidden group border" style={{ borderColor: `${color}40` }}>
              
              <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full" style={{ background: `${color}15` }} />
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-2 rounded-lg" style={{ background: `${color}20` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded-md mb-1">{sensor.id}</span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                    <Battery size={10} className={sensor.battery < 20 ? 'text-red-400' : 'text-green-400'} /> {sensor.battery}%
                  </div>
                </div>
              </div>

              <div className="relative z-10 mb-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{sensor.type}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{sensor.value}</span>
                  <span className="text-sm font-bold text-slate-500">{sensor.unit}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  <Wifi size={12} className="text-slate-500" /> {sensor.location}
                </span>
                {sensor.status === 'critical' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold animate-pulse">ACTION REQUIRED</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Rules & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 border border-slate-700/50">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Activity size={18} className="text-blue-400" /> Automation Rules
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700">
              <div>
                <p className="text-sm font-bold text-slate-200">Auto-Irrigate South Field</p>
                <p className="text-xs text-slate-400">If Moisture &lt; 30% AND Time is 18:00 - 06:00</p>
              </div>
              <div className="w-10 h-5 bg-green-500 rounded-full relative shadow-inner">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700">
              <div>
                <p className="text-sm font-bold text-slate-200">High Temp Alert</p>
                <p className="text-xs text-slate-400">If Greenhouse Temp &gt; 35°C, send SMS</p>
              </div>
              <div className="w-10 h-5 bg-green-500 rounded-full relative shadow-inner">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border border-slate-700/50">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-400" /> System Logs
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3 text-slate-300 border-b border-slate-800 pb-2">
              <span className="text-slate-500 font-mono text-xs w-16">10:42 AM</span>
              <p>Pump stopped automatically (Moisture reached optimal level)</p>
            </div>
            <div className="flex gap-3 text-amber-400 border-b border-slate-800 pb-2">
              <span className="text-slate-500 font-mono text-xs w-16">09:15 AM</span>
              <p>Warning: Greenhouse temperature high (34°C)</p>
            </div>
            <div className="flex gap-3 text-red-400 border-b border-slate-800 pb-2">
              <span className="text-slate-500 font-mono text-xs w-16">08:30 AM</span>
              <p>CRITICAL: South Field moisture dropped below 30%</p>
            </div>
            <div className="flex gap-3 text-slate-300">
              <span className="text-slate-500 font-mono text-xs w-16">06:00 AM</span>
              <p>System daily self-check completed successfully.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTDashboard;
