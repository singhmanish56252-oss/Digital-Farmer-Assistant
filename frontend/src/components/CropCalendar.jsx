import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, Droplets, RefreshCcw, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const TASK_CONFIG = {
  prep:      { color: '#8b5cf6', icon: '🌱', label: 'Preparation' },
  sow:       { color: '#22c55e', icon: '🌾', label: 'Sowing' },
  water:     { color: '#3b82f6', icon: '💧', label: 'Irrigation' },
  fertilize: { color: '#f59e0b', icon: '🧪', label: 'Fertilizer' },
  protect:   { color: '#ef4444', icon: '🛡️', label: 'Protection' },
  harvest:   { color: '#ec4899', icon: '🌾', label: 'Harvest' },
};

const CROPS = ['Wheat', 'Rice'];

const CropCalendar = () => {
  const [crop, setCrop] = useState('Wheat');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sowingDate, setSowingDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [currentDay, setCurrentDay] = useState(30);
  const [totalDays, setTotalDays] = useState(130);

  const fetchCalendar = async (c) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/calendar?crop=${c}`);
      setTasks(res.data.tasks);
      setTotalDays(res.data.total_days);
    } catch {
      setTasks([
        { day: 1, task: 'Land Preparation', desc: 'Plough and level the field. Apply FYM.', type: 'prep' },
        { day: 5, task: 'Sowing', desc: 'Sow at 100 kg/acre. Row spacing 22.5 cm.', type: 'sow' },
        { day: 21, task: 'First Irrigation', desc: 'Crown root initiation stage.', type: 'water' },
        { day: 25, task: 'Urea Top Dress', desc: 'Apply 1/3 Urea dose after irrigation.', type: 'fertilize' },
        { day: 60, task: 'Weed Control', desc: 'Apply 2,4-D herbicide.', type: 'protect' },
        { day: 130, task: 'Harvest', desc: 'Use combine harvester.', type: 'harvest' },
      ]);
      setTotalDays(130);
    }
    setLoading(false);
  };

  useEffect(() => { fetchCalendar(crop); }, [crop]);

  const getTaskDate = (day) => {
    const d = new Date(sowingDate);
    d.setDate(d.getDate() + day - 1);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const progressPct = Math.min(100, (currentDay / totalDays) * 100);

  const upcomingTasks = tasks.filter(t => t.day >= currentDay).slice(0, 3);
  const completedTasks = tasks.filter(t => t.day < currentDay);
  const activeTask = tasks.find(t => t.day >= currentDay);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <p style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Step-by-Step Farming Guide</p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Crop Calendar & Reminders</h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Track every farming task from sowing to harvest</p>
      </div>

      {/* Controls */}
      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>Select Crop</label>
            <div className="flex gap-2">
              {CROPS.map(c => (
                <button key={c} onClick={() => setCrop(c)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: 'none',
                    background: crop === c ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)',
                    color: crop === c ? '#4ade80' : '#64748b',
                    outline: crop === c ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.07)',
                    transition: 'all 0.2s'
                  }}>
                  {c === 'Wheat' ? '🌾' : '🍚'} {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>Sowing Date</label>
            <input type="date" value={sowingDate} onChange={e => setSowingDate(e.target.value)} className="input-dark" />
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Current Day</label>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#4ade80' }}>Day {currentDay}</span>
            </div>
            <input type="range" min="1" max={totalDays} value={currentDay} onChange={e => setCurrentDay(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#22c55e', cursor: 'pointer' }} />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass-card p-6">
        <div className="flex justify-between mb-3">
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>Season Progress</p>
            <p style={{ fontSize: 12, color: '#64748b' }}>Day {currentDay} of {totalDays} · {Math.round(progressPct)}% complete</p>
          </div>
          <div className="text-right">
            <p style={{ fontSize: 12, color: '#64748b' }}>Harvest in</p>
            <p style={{ fontSize: 18, fontWeight: 900, color: '#f59e0b' }}>{Math.max(0, totalDays - currentDay)} days</p>
          </div>
        </div>
        <div className="progress-bar" style={{ height: 10 }}>
          <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 1 }} />
        </div>
        {/* Stage markers */}
        <div className="flex justify-between mt-2">
          {['Sowing', 'Growing', 'Flowering', 'Harvest'].map((s, i) => (
            <span key={s} style={{ fontSize: 9, color: '#334155', fontWeight: 700, textTransform: 'uppercase' }}>{s}</span>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><RefreshCcw size={32} className="animate-spin" style={{ color: '#22c55e' }} /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-3">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Full Season Timeline</h3>
            {tasks.map((task, i) => {
              const tc = TASK_CONFIG[task.type] || TASK_CONFIG.prep;
              const isDone = task.day < currentDay;
              const isActive = activeTask && task.day === activeTask.day;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="flex gap-4 p-4 rounded-2xl transition-all"
                  style={{
                    background: isActive ? `${tc.color}12` : isDone ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.03)',
                    border: isActive ? `1px solid ${tc.color}35` : '1px solid rgba(255,255,255,0.05)',
                    opacity: isDone ? 0.6 : 1,
                  }}>
                  {/* Day Badge */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{ background: isDone ? 'rgba(34,197,94,0.15)' : `${tc.color}20`, border: `1px solid ${isDone ? 'rgba(34,197,94,0.3)' : tc.color + '40'}` }}>
                      {isDone ? <CheckCircle2 size={18} style={{ color: '#4ade80' }} /> : <span style={{ fontSize: 12, fontWeight: 800, color: tc.color }}>D{task.day}</span>}
                    </div>
                    {i < tasks.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 1 }} />}
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{tc.icon}</span>
                      <h4 style={{ fontSize: 13, fontWeight: 800, color: isDone ? '#64748b' : '#f1f5f9' }}>{task.task}</h4>
                      {isActive && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: `${tc.color}20`, color: tc.color, fontWeight: 700 }}>CURRENT</span>}
                      <span style={{ fontSize: 10, marginLeft: 'auto', color: '#475569', fontWeight: 600 }}>{getTaskDate(task.day)}</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{task.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar: Upcoming */}
          <div className="space-y-4">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Upcoming Tasks</h3>
            {upcomingTasks.map((task, i) => {
              const tc = TASK_CONFIG[task.type] || TASK_CONFIG.prep;
              return (
                <div key={i} className="glass-card p-4" style={{ border: `1px solid ${tc.color}25` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 999, background: `${tc.color}15`, color: tc.color, fontWeight: 700 }}>
                      {tc.icon} {tc.label}
                    </span>
                    <span style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>Day {task.day}</span>
                  </div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>{task.task}</h4>
                  <p style={{ fontSize: 11, color: '#64748b' }}>{getTaskDate(task.day)}</p>
                </div>
              );
            })}

            <div className="glass-card p-5" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#4ade80', marginBottom: 8 }}>✓ Completed</h4>
              <p style={{ fontSize: '2rem', fontWeight: 900, color: '#f1f5f9' }}>{completedTasks.length}</p>
              <p style={{ fontSize: 11, color: '#64748b' }}>tasks done out of {tasks.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropCalendar;
