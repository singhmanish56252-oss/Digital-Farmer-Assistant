from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import datetime

app = Flask(__name__)
CORS(app)

# ─── Static Data ────────────────────────────────────────────────────────────

CROPS_DATA = [
    {"name": "Wheat",   "season": "Winter", "soil": "Alluvial", "temp": "15-25", "water": "Medium"},
    {"name": "Rice",    "season": "Summer", "soil": "Clayey",   "temp": "25-35", "water": "High"},
    {"name": "Cotton",  "season": "Summer", "soil": "Black",    "temp": "20-30", "water": "Medium"},
    {"name": "Mustard", "season": "Winter", "soil": "Loamy",    "temp": "10-20", "water": "Low"},
    {"name": "Maize",   "season": "Summer", "soil": "Loamy",    "temp": "21-27", "water": "Medium"},
]

FERTILIZERS = {
    "Wheat":   ["Urea", "DAP", "MOP"],
    "Rice":    ["Urea", "Zinc Sulphate", "Potash"],
    "Cotton":  ["Nitrogen", "Phosphorus", "Potassium"],
    "Mustard": ["Sulphur", "Urea", "SSP"],
    "Maize":   ["Zinc", "Nitrogen", "DAP"],
}

MANDI_PRICES = [
    {"crop": "Wheat",   "price": 2100, "location": "Kalyanpur", "change": "+2.5%"},
    {"crop": "Rice",    "price": 2400, "location": "Patna",     "change": "-1.2%"},
    {"crop": "Cotton",  "price": 6500, "location": "Nagpur",    "change": "+0.5%"},
    {"crop": "Mustard", "price": 5400, "location": "Alwar",     "change": "+3.1%"},
]

PEST_ALERTS = [
    {"pest": "Aphids",          "crop": "Wheat",   "region": "Uttar Pradesh", "severity": "High",   "pesticide": "Imidacloprid 17.8% SL", "reports": 142},
    {"pest": "Brown Plant Hopper","crop": "Rice",  "region": "Bihar",         "severity": "Critical","pesticide": "Buprofezin 25% SC",     "reports": 289},
    {"pest": "Bollworm",        "crop": "Cotton",  "region": "Maharashtra",   "severity": "Medium", "pesticide": "Chlorpyrifos 20% EC",   "reports": 98},
    {"pest": "Mustard Sawfly",  "crop": "Mustard", "region": "Rajasthan",     "severity": "Low",    "pesticide": "Quinalphos 25% EC",     "reports": 34},
    {"pest": "Fall Armyworm",   "crop": "Maize",   "region": "Madhya Pradesh","severity": "High",   "pesticide": "Spinetoram 11.7% SC",   "reports": 176},
    {"pest": "Locust Swarms",   "crop": "General", "region": "Rajasthan",     "severity": "Critical","pesticide": "Malathion 50% EC",      "reports": 512},
]

GOV_SCHEMES = [
    {
        "name": "PM-KISAN",
        "full_name": "Pradhan Mantri Kisan Samman Nidhi",
        "benefit": "₹6,000/year in 3 installments",
        "eligibility": "All landholding farmer families",
        "deadline": "Open year-round",
        "category": "Income Support",
        "link": "pmkisan.gov.in",
        "icon": "💰"
    },
    {
        "name": "PMFBY",
        "full_name": "PM Fasal Bima Yojana",
        "benefit": "Crop insurance up to ₹2 lakh",
        "eligibility": "All farmers growing notified crops",
        "deadline": "Before sowing season",
        "category": "Insurance",
        "link": "pmfby.gov.in",
        "icon": "🛡️"
    },
    {
        "name": "KCC",
        "full_name": "Kisan Credit Card",
        "benefit": "Credit up to ₹3 lakh @ 4% interest",
        "eligibility": "All farmers, sharecroppers, tenant farmers",
        "deadline": "Open year-round",
        "category": "Credit",
        "link": "nabard.org",
        "icon": "💳"
    },
    {
        "name": "PMKSY",
        "full_name": "PM Krishi Sinchayee Yojana",
        "benefit": "Subsidy on drip/sprinkler irrigation",
        "eligibility": "Individual farmers, SHGs, co-ops",
        "deadline": "Apply via state agriculture dept",
        "category": "Irrigation",
        "link": "pmksy.gov.in",
        "icon": "💧"
    },
    {
        "name": "eNAM",
        "full_name": "National Agriculture Market",
        "benefit": "Online crop trading at best prices",
        "eligibility": "All registered farmers",
        "deadline": "Open year-round",
        "category": "Market Access",
        "link": "enam.gov.in",
        "icon": "📊"
    },
    {
        "name": "SMAM",
        "full_name": "Sub-Mission on Agricultural Mechanization",
        "benefit": "50-80% subsidy on farm machinery",
        "eligibility": "Small & marginal farmers",
        "deadline": "State-wise, apply via CHC portal",
        "category": "Equipment",
        "link": "agrimachinery.nic.in",
        "icon": "🚜"
    },
]

