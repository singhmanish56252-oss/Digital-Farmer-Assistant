import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceAssistant = ({ setActiveTab, userLocation = 'New Delhi' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('नमस्ते! मैं आपका डिजिटल किसान सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?');
  const [language, setLanguage] = useState('hi-IN'); // Default Hindi
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      
      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
        
        if (event.results[current].isFinal) {
          processCommand(result.toLowerCase());
        }
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      synthRef.current.cancel();
    };
  }, [language]);

  const toggleListen = () => {
    if (!recognitionRef.current) {
      alert("Your browser does not support Voice Recognition.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
      setTranscript('');
      synthRef.current.cancel(); // Stop any ongoing speech
    }
  };

  const speak = (text, lang) => {
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    
    // Try to find a suitable voice
    const voices = synthRef.current.getVoices();
    const targetVoice = voices.find(v => v.lang.includes(lang.substring(0, 2)));
    if (targetVoice) utterance.voice = targetVoice;
    
    synthRef.current.speak(utterance);
    setAiResponse(text);
  };

  const processCommand = (cmd) => {
    let reply = "";
    let targetLang = language;
    let targetTab = null;
    
    const city = userLocation.split(',')[0];

    // Simple Rule-Based NLP
    if (cmd.includes('मौसम') || cmd.includes('weather') || cmd.includes('barish') || cmd.includes('rain')) {
      reply = `आज ${city} का मौसम साफ है। तापमान ३२ डिग्री है और बारिश की कोई संभावना नहीं है।`;
      targetTab = 'weather';
    } else if (cmd.includes('बीमारी') || cmd.includes('disease') || cmd.includes('keeda') || cmd.includes('pest')) {
      reply = "मैंने फसल रोग स्कैनर खोल दिया है। कृपया पत्ती की फोटो अपलोड करें।";
      targetTab = 'disease';
    } else if (cmd.includes('मंडी') || cmd.includes('mandi') || cmd.includes('price') || cmd.includes('bhav')) {
      reply = `आज ${city} मंडी में गेहूं का भाव 2100 रुपये प्रति क्विंटल है।`;
      targetTab = 'mandi';
    } else if (cmd.includes('खाद') || cmd.includes('fertilizer') || cmd.includes('urea')) {
      reply = "गेहूं के लिए यूरिया और डीएपी का उपयोग करें। मैंने उर्वरक गाइड खोल दिया है।";
      targetTab = 'fertilizer';
    } else if (cmd.includes('scheme') || cmd.includes('yojana') || cmd.includes('loan')) {
      reply = "सरकारी योजनाओं की सूची यहाँ है। पीएम किसान योजना अभी खुली है।";
      targetTab = 'schemes';
    } else {
      reply = "क्षमा करें, मैं समझ नहीं पाया। आप मौसम, मंडी भाव, या बीमारी स्कैन के बारे में पूछ सकते हैं।";
    }

    speak(reply, targetLang);
    if (targetTab) {
      setTimeout(() => setActiveTab(targetTab), 1500);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 glass-card overflow-hidden shadow-2xl"
            style={{ border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)' }}
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Volume2 size={16} />
                </div>
                <h3 className="font-bold font-syne">Kisan Voice AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="p-5 space-y-4 h-64 overflow-y-auto">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-primary flex-shrink-0 text-xl shadow-sm">🌾</div>
                <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700 font-medium leading-relaxed">
                  {aiResponse}
                </div>
              </div>
              
              {transcript && (
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 uppercase">U</div>
                  <div className="bg-green-100 p-3 rounded-2xl rounded-tr-none text-sm text-green-900 font-medium">
                    {transcript}
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex gap-2">
                <button 
                  onClick={() => setLanguage('hi-IN')} 
                  className={`text-xs px-2 py-1 rounded font-bold transition-colors ${language === 'hi-IN' ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}
                >
                  हिंदी
                </button>
                <button 
                  onClick={() => setLanguage('en-IN')} 
                  className={`text-xs px-2 py-1 rounded font-bold transition-colors ${language === 'en-IN' ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}
                >
                  ENG
                </button>
              </div>
              
              <button 
                onClick={toggleListen}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all shadow-lg ${isListening ? 'bg-red-500 animate-pulse' : 'bg-primary hover:scale-105'}`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            </div>
            
            {/* Listening Indicator */}
            {isListening && (
              <div className="h-1 w-full bg-red-100 overflow-hidden">
                <div className="h-full bg-red-500 w-1/3 animate-ping mx-auto" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl relative"
          style={{ border: '4px solid white' }}
        >
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
          <Mic size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default VoiceAssistant;
