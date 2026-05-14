// Global Configuration for the Digital Farmer Assistant
// Replace the API_URL with your deployed backend URL (e.g., https://your-app.onrender.com)
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://kisan-seva-backend.onrender.com'; // Default placeholder for deployment

export default API_URL;
