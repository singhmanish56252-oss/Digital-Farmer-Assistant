import React, { useState } from 'react';
import { Search, Sprout, ShieldCheck, TrendingUp, CloudRain, ChevronRight } from 'lucide-react';

const LandingPage = ({ setRoute }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    { icon: Sprout, title: 'AI Crop Advisory', desc: 'Get data-driven recommendations for maximum yield based on local soil and weather.' },
    { icon: CloudRain, title: 'Smart Irrigation', desc: 'Optimize water usage with ET₀ calculations and precise soil moisture tracking.' },
    { icon: TrendingUp, title: 'Live Mandi Prices', desc: 'Track real-time commodity prices to sell your harvest at the best possible time.' },
    { icon: ShieldCheck, title: 'Pest & Disease Scan', desc: 'Identify crop diseases instantly using our 95% accurate AI vision model.' }
  ];

  return (
    <div className="animate-fade-in bg-main">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-card border-b border-light sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setRoute('landing')}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-white shadow-md">
            <span className="text-xl">🌾</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-primary" style={{ fontFamily: 'Syne, sans-serif' }}>Kisan Seva</h1>
            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Digital Farming</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-secondary-text">
          <button className="hover:text-primary transition-colors">Features</button>
          <button className="hover:text-primary transition-colors" onClick={() => setRoute('reviews')}>Reviews</button>
          <button className="hover:text-primary transition-colors">Pricing</button>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-ghost" onClick={() => setRoute('login')}>Log In</button>
          <button className="btn-primary" onClick={() => setRoute('app')}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 py-20 md:py-32 overflow-hidden flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
        <div className="flex-1 z-10">
          <div className="badge badge-green mb-6 px-4 py-2 text-xs">✨ The Future of Indian Agriculture</div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]" style={{ fontFamily: 'Syne, sans-serif', color: '#0f172a' }}>
            Farm smarter, <br />
            <span className="gradient-text">yield bigger.</span>
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
            Join 50,000+ modern farmers using Kisan Seva's AI-driven insights to monitor crops, track market prices, and optimize daily operations.
          </p>

          <div className="glass-card p-2 flex items-center gap-2 max-w-md shadow-lg border border-slate-200">
            <div className="pl-4 text-slate-400"><Search size={20} /></div>
            <input 
              type="text" 
              placeholder="What are you looking to grow today?" 
              className="flex-1 bg-transparent border-none outline-none py-3 text-slate-700 font-semibold"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="btn-primary" onClick={() => setRoute('app')}>Search</button>
          </div>

          <div className="flex items-center gap-6 mt-10">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-sm flex items-center justify-center text-xs font-bold text-slate-600">
                  F{i}
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-slate-600">Trusted by <span className="text-primary">10k+</span> villages</p>
          </div>
        </div>

        <div className="flex-1 relative z-10 w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
            <img src="/hero.png" alt="Modern Farmer" className="w-full h-auto object-cover" style={{ maxHeight: 500 }} />
            <div className="absolute bottom-6 left-6 glass-card p-4 flex items-center gap-4 bg-white/90 backdrop-blur-md">
              <div className="p-3 bg-green-100 text-green-700 rounded-xl"><TrendingUp size={20} /></div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expected Yield</p>
                <p className="text-xl font-black text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>+24.5%</p>
              </div>
            </div>
          </div>
          {/* Decorative blur blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/20 blur-3xl -z-10 rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-slate-800 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Everything you need to succeed</h3>
            <p className="text-slate-600 font-medium max-w-2xl mx-auto">From sowing to selling, our platform provides professional-grade tools designed specifically for the modern agricultural ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="glass-card p-6 hover:shadow-xl transition-shadow bg-white">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-primary mb-5 border border-green-100">
                    <f.icon size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h4>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-full min-h-[400px]">
               <img src="/drone.png" alt="Drone Farming" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-primary py-20 text-center px-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)]" style={{ backgroundSize: '24px 24px' }}></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Ready to transform your farm?</h2>
          <p className="text-green-100 mb-8 text-lg font-medium">Join the platform that is revolutionizing agriculture with data and AI.</p>
          <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 hover:scale-105 transition-all shadow-xl flex items-center gap-2 mx-auto" onClick={() => setRoute('app')}>
            Open Dashboard <ChevronRight size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
