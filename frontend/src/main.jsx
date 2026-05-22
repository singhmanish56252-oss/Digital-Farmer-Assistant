import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LandingPage from './components/LandingPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import ReviewsPage from './components/ReviewsPage.jsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, click on reload button to update.');
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
})

const RootRouter = () => {
  const [route, setRoute] = useState('landing');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'Guest Farmer');
  const [userLocation, setUserLocation] = useState(localStorage.getItem('userLocation') || 'New Delhi, India');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  React.useEffect(() => {
    if (route === 'app' && !isLoggedIn) {
      setRoute('login');
    }
  }, [route, isLoggedIn]);

  React.useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`min-h-screen ${theme}`}>
      {route === 'landing' && <LandingPage setRoute={setRoute} />}
      {route === 'login' && <LoginPage setRoute={setRoute} setUserName={setUserName} setUserLocation={setUserLocation} setIsLoggedIn={setIsLoggedIn} />}
      {route === 'reviews' && <ReviewsPage setRoute={setRoute} />}
      {route === 'app' && isLoggedIn && <App setRoute={setRoute} userName={userName} userLocation={userLocation} theme={theme} toggleTheme={toggleTheme} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>,
)
