import React from 'react';
import { Star, MessageCircle, ArrowLeft, ThumbsUp } from 'lucide-react';

const ReviewsPage = ({ setRoute }) => {
  const reviews = [
    {
      name: 'Suresh Patel', location: 'Gujarat', rating: 5, date: '2 days ago',
      title: 'Saved my wheat crop!',
      text: 'The AI disease scanner correctly identified rust on my wheat early on. The suggested treatment worked perfectly. Saved me thousands in potential losses.'
    },
    {
      name: 'Ramesh Yadav', location: 'Uttar Pradesh', rating: 5, date: '1 week ago',
      title: 'Best equipment rental platform',
      text: 'Rented a Rotavator for 2 days. The owner was verified, equipment was in top condition, and the price was 20% lower than local agents. Highly recommended.'
    },
    {
      name: 'Vikram Singh', location: 'Punjab', rating: 4, date: '3 weeks ago',
      title: 'Accurate Mandi Prices',
      text: 'I use the live Mandi tracker daily. It helped me decide to hold my mustard crop for an extra week, netting me a 12% higher profit.'
    },
    {
      name: 'Amit Kumar', location: 'Haryana', rating: 5, date: '1 month ago',
      title: 'Irrigation advisor is a game changer',
      text: 'I used to overwater my fields. The smart irrigation tool uses weather data to tell me exactly when to water. My water usage dropped by 30%.'
    }
  ];

  return (
    <div className="min-h-screen bg-main animate-fade-in pb-20">
      {/* Header */}
      <header className="border-b border-light sticky top-0 z-50 shadow-sm px-8 py-4 flex items-center justify-between" style={{ background: 'var(--bg-header)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => setRoute('landing')}>
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRoute('landing')}>
            <span className="text-xl">🌾</span>
            <span className="text-lg font-black" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>Kisan Seva</span>
          </div>
        </div>
        <button className="btn-primary" onClick={() => setRoute('app')}>Open App</button>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 mt-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 font-bold text-sm mb-4">
            <Star size={16} fill="currentColor" /> 4.9 out of 5 from 10,000+ farmers
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
            Hear from our community
          </h1>
          <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Real stories from real farmers across India who have transformed their yield and profits using our digital platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, i) => (
            <div key={i} className="glass-card p-8 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={18} className={j < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-400">{rev.date}</span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{rev.title}</h3>
              <p className="font-medium leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>"{rev.text}"</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{rev.name}</p>
                    <p className="text-xs text-slate-500 font-medium">📍 {rev.location}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-slate-400 hover:text-primary text-xs font-bold transition-colors">
                  <ThumbsUp size={14} /> Helpful
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center glass-card p-12">
          <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>Have a story to share?</h2>
          <p className="font-medium mb-6" style={{ color: 'var(--text-secondary)' }}>Join the community and help other farmers make better decisions.</p>
          <button className="btn-primary" onClick={() => setRoute('login')}>
            <MessageCircle size={18} /> Write a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
