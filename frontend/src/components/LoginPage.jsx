import React, { useState } from 'react';
import { Sprout, Mail, Lock, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

const LoginPage = ({ setRoute, setUserName, setUserLocation, setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      let finalName = 'Guest Farmer';
      if (!isLogin && nameInput.trim() !== '') {
        finalName = nameInput;
      } else if (isLogin && emailInput.trim() !== '') {
        finalName = emailInput.split('@')[0].split(/[._-]/).map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
      }

      const finalLocation = locationInput.trim() !== '' ? locationInput : 'New Delhi, India';

      // Persist data
      localStorage.setItem('userName', finalName);
      localStorage.setItem('userLocation', finalLocation);
      localStorage.setItem('isLoggedIn', 'true');

      setUserName(finalName);
      setUserLocation(finalLocation);
      setIsLoggedIn(true);
      setRoute('app');
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-main animate-fade-in">
      {/* Left side: Image/Branding */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden items-center justify-center border-r border-slate-800">
        <img src={`${import.meta.env.BASE_URL}hero.png`} alt="Farm Background" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10 max-w-lg p-12 text-white">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-black mb-8 shadow-2xl">
            <span className="text-3xl">🌾</span>
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Empowering the modern farmer.
          </h1>
          <p className="text-slate-400 text-lg mb-12 font-medium">
            Join the ecosystem that connects you to AI analytics, market trends, and a community of agricultural experts.
          </p>
          
          <div className="space-y-4">
            {['Access 12+ smart farming tools', 'Track real-time Mandi prices', 'Identify 50+ crop diseases instantly'].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="text-primary" size={20} />
                <span className="font-semibold text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-main">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-12 cursor-pointer lg:hidden" onClick={() => setRoute('landing')}>
            <span className="text-2xl">🌾</span>
            <span className="text-xl font-black" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>Kisan Seva</span>
          </div>

          <h2 className="text-3xl font-black mb-2" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="font-medium mb-8" style={{ color: 'var(--text-secondary)' }}>
            {isLogin ? 'Please enter your details to sign in.' : 'Start your digital farming journey today.'}
          </p>

          <form className="space-y-5" onSubmit={handleAuth}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                <div className="relative">
                  <input type="text" className="input-dark w-full" placeholder="Rajesh Kumar" required value={nameInput} onChange={e => setNameInput(e.target.value)} />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>Your Location</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><MapPin size={18} /></div>
                <input type="text" className="input-dark w-full pl-10" placeholder="e.g., Patna, Bihar" value={locationInput} onChange={e => setLocationInput(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>Email or Phone</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><Mail size={18} /></div>
                <input type="text" className="input-dark w-full pl-10" placeholder="Enter your email or phone" required value={emailInput} onChange={e => setEmailInput(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><Lock size={18} /></div>
                <input type="password" className="input-dark w-full pl-10" placeholder="••••••••" required />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-primary focus:ring-primary h-4 w-4" />
                  <span className="text-sm font-semibold text-slate-400">Remember me</span>
                </label>
                <a href="#" className="text-sm font-bold text-primary hover:text-primary-hover">Forgot password?</a>
              </div>
            )}

            <button type="submit" disabled={loading} className={`btn-primary w-full py-3.5 text-lg mt-6 flex justify-center items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                </>
              )}
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
