from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os

# -------------------------
# App initialization
# -------------------------
app = FastAPI(title="Urban Water Insights API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # DEV ONLY
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Load model safely
# -------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "sarimax_model.pkl")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("❌ sarimax_model.pkl not found in backend folder")

model = joblib.load(MODEL_PATH)

# -------------------------
# Health check
# -------------------------
@app.get("/health")
def health():
    return {"status": "ok"}

# -------------------------
# Request schema
# -------------------------
class ForecastInput(BaseModel):
    days: int
    avg_temp: float
    rainfall: float
    population_index: float
    industrial_index: float

    festival: int = 0
    heatwave: int = 0
    population_growth_pct: float = 0.0
    industrial_surge_pct: float = 0.0


# -------------------------
# Forecast endpoint
# -------------------------
@app.post("/forecast")
def forecast(data: ForecastInput):

    # Apply scenario multipliers
    temp = data.avg_temp * (1.15 if data.heatwave == 1 else 1.0)
    pop = data.population_index * (1 + data.population_growth_pct / 100)
    ind = data.industrial_index * (1 + data.industrial_surge_pct / 100)

    future_exog = pd.DataFrame({
        "avg_temp": [temp] * data.days,
        "rainfall": [data.rainfall] * data.days,
        "festival": [data.festival] * data.days,
        "population_index": [pop] * data.days,
        "industrial_index": [ind] * data.days,
    })

    forecast_obj = model.get_forecast(
        steps=data.days,
        exog=future_exog
    )

    preds = forecast_obj.predicted_mean.tolist()

    capacity = 500
    alerts = []
    actions = []

    for i, val in enumerate(preds):
        if val > capacity:
            shortage_pct = round(((val - capacity) / capacity) * 100, 2)
            alerts.append(f"Shortage expected on Day {i + 1}")
            actions.append(
                f"Increase supply by {shortage_pct}% or impose rationing in high-usage zones."
            )

    return {
        "forecast": [round(x, 2) for x in preds],
        "alerts": alerts,
        "actions": actions,
    }
