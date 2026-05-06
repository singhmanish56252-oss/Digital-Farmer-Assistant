import React, { useState, useEffect } from 'react';
import {
  CloudSun, Sprout, Droplets, TrendingUp, ScanSearch, LayoutDashboard,
  Menu, Bell, Search, ChevronRight, Zap, Activity, ArrowUpRight,
  ArrowDownRight, Droplet, Bug, Calendar, FlaskConical, Building2,
  Calculator, Truck, Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Weather from './components/Weather';
import CropSuggestion from './components/CropSuggestion';
import FertilizerGuide from './components/FertilizerGuide';
import MandiPrices from './components/MandiPrices';
import DiseaseDetection from './components/DiseaseDetection';
import IrrigationAdvisor from './components/IrrigationAdvisor';
import PestAlert from './components/PestAlert';
import CropCalendar from './components/CropCalendar';
import SoilAnalyzer from './components/SoilAnalyzer';
import GovSchemes from './components/GovSchemes';
import EquipmentRental from './components/EquipmentRental';
import VoiceAssistant from './components/VoiceAssistant';
import SmartAdvisor from './components/SmartAdvisor';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard',     color: '#3ddc84' },
      { id: 'advisor',   icon: Brain,           label: 'Smart Advisor', color: '#8b5cf6' },
    ]
  },
  {
    label: 'Field Intelligence',
    items: [
      { id: 'weather',    icon: CloudSun,      label: 'Weather',         color: '#4fc3f7' },
      { id: 'disease',    icon: ScanSearch,    label: 'Disease AI Scan', color: '#ff8a65' },
      { id: 'soil',       icon: FlaskConical,  label: 'Soil Analyzer',   color: '#aed581' },
      { id: 'irrigation', icon: Droplet,       label: 'Irrigation',      color: '#4fc3f7' },
      { id: 'pest',       icon: Bug,           label: 'Pest Alerts',     color: '#ffb74d' },
    ]
  },
  {
    label: 'Crop Management',
    items: [
      { id: 'crops',      icon: Sprout,        label: 'Crop AI',         color: '#3ddc84' },
      { id: 'fertilizer', icon: Droplets,      label: 'Fertilizer',      color: '#b57bee' },
      { id: 'calendar',   icon: Calendar,      label: 'Crop Calendar',   color: '#b57bee' },
    ]
  },
  {
    label: 'Market & Finance',
    items: [
      { id: 'mandi',      icon: TrendingUp,    label: 'Mandi Live',      color: '#e8a838' },
      { id: 'profit',     icon: Calculator,    label: 'Profit Calc',     color: '#3ddc84' },
      { id: 'schemes',    icon: Building2,     label: 'Gov Schemes',     color: '#cf9ff5' },
    ]
  },
  {
    label: 'Services',
    items: [
      { id: 'equipment',  icon: Truck,         label: 'Equipment Rent',  color: '#ffb74d' },
    ]
  }
];

