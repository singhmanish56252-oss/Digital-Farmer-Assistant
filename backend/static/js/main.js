const app = {
    currentRoute: 'dashboard',
  
    init() {
      this.bindEvents();
      this.setDate();
      this.loadDashboardData();
    },
  
    bindEvents() {
      document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.currentTarget.dataset.target;
          if(target) this.navigate(target);
        });
      });
    },
  
    setDate() {
      const dateEl = document.getElementById('current-date');
      if (dateEl) {
        dateEl.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
      }
    },
  
    navigate(route) {
      if (this.currentRoute === route) return;
      
      // Update UI tabs
      document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.querySelector(`.nav-item[data-target="${route}"]`);
      if (activeBtn) activeBtn.classList.add('active');
      
      // Hide all sections
      document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
      
      // Show target
      const targetSec = document.getElementById(route);
      if (targetSec) {
        targetSec.style.display = 'block';
        targetSec.classList.add('animate-fade-in');
      }
  
      // Update Header Title
      const titleMap = {
        'dashboard': 'Dashboard',
        'weather': 'Weather Intelligence',
        'mandi': 'Live Mandi Prices'
      };
      document.getElementById('current-page-title').textContent = titleMap[route] || 'Kisan Seva';
  
      this.currentRoute = route;
      this.loadRouteData(route);
    },
  
    loadRouteData(route) {
      if (route === 'weather') this.loadWeather();
      if (route === 'mandi') this.loadMandi();
    },
  
    async loadDashboardData() {
      try {
        const [weatherRes, mandiRes] = await Promise.all([
          fetch('/api/weather?city=Indore'),
          fetch('/api/mandi')
        ]);
        
        if (weatherRes.ok) {
          const w = await weatherRes.json();
          document.getElementById('dash-temp').textContent = w.temp + '°C';
          document.getElementById('dash-temp').nextElementSibling.textContent = w.condition + ' · Hum ' + w.humidity + '%';
        }
        
        if (mandiRes.ok) {
          const m = await mandiRes.json();
          const wheat = m.find(x => x.crop === 'Wheat') || m[0];
          document.getElementById('dash-price').textContent = '₹' + wheat.price;
          document.getElementById('dash-price').nextElementSibling.textContent = wheat.location + ' · ' + wheat.change;
        }
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    },
  
    async loadWeather() {
      try {
        const res = await fetch('/api/weather?city=Indore');
        const data = await res.json();
        
        document.getElementById('w-city').textContent = data.city;
        document.getElementById('w-temp').textContent = data.temp + '°C';
        document.getElementById('w-cond').textContent = data.condition;
        document.getElementById('w-hum').textContent = data.humidity + '%';
        document.getElementById('w-wind').textContent = data.wind_speed + ' km/h';
      } catch (e) {
        document.getElementById('w-city').textContent = 'Error loading weather';
      }
    },
  
    async loadMandi() {
      try {
        const res = await fetch('/api/mandi');
        const data = await res.json();
        
        const tbody = document.getElementById('mandi-table-body');
        tbody.innerHTML = '';
        
        data.forEach(item => {
          const isUp = item.change.startsWith('+');
          const color = isUp ? 'var(--primary)' : '#ef4444';
          const icon = isUp ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt';
          
          tbody.innerHTML += `
            <tr>
              <td>${item.crop}</td>
              <td style="color: var(--text-muted)">${item.location}</td>
              <td style="color: var(--secondary); font-size: 16px;">₹${item.price}</td>
              <td style="color: ${color}; display: flex; align-items: center;"><i class='bx ${icon}'></i> ${item.change}</td>
            </tr>
          `;
        });
      } catch (e) {
        document.getElementById('mandi-table-body').innerHTML = '<tr><td colspan="4">Failed to load API</td></tr>';
      }
    }
  };
  
  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    app.init();
  });
