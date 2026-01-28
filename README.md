# Urban Water Insights 💧

Urban Water Insights is a **hackathon prototype** that demonstrates how **urban water demand forecasting** and **scenario-based simulation** can help support **smart city water planning**.

The project allows users to adjust environmental and socio-economic parameters and instantly view their impact on future water demand, along with alerts and recommendations.

---

## 🎯 Hackathon Objective

To build a working system that:
- Forecasts short-term urban water demand
- Allows interactive scenario simulation
- Detects potential water shortages
- Presents results in a clear, visual dashboard

---

## ✨ Key Highlights

- 📊 **Scenario-based water demand forecasting**
- 🎛️ **Interactive simulator** (temperature, rainfall, population, industry, events)
- ⚠️ **Automatic alerts** when demand exceeds capacity
- 📈 **Graphical visualization** of forecast results
- 🌐 **Modern web dashboard**
- ⚙️ **API-driven backend architecture**

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS

### Backend
- FastAPI (Python)
- SARIMAX time-series model
- Pandas
- Joblib

---

## 🗂️ Project Structure

```text
urban-water-insights/
├── frontend/        # React frontend (dashboard & simulator)
├── backend/         # FastAPI backend (forecasting API)
└── README.md
```
🚀 How to Run the Project Locally
1️⃣ Clone Repository
```
git clone https://github.com/DishantBhere/urban-water-insights.git
cd urban-water-insights
```

2️⃣ Backend Setup (FastAPI)
```
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs at:
```
http://127.0.0.1:8000
```
API documentation:
```
http://127.0.0.1:8000/docs
```
3️⃣ Frontend Setup (React)
```
cd frontend
npm install
npm run dev
```
Frontend runs at:
```
http://localhost:8080
```
🔗 Core API Endpoint
POST /forecast

Purpose:
Generates water demand predictions based on user-defined scenarios.

Example Request:
```
{
  "days": 7,
  "avg_temp": 30,
  "rainfall": 20,
  "population_index": 1.2,
  "industrial_index": 1.1,
  "population_growth_pct": 2,
  "industrial_surge_pct": 5,
  "festival": 1,
  "heatwave": 0
}
```
Example Response:
```
{
  "forecast": [420.5, 435.2, 460.1],
  "alerts": ["Shortage expected on Day 3"],
  "actions": ["Increase supply or apply rationing measures"]
}
```