CROP_CALENDARS = {
    "Wheat": [
        {"day": 1,   "task": "Land Preparation",  "desc": "Plough and level the field. Apply FYM 5 tons/acre.", "type": "prep"},
        {"day": 5,   "task": "Sowing",             "desc": "Sow at 100 kg/acre. Row spacing 22.5 cm. Depth 5 cm.", "type": "sow"},
        {"day": 21,  "task": "First Irrigation",   "desc": "Crown root initiation stage. Critical for yield.", "type": "water"},
        {"day": 25,  "task": "Urea Top Dress",      "desc": "Apply 1/3 of Urea dose (40 kg/acre) after irrigation.", "type": "fertilize"},
        {"day": 45,  "task": "Second Irrigation",   "desc": "Tillering stage. Apply remaining fertilizer.", "type": "water"},
        {"day": 60,  "task": "Weed Control",        "desc": "Apply 2,4-D herbicide or manual weeding.", "type": "protect"},
        {"day": 65,  "task": "Fungicide Spray",     "desc": "Preventive spray for rust — Propiconazole 25% EC.", "type": "protect"},
        {"day": 90,  "task": "Boot Stage Irrigation","desc": "Critical — do not miss. Determines grain count.", "type": "water"},
        {"day": 120, "task": "Pre-Harvest Check",   "desc": "Grain moisture should be ≤ 20% for harvest.", "type": "harvest"},
        {"day": 130, "task": "Harvest",             "desc": "Use combine harvester. Optimal moisture: 14-18%.", "type": "harvest"},
    ],
    "Rice": [
        {"day": 1,   "task": "Nursery Preparation", "desc": "Prepare 1/10th of main field as nursery bed.", "type": "prep"},
        {"day": 25,  "task": "Transplanting",       "desc": "Transplant 2-3 seedlings/hill. Spacing 20×15 cm.", "type": "sow"},
        {"day": 35,  "task": "First Fertilizer",    "desc": "Apply Urea + DAP basal dose at transplanting + 10 days.", "type": "fertilize"},
        {"day": 50,  "task": "Weed Management",     "desc": "Apply Bispyribac Sodium or Pretilachlor for weeds.", "type": "protect"},
        {"day": 60,  "task": "Zinc Application",    "desc": "Spray Zinc Sulphate 0.5% solution if yellowing seen.", "type": "fertilize"},
        {"day": 75,  "task": "Panicle Initiation",  "desc": "Maintain 5 cm water depth. Critical growth stage.", "type": "water"},
        {"day": 100, "task": "Drain Field",          "desc": "Stop irrigation 10-15 days before harvest.", "type": "water"},
        {"day": 120, "task": "Harvest",             "desc": "Harvest when 80% grains turn golden/straw colored.", "type": "harvest"},
    ],
}

EQUIPMENT_LIST = [
    {"name": "John Deere Tractor 55HP", "owner": "Ramesh Yadav",    "location": "Kalyanpur",  "rate": 800,  "unit": "hr",  "available": True,  "rating": 4.8, "type": "Tractor"},
    {"name": "Paddy Thresher",          "owner": "Suresh Patel",    "location": "Patna Rural", "rate": 1200, "unit": "day", "available": True,  "rating": 4.5, "type": "Thresher"},
    {"name": "Rotavator (7ft)",         "owner": "Mahesh Singh",    "location": "Kalyanpur",  "rate": 600,  "unit": "hr",  "available": False, "rating": 4.7, "type": "Tractor"},
    {"name": "Combine Harvester",       "owner": "Agro Services Co","location": "District HQ", "rate": 1500, "unit": "hr",  "available": True,  "rating": 4.9, "type": "Harvester"},
    {"name": "Drip Irrigation Kit 1ac", "owner": "AquaFarm",        "location": "Alwar",      "rate": 2000, "unit": "day", "available": True,  "rating": 4.6, "type": "Irrigation"},
    {"name": "Power Sprayer",           "owner": "Vijay Kumar",     "location": "Kalyanpur",  "rate": 300,  "unit": "hr",  "available": True,  "rating": 4.3, "type": "Sprayer"},
]

# ─── Original Routes ─────────────────────────────────────────────────────────

@app.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', 'New Delhi')
    return jsonify({
        "city": city,
        "temp": random.randint(20, 35),
        "condition": random.choice(["Sunny", "Partly Cloudy", "Rainy", "Humid"]),
        "humidity": random.randint(30, 80),
        "wind_speed": random.randint(5, 20)
    })

