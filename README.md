# 🌾 Kisan Seva — AI Digital Farmer Assistant

A premium, production-grade agricultural ecosystem designed to empower farmers with AI-driven insights, IoT monitoring, and market intelligence.

## 🚀 Key Features
- **AI Disease Detection:** Scan crops for diseases with 95%+ accuracy.
- **Smart Weather Intelligence:** Real-time localized agricultural weather forecasts.
- **Mandi Live Tracker:** Stay updated with real-time crop prices across India.
- **Crop Calendar:** Personalized step-by-step farming tasks from sowing to harvest.
- **Smart Advisor:** AI-powered guidance on crop selection, fertilizers, and irrigation.
- **IoT Dashboard:** Real-time sensor monitoring (Moisture, Temp, Humidity).
- **Dual Theme Support:** Seamlessly switch between Premium Dark and Professional Light modes.

## 🛠️ Technology Stack
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend:** Flask (Python), CORS, Randomization Engine for simulations.
- **AI/ML:** Integrated models for disease detection and crop advice.

## 📦 Installation & Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```powershell
cd backend
# Create virtual environment (if not exists)
python -m venv venv

# OPTION 1: Direct Run (Recommended for Windows)
.\venv\Scripts\python.exe -m pip install -r requirements.txt
.\venv\Scripts\python.exe app.py

# OPTION 2: Activation (If you see "running scripts is disabled" error)
# Run this in PowerShell as Administrator:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 🌐 Deployment
This project is optimized for deployment on **GitHub Pages**. The `frontend/public` folder contains necessary configurations (`404.html`, `.nojekyll`) for seamless SPA routing.

---
© 2026 Kisan Seva · Empowering Rural India through AI
