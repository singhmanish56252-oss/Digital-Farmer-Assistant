import React, { useState } from 'react';
import { Brain, CloudSun, MapPin, Sprout, FlaskConical, ChevronRight, Droplets, ShieldAlert, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SmartAdvisor = ({ userLocation }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const [formData, setFormData] = useState({
    location: userLocation || 'New Delhi, India',
    crop: 'Wheat',
    soilType: 'Alluvial',
    sowingDate: '2026-11-15'
  });

  const generateAdvice = () => {
    setLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
      setLoading(false);
      setReport({
        weather: { status: 'Optimal', temp: '19°C', rain: 'No rain next 5 days' },
        irrigation: { recommendation: 'Irrigate tomorrow evening. Soil moisture is at 45% (Critical soon). Apply 25mm water.', priority: 'High' },
        fertilizer: { recommendation: 'Time for 2nd Urea top-dressing (40kg/acre). Apply after irrigation for best absorption.', priority: 'Medium' },
        pest: { recommendation: 'High risk of Aphids due to low temp & high humidity. Preventative Neem oil spray recommended.', priority: 'High' },
        market: { recommendation: 'Wheat prices are up 2.5% at ₹2,100/qtl. Hold selling for 2 weeks, predicted to hit ₹2,250/qtl.', priority: 'Low' },
        overall: 'Your Wheat crop is in the Tillering stage. Focus on irrigation and nitrogen management this week for maximum yield.'
      });
      setStep(2);
    }, 2500);
  };

  const reset = () => {
    setStep(1);
    setReport(null);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-primary text-white shadow-xl shadow-green-500/20">
          <Brain size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Connected AI Advisor</h2>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Rule-Based Expert System</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && !loading && (
          <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-8 bg-white shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Sparkles className="text-amber-500" /> Enter Farm Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><MapPin size={16} className="text-blue-500"/> Location</label>
                <input type="text" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-semibold text-slate-700" 
                  value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Sprout size={16} className="text-green-500"/> Target Crop</label>
                <select className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-semibold text-slate-700"
                  value={formData.crop} onChange={e => setFormData({...formData, crop: e.target.value})}>
                  <option>Wheat</option><option>Rice</option><option>Mustard</option><option>Cotton</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><FlaskConical size={16} className="text-purple-500"/> Soil Type</label>
                <select className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-semibold text-slate-700"
                  value={formData.soilType} onChange={e => setFormData({...formData, soilType: e.target.value})}>
                  <option>Alluvial</option><option>Black</option><option>Red</option><option>Loamy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><CloudSun size={16} className="text-amber-500"/> Sowing Date (Est)</label>
                <input type="date" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-semibold text-slate-700"
                  value={formData.sowingDate} onChange={e => setFormData({...formData, sowingDate: e.target.value})} />
              </div>
            </div>

            <button onClick={generateAdvice} className="btn-primary w-full py-4 text-lg justify-center shadow-lg shadow-green-500/30 group">
              Generate Expert Plan <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card p-12 flex flex-col items-center justify-center min-h-[400px] border border-slate-200 bg-white">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-slate-100 border-t-primary rounded-full animate-spin"></div>
              <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-2">AI is analyzing your farm...</h3>
            <div className="space-y-2 text-center text-slate-500 font-medium text-sm">
              <p className="animate-pulse">Fetching live weather for {formData.location}...</p>
              <p className="animate-pulse" style={{ animationDelay: '0.5s' }}>Checking {formData.soilType} soil parameters...</p>
              <p className="animate-pulse" style={{ animationDelay: '1s' }}>Calculating irrigation needs for {formData.crop}...</p>
            </div>
          </motion.div>
        )}

        {step === 2 && report && (
          <motion.div key="report" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            
            {/* Executive Summary */}
            <div className="glass-card p-6 bg-gradient-to-br from-green-50 to-emerald-100/50 border border-green-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2"><Sparkles size={20}/> Executive Summary</h3>
              <p className="text-green-900 font-medium text-lg leading-relaxed relative z-10">{report.overall}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Irrigation */}
              <div className="glass-card p-6 bg-white border-l-4 border-l-blue-500 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-blue-600 font-bold"><Droplets size={20} /> Irrigation Alert</div>
                  <span className={`text-xs font-bold px-2 py-1 rounded bg-red-100 text-red-600`}>{report.irrigation.priority} Priority</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{report.irrigation.recommendation}</p>
              </div>

              {/* Fertilizer */}
              <div className="glass-card p-6 bg-white border-l-4 border-l-purple-500 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-purple-600 font-bold"><FlaskConical size={20} /> Nutrition Plan</div>
                  <span className={`text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700`}>{report.fertilizer.priority} Priority</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{report.fertilizer.recommendation}</p>
              </div>

              {/* Pests */}
              <div className="glass-card p-6 bg-white border-l-4 border-l-red-500 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-red-600 font-bold"><ShieldAlert size={20} /> Pest Risk</div>
                  <span className={`text-xs font-bold px-2 py-1 rounded bg-red-100 text-red-600`}>{report.pest.priority} Priority</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{report.pest.recommendation}</p>
              </div>

              {/* Market */}
              <div className="glass-card p-6 bg-white border-l-4 border-l-amber-500 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-amber-600 font-bold"><TrendingUp size={20} /> Market Insight</div>
                  <span className={`text-xs font-bold px-2 py-1 rounded bg-green-100 text-green-700`}>{report.market.priority} Priority</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{report.market.recommendation}</p>
              </div>
            </div>

            <div className="flex justify-end mt-8">
               <button onClick={reset} className="btn-ghost px-6 py-2 border border-slate-200">Start New Analysis</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartAdvisor;