@app.route('/api/crops', methods=['POST'])
def suggest_crops():
    data = request.json
    season = data.get('season')
    soil = data.get('soil')
    suggestions = [c for c in CROPS_DATA if c['season'] == season or c['soil'] == soil]
    if not suggestions:
        suggestions = random.sample(CROPS_DATA, 2)
    return jsonify(suggestions)

@app.route('/api/fertilizers', methods=['GET'])
def get_fertilizers():
    crop = request.args.get('crop')
    data = FERTILIZERS.get(crop, ["General NPK", "Organic Manure"])
    return jsonify({"crop": crop, "fertilizers": data})

@app.route('/api/mandi', methods=['GET'])
def get_mandi():
    return jsonify(MANDI_PRICES)

@app.route('/api/detect', methods=['POST'])
def detect_disease():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    diseases = ["Leaf Rust", "Powdery Mildew", "Blight", "Healthy", "Root Rot"]
    treatments = {
        "Leaf Rust":      "Apply fungicide with Tebuconazole. Repeat every 14 days if severe.",
        "Powdery Mildew": "Use sulfur-based sprays or Neem oil (5ml/L). Improve air circulation.",
        "Blight":         "Remove infected leaves immediately. Apply Copper-based fungicide.",
        "Healthy":        "No treatment needed. Maintain current practices. Keep monitoring weekly.",
        "Root Rot":       "Improve field drainage. Reduce irrigation. Apply Trichoderma to soil."
    }
    result = random.choice(diseases)
    return jsonify({
        "disease": result,
        "confidence": f"{random.uniform(85, 99):.2f}%",
        "treatment": treatments[result]
    })

# ─── New Advanced Routes ──────────────────────────────────────────────────────

@app.route('/api/irrigation', methods=['POST'])
def irrigation_advice():
    data = request.json
    crop = data.get('crop', 'Wheat')
    soil_moisture = float(data.get('soil_moisture', 50))
    temp = float(data.get('temp', 30))
    humidity = float(data.get('humidity', 50))

    # Simple Evapotranspiration estimate (Hargreaves simplified)
    et0 = round(0.0023 * (temp + 17.8) * (temp + 3) * 0.408, 2)
    
    # Crop coefficient
    kc = {"Wheat": 1.15, "Rice": 1.20, "Cotton": 1.05, "Mustard": 0.95, "Maize": 1.10}.get(crop, 1.0)
    etc = round(et0 * kc, 2)  # Crop water demand (mm/day)

    if soil_moisture < 30:
        status = "Critical"
        action = "Irrigate immediately — soil is severely dry."
        amount = round(etc * 2.5, 1)
    elif soil_moisture < 50:
        status = "Low"
        action = "Irrigate today in the evening for best absorption."
        amount = round(etc * 1.5, 1)
    elif soil_moisture < 70:
        status = "Adequate"
        action = "Soil moisture is acceptable. Next irrigation in 2-3 days."
        amount = round(etc * 0.8, 1)
    else:
        status = "Optimal"
        action = "No irrigation needed. Monitor for next 4-5 days."
        amount = 0

    return jsonify({
        "status": status,
        "action": action,
        "water_needed_mm": amount,
        "et0": et0,
        "etc": etc,
        "next_irrigation": "Tomorrow evening" if soil_moisture < 50 else "In 3-4 days",
        "saving_tip": f"Drip irrigation saves up to 40% water vs flood irrigation for {crop}."
    })

@app.route('/api/pests', methods=['GET'])
def get_pest_alerts():
    region = request.args.get('region', '')
    if region:
        filtered = [p for p in PEST_ALERTS if region.lower() in p['region'].lower()]
        return jsonify(filtered if filtered else PEST_ALERTS[:3])
    return jsonify(PEST_ALERTS)

@app.route('/api/calendar', methods=['GET'])
def get_crop_calendar():
    crop = request.args.get('crop', 'Wheat')
    calendar = CROP_CALENDARS.get(crop, CROP_CALENDARS['Wheat'])
    return jsonify({"crop": crop, "tasks": calendar, "total_days": calendar[-1]['day']})