// Flat list for header lookup
const ALL_ITEMS = NAV_GROUPS.flatMap(g => g.items);

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, userName }) => {
  const initials = userName?.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() || 'F';
  return (
  <>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)} />
      )}
    </AnimatePresence>

    <div className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-out`}
      style={{ background: '#ffffff', borderRight: '1px solid #e2e8f0', overflowY: 'auto' }}>

      {/* Logo */}
      <div className="p-5 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--primary)', boxShadow: '0 4px 12px rgba(22,163,74,0.2)' }}>
            <span style={{ fontSize: 20 }}>🌾</span>
          </div>
          <div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>Kisan Seva</h1>
            <p style={{ fontSize: '9px', color: 'var(--primary)', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>AI Farm Platform</p>
          </div>
        </div>
        <div className="mt-1 mb-3" style={{ height: '1px', background: 'linear-gradient(90deg, #e2e8f0, transparent)' }} />

        {/* Live Status */}
        <div className="px-3 py-2 rounded-xl flex items-center gap-2" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <span className="animate-blink w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#16a34a', boxShadow: '0 0 6px #16a34a' }} />
          <p style={{ fontSize: '10px', fontWeight: 800, color: '#166534', letterSpacing: '0.06em' }}>ALL SYSTEMS LIVE</p>
        </div>
      </div>

      {/* Nav Groups */}
      <nav className="px-3 flex-1 pb-3 space-y-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p style={{ fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.14em', padding: '0 8px', marginBottom: 4 }}>{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button key={item.id} onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                    style={isActive ? {
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      color: '#16a34a',
                    } : {
                      background: 'transparent',
                      border: '1px solid transparent',
                      color: '#475569',
                    }}>
                    <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: isActive ? '#dcfce7' : '#f1f5f9', border: `1px solid ${isActive ? '#bbf7d0' : '#e2e8f0'}` }}>
                      <item.icon size={13} style={{ color: isActive ? '#16a34a' : '#64748b' }} />
                    </div>
                    <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: isActive ? 800 : 600 }}>{item.label}</span>
                    {isActive && <div className="ml-auto w-1 h-4 rounded-full" style={{ background: '#16a34a' }} />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 flex-shrink-0">
        <div className="p-3 rounded-2xl flex items-center gap-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 uppercase"
            style={{ background: 'var(--primary)', color: '#ffffff', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 14 }}>{initials}</div>
          <div>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 800, color: '#0f172a' }}>{userName}</p>
            <p style={{ fontSize: 9, color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>★ Premium Member</p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

const Header = ({ toggleSidebar, activeTab, setRoute }) => {
  const current = ALL_ITEMS.find(m => m.id === activeTab) || ALL_ITEMS[0];
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
      style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(24px)', borderBottom: '1px solid #e2e8f0' }}>
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-xl bg-slate-50 border border-slate-200">
          <Menu size={18} className="text-slate-500" />
        </button>
        <div>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>🌱 Kisan Seva Platform</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.01em' }}>{current.label}</h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search size={14} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#94a3b8' }} />
          <input type="text" placeholder="Search features..."
            style={{ paddingLeft: 34, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, width: 200, fontSize: 13, color: '#475569', outline: 'none', fontFamily: 'Nunito, sans-serif' }} />
        </div>
        <button className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
          <Bell size={16} className="text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
        </button>
        <button className="btn-ghost !px-3" onClick={() => setRoute('landing')}>
          Log Out
        </button>
      </div>
    </header>
  );
};

const DashboardHome = ({ setActiveTab, userName, userLocation }) => {
  const quickActions = [
    { id: 'weather',    icon: CloudSun,      label: 'Weather',         sub: 'Live forecast',    color: '#4fc3f7' },
    { id: 'disease',    icon: ScanSearch,    label: 'Disease Scan',    sub: 'AI detection',     color: '#ff8a65' },
    { id: 'irrigation', icon: Droplet,       label: 'Irrigation',      sub: 'Smart watering',   color: '#4fc3f7' },
    { id: 'pest',       icon: Bug,           label: 'Pest Alerts',     sub: 'Community alerts', color: '#ffb74d' },
    { id: 'crops',      icon: Sprout,        label: 'Crop AI',         sub: 'Best picks',       color: '#3ddc84' },
    { id: 'calendar',   icon: Calendar,      label: 'Crop Calendar',   sub: 'Task reminders',   color: '#b57bee' },
    { id: 'mandi',      icon: TrendingUp,    label: 'Mandi Prices',    sub: 'Live trading',     color: '#e8a838' },
    { id: 'profit',     icon: Calculator,    label: 'Profit Calc',     sub: 'ROI planning',     color: '#3ddc84' },
    { id: 'soil',       icon: FlaskConical,  label: 'Soil Analyzer',   sub: 'NPK & pH',         color: '#aed581' },
    { id: 'schemes',    icon: Building2,     label: 'Gov Schemes',     sub: 'Benefits finder',  color: '#cf9ff5' },
    { id: 'equipment',  icon: Truck,         label: 'Equipment Rent',  sub: 'Tractors & more',  color: '#ffb74d' },
    { id: 'fertilizer', icon: Droplets,      label: 'Fertilizer',      sub: 'Per-crop guide',  color: '#8b5cf6' },
  ];

  const alerts = [
    { title: 'Irrigation Alert',   desc: 'No rain forecast for 3 days — schedule evening irrigation', priority: 'High',    color: '#ef4444' },
    { title: 'Fertilizer Window',  desc: 'Optimal Urea application window for Wheat opens tomorrow',  priority: 'Tomorrow', color: '#22c55e' },
    { title: 'Market Surge',       desc: `Wheat prices peaked at ₹2,180 in ${userLocation.split(',')[0]} Mandi today`,    priority: 'Today',   color: '#f59e0b' },
    { title: 'Pest Warning',       desc: 'Aphid outbreak reported by 142 farmers in your region',        priority: 'Warning', color: '#f97316' },
  ];

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="section-label mb-2">☀️ Good Morning</p>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#e8f5ec' }}>
          Namaste, <span className="gradient-text">{userName}</span>
        </h2>
        <p style={{ color: '#8fb89a', fontSize: 13, marginTop: 4, fontWeight: 600 }}>{userLocation} · {currentDate} · 🌾 Wheat Season Active</p>
      </motion.div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Temperature', val: '32°C', sub: 'Sunny · Hum 42%', color: '#4fc3f7', icon: '🌡️', id: 'weather' },
          { label: 'Wheat Price', val: '₹2,100', sub: 'Kalyanpur · +2.5%', color: '#e8a838', icon: '📊', id: 'mandi' },
          { label: 'Crop Health', val: '94%', sub: 'Good condition', color: '#3ddc84', icon: '🌿', id: 'disease' },
          { label: 'Soil Moisture', val: '48%', sub: 'Irrigate soon', color: '#4fc3f7', icon: '💧', id: 'irrigation' },
        ].map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="glass-card p-5 cursor-pointer group" onClick={() => setActiveTab(s.id)}>
            <div className="flex justify-between items-start mb-3">
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <ArrowUpRight size={14} style={{ color: '#4a6855', transition: 'color 0.2s' }} />
            </div>
            <p style={{ fontSize: 10, color: '#8fb89a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{s.label}</p>
            <p className="stat-num" style={{ fontSize: '1.8rem', color: s.color }}>{s.val}</p>
            <p style={{ fontSize: 11, color: '#4a6855', fontWeight: 700 }}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Alerts + Market Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-3 glass-card p-6 border-gold glow-gold">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'rgba(232,168,56,0.12)', border: '1px solid rgba(232,168,56,0.2)' }}>
                <Zap size={16} style={{ color: '#e8a838' }} />
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 900, color: '#e8f5ec' }}>Priority Alerts</h3>
            </div>
            <span className="badge badge-amber">
              {alerts.length} Active
            </span>
          </div>
          <div className="space-y-3">
            {alerts.map((a, i) => {
              // Map old colors to new theme colors for alerts
              const mappedColor = a.color === '#ef4444' ? '#ff6b35' : 
                                  a.color === '#22c55e' ? '#3ddc84' : 
                                  a.color === '#f59e0b' ? '#e8a838' : '#ffb74d';
              return (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl transition-all hover:bg-soil-4"
                style={{ background: 'rgba(61,220,132,0.03)', border: '1px solid rgba(61,220,132,0.08)' }}>
                <div className="w-1 h-10 rounded-full flex-shrink-0 mt-0.5" style={{ background: mappedColor, boxShadow: `0 0 8px ${mappedColor}60` }} />
                <div className="flex-1 min-w-0">
                  <h4 style={{ fontSize: 13, fontWeight: 800, color: '#e8f5ec', marginBottom: 2 }}>{a.title}</h4>
                  <p style={{ fontSize: 12, color: '#8fb89a', lineHeight: 1.5 }}>{a.desc}</p>
                </div>
                <span style={{ fontSize: 9, padding: '3px 8px', borderRadius: 999, background: `${mappedColor}20`, color: mappedColor, fontWeight: 800, textTransform: 'uppercase', flexShrink: 0 }}>{a.priority}</span>
              </div>
            )})}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5 glow-green" style={{ background: 'rgba(61,220,132,0.05)', border: '1px solid rgba(61,220,132,0.2)' }}>
            <ScanSearch size={28} style={{ color: '#3ddc84', marginBottom: 10 }} className="animate-float" />
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 900, color: '#e8f5ec', marginBottom: 6 }}>AI Crop Scan</h3>
            <p style={{ fontSize: 12, color: '#8fb89a', marginBottom: 14, lineHeight: 1.6 }}>Detect crop diseases instantly with 95%+ accuracy using our deep learning model.</p>
            <button className="btn-primary w-full justify-center" onClick={() => setActiveTab('disease')} style={{ fontSize: 13 }}>
              <ScanSearch size={15} /> Start Scan
            </button>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 800, color: '#e8f5ec' }}>Live Market</h3>
              <span className="badge badge-green animate-blink">● Live</span>
            </div>
            {[
              { name: 'Wheat', price: 2100, change: '+2.5%', up: true },
              { name: 'Rice', price: 2400, change: '-1.2%', up: false },
              { name: 'Mustard', price: 5400, change: '+3.1%', up: true },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 2 ? '1px solid rgba(61,220,132,0.08)' : 'none' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#e8f5ec' }}>{c.name}</span>
                <div className="flex items-center gap-3">
                  <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 900, color: '#e8a838' }}>₹{c.price}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: c.up ? '#3ddc84' : '#ff6b35', display:'flex', alignItems:'center', gap:2 }}>
                    {c.up ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}{c.change}
                  </span>
                </div>
              </div>
            ))}
            <button className="btn-ghost w-full justify-center mt-4" style={{ fontSize: 12 }} onClick={() => setActiveTab('mandi')}>
              View All Prices <ChevronRight size={13} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Feature Grid — all 12 features */}
      <div>
        <p className="section-label mb-3">All Features</p>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3">
          {quickActions.map((f, i) => (
            <motion.button key={f.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.04 }}
              onClick={() => setActiveTab(f.id)}
              style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0, display: 'block', width: '100%', textAlign: 'left' }}>
              <div className="glass-card p-4 h-full"
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${f.color}40`; e.currentTarget.style.boxShadow = `0 4px 20px ${f.color}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; }}>
                <div className="p-2 w-fit rounded-lg mb-3" style={{ background: `${f.color}18`, border: `1px solid ${f.color}22` }}>
                  <f.icon size={16} style={{ color: f.color }} />
                </div>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#e8f5ec', marginBottom: 2 }}>{f.label}</p>
                <p style={{ fontSize: 10, color: '#8fb89a' }}>{f.sub}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = ({ setRoute, userName, userLocation }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':  return <DashboardHome setActiveTab={setActiveTab} userName={userName} userLocation={userLocation} />;
      case 'weather':    return <Weather userLocation={userLocation} />;
      case 'crops':      return <CropSuggestion />;
      case 'fertilizer': return <FertilizerGuide />;
      case 'mandi':      return <MandiPrices />;
      case 'disease':    return <DiseaseDetection />;
      case 'irrigation': return <IrrigationAdvisor />;
      case 'pest':       return <PestAlert />;
      case 'calendar':   return <CropCalendar />;
      case 'soil':       return <SoilAnalyzer />;
      case 'schemes':    return <GovSchemes />;
      case 'profit':     return <ProfitCalculator />;
      case 'equipment':  return <EquipmentRental />;
      case 'advisor':    return <SmartAdvisor userLocation={userLocation} />;
      default:           return <DashboardHome setActiveTab={setActiveTab} userName={userName} userLocation={userLocation} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-main">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} userName={userName} />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <Header toggleSidebar={() => setIsSidebarOpen(true)} activeTab={activeTab} setRoute={setRoute} />
        <main className="p-4 md:p-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="px-8 py-4 flex items-center justify-between border-t border-slate-200">
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, color: '#64748b', fontWeight: 700 }}>© 2026 Kisan Seva · Empowering Rural India through AI</p>
          <div className="flex items-center gap-2">
            <span className="animate-blink w-1.5 h-1.5 rounded-full" style={{ background: '#16a34a' }} />
            <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, color: '#16a34a', fontWeight: 800 }}>All 13 features operational</span>
          </div>
        </footer>
      </div>
      <VoiceAssistant setActiveTab={setActiveTab} userLocation={userLocation} />
    </div>
  );
};

export default App;
