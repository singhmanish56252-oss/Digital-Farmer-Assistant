import React, { useState } from 'react';
import { Sprout, Mail, Lock, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

const LoginPage = ({ setRoute, setUserName, setUserLocation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [locationInput, setLocationInput] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (!isLogin && nameInput.trim() !== '') {
      setUserName(nameInput);
    } else if (isLogin && emailInput.trim() !== '') {
      // Create a mock name from the email (e.g., rajesh.kumar@... -> Rajesh Kumar)
      const mockName = emailInput.split('@')[0].split(/[._-]/).map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
      setUserName(mockName);
    }
    if (locationInput.trim() !== '') {
      setUserLocation(locationInput);
    }
    setRoute('app');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 animate-fade-in">
      {/* Left side: Image/Branding */}
      <div className="hidden lg:flex flex-1 relative bg-primary overflow-hidden items-center justify-center">
        <img src="/hero.png" alt="Farm Background" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
        <div className="relative z-10 max-w-lg p-12 text-white">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-8 shadow-2xl">
            <span className="text-3xl">🌾</span>
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Empowering the modern farmer.
          </h1>
          <p className="text-green-100 text-lg mb-12 font-medium">
            Join the ecosystem that connects you to AI analytics, market trends, and a community of agricultural experts.
          </p>
          
          <div className="space-y-4">
            {['Access 12+ smart farming tools', 'Track real-time Mandi prices', 'Identify 50+ crop diseases instantly'].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="text-green-300" size={20} />
                <span className="font-semibold text-green-50">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-12 cursor-pointer lg:hidden" onClick={() => setRoute('landing')}>
            <span className="text-2xl">🌾</span>
            <span className="text-xl font-black text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Kisan Seva</span>
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-slate-500 font-medium mb-8">
            {isLogin ? 'Please enter your details to sign in.' : 'Start your digital farming journey today.'}
          </p>

          <form className="space-y-5" onSubmit={handleAuth}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <div className="relative">
                  <input type="text" className="input-dark w-full bg-slate-50" placeholder="Rajesh Kumar" required value={nameInput} onChange={e => setNameInput(e.target.value)} />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Your Location</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><MapPin size={18} /></div>
                <input type="text" className="input-dark w-full pl-10 bg-slate-50" placeholder="e.g., Patna, Bihar" value={locationInput} onChange={e => setLocationInput(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email or Phone</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={18} /></div>
                <input type="text" className="input-dark w-full pl-10 bg-slate-50" placeholder="Enter your email or phone" required value={emailInput} onChange={e => setEmailInput(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={18} /></div>
                <input type="password" className="input-dark w-full pl-10 bg-slate-50" placeholder="••••••••" required />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4 border-slate-300" />
                  <span className="text-sm font-semibold text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-sm font-bold text-primary hover:text-primary-hover">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn-primary w-full py-3.5 text-lg mt-6">
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                className="font-bold text-primary hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