@app.route('/api/soil', methods=['POST'])
def analyze_soil():
    data = request.json
    soil_type = data.get('soil_type', 'Alluvial')
    nitrogen = float(data.get('nitrogen', 50))
    phosphorus = float(data.get('phosphorus', 50))
    potassium = float(data.get('potassium', 50))
    ph = float(data.get('ph', 7.0))

    # Grade each nutrient
    def grade(val):
        if val < 30: return "Low"
        if val < 60: return "Medium"
        return "High"

    suitable_crops = {
        "Alluvial": ["Wheat", "Rice", "Sugarcane", "Maize"],
        "Black":    ["Cotton", "Soybean", "Sorghum", "Sunflower"],
        "Loamy":    ["Vegetables", "Maize", "Mustard", "Groundnut"],
        "Clayey":   ["Rice", "Jute", "Taro"],
        "Sandy":    ["Groundnut", "Watermelon", "Carrot"],
        "Red":      ["Groundnut", "Pulses", "Millets"],
    }.get(soil_type, ["Wheat", "Maize"])

    # Deficiency recommendations
    recs = []
    if nitrogen < 40:
        recs.append({"nutrient": "Nitrogen (N)", "status": "Deficient", "fix": "Apply Urea 50 kg/acre or Ammonium Sulphate", "color": "#ef4444"})
    if phosphorus < 40:
        recs.append({"nutrient": "Phosphorus (P)", "status": "Deficient", "fix": "Apply DAP 50 kg/acre or SSP 100 kg/acre", "color": "#f59e0b"})
    if potassium < 40:
        recs.append({"nutrient": "Potassium (K)", "status": "Deficient", "fix": "Apply MOP 25 kg/acre or SOP for quality crops", "color": "#8b5cf6"})
    if ph < 6.0:
        recs.append({"nutrient": "Soil pH (Acidic)", "status": "Problem", "fix": "Apply Lime 200-300 kg/acre to raise pH", "color": "#3b82f6"})
    if ph > 8.0:
        recs.append({"nutrient": "Soil pH (Alkaline)", "status": "Problem", "fix": "Apply Gypsum 200-400 kg/acre to lower pH", "color": "#ec4899"})

    health_score = int((nitrogen + phosphorus + potassium) / 3)
    if 6.0 <= ph <= 7.5:
        health_score = min(100, health_score + 15)

    return jsonify({
        "health_score": health_score,
        "soil_type": soil_type,
        "npk": {"N": grade(nitrogen), "P": grade(phosphorus), "K": grade(potassium)},
        "ph_status": "Optimal" if 6.0 <= ph <= 7.5 else ("Acidic" if ph < 6.0 else "Alkaline"),
        "suitable_crops": suitable_crops,
        "recommendations": recs,
        "organic_matter": random.choice(["Low (< 0.5%)", "Medium (0.5-1%)", "Good (> 1%)"]),
    })

@app.route('/api/schemes', methods=['GET'])
def get_schemes():
    category = request.args.get('category', '')
    if category and category != 'All':
        filtered = [s for s in GOV_SCHEMES if s['category'] == category]
        return jsonify(filtered if filtered else GOV_SCHEMES)
    return jsonify(GOV_SCHEMES)

@app.route('/api/profit', methods=['POST'])
def calculate_profit():
    data = request.json
    crop = data.get('crop', 'Wheat')
    area = float(data.get('area', 1))  # acres
    seed_cost = float(data.get('seed_cost', 0))
    fertilizer_cost = float(data.get('fertilizer_cost', 0))
    pesticide_cost = float(data.get('pesticide_cost', 0))
    labor_cost = float(data.get('labor_cost', 0))
    irrigation_cost = float(data.get('irrigation_cost', 0))
    misc_cost = float(data.get('misc_cost', 0))

    # Yield benchmarks (quintal/acre) and current prices
    crop_data = {
        "Wheat":   {"yield": 18, "price": 2100},
        "Rice":    {"yield": 20, "price": 2400},
        "Cotton":  {"yield": 8,  "price": 6500},
        "Mustard": {"yield": 7,  "price": 5400},
        "Maize":   {"yield": 22, "price": 1800},
    }.get(crop, {"yield": 15, "price": 2000})

    total_cost = seed_cost + fertilizer_cost + pesticide_cost + labor_cost + irrigation_cost + misc_cost
    expected_yield = crop_data["yield"] * area
    gross_revenue = expected_yield * crop_data["price"]
    net_profit = gross_revenue - total_cost
    roi = round((net_profit / total_cost * 100) if total_cost > 0 else 0, 1)
    cost_per_quintal = round(total_cost / expected_yield, 0) if expected_yield > 0 else 0

    return jsonify({
        "crop": crop,
        "area": area,
        "total_cost": total_cost,
        "expected_yield_qtl": expected_yield,
        "market_price_per_qtl": crop_data["price"],
        "gross_revenue": gross_revenue,
        "net_profit": net_profit,
        "roi_percent": roi,
        "cost_per_quintal": cost_per_quintal,
        "breakeven_price": cost_per_quintal,
        "profit_grade": "Excellent" if roi > 40 else ("Good" if roi > 20 else ("Marginal" if roi > 0 else "Loss")),
    })

@app.route('/api/equipment', methods=['GET'])
def get_equipment():
    eq_type = request.args.get('type', '')
    if eq_type and eq_type != 'All':
        filtered = [e for e in EQUIPMENT_LIST if e['type'] == eq_type]
        return jsonify(filtered)
    return jsonify(EQUIPMENT_LIST)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
