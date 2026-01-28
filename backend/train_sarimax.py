import pandas as pd
from statsmodels.tsa.statespace.sarimax import SARIMAX
import joblib

df = pd.read_csv("../data/water_ts_data.csv", parse_dates=["date"])
df = df.set_index("date")

y = df["water_demand"]

exog = df[
    [
        "avg_temp",
        "rainfall",
        "festival",
        "population_index",
        "industrial_index",
    ]
]

model = SARIMAX(
    y,
    exog=exog,
    order=(1, 1, 1),
    seasonal_order=(1, 1, 1, 7),
    enforce_stationarity=False,
    enforce_invertibility=False,
)

results = model.fit(disp=False)

joblib.dump(results, "sarimax_model.pkl")

print("SARIMAX model retrained and saved")
