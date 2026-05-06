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
  const [userName, setUserName] = useState('Guest Farmer');
  const [userLocation, setUserLocation] = useState('New Delhi, India');

  return (
    <>
      {route === 'landing' && <LandingPage setRoute={setRoute} />}
      {route === 'login' && <LoginPage setRoute={setRoute} setUserName={setUserName} setUserLocation={setUserLocation} />}
      {route === 'reviews' && <ReviewsPage setRoute={setRoute} />}
      {route === 'app' && <App setRoute={setRoute} userName={userName} userLocation={userLocation} />}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>,
)
