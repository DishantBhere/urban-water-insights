const API_BASE_URL = 'http://127.0.0.1:8000';

/* -----------------------------
   Types (UNCHANGED externally)
------------------------------ */
export interface ForecastRequest {
  forecast_days: number;
  avg_temp: number;
  rainfall: number;
  population_index: number;
  industrial_index: number;
  population_growth: number;
  industrial_surge: number;
  festival: boolean;
  heatwave: boolean;
}

export interface ForecastResponse {
  forecast: number[];
  alerts: string[];
  actions: string[];
}

/* -----------------------------
   Forecast API (FIXED MAPPING)
------------------------------ */
export async function fetchForecast(
  params: ForecastRequest
): Promise<ForecastResponse> {

  // 🔁 Convert frontend params → backend schema
  const payload = {
    days: params.forecast_days,
    avg_temp: params.avg_temp,
    rainfall: params.rainfall,
    population_index: params.population_index,
    industrial_index: params.industrial_index,

    population_growth_pct: params.population_growth,
    industrial_surge_pct: params.industrial_surge,

    festival: params.festival ? 1 : 0,
    heatwave: params.heatwave ? 1 : 0,
  };

  const response = await fetch(`${API_BASE_URL}/forecast`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API Error: ${response.status} ${text}`);
  }

  return response.json();
}

/* -----------------------------
   Backend health check (FIXED)
------------------------------ */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${API_BASE_URL}/forecast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        days: 1,
        avg_temp: 25,
        rainfall: 0,
        population_index: 1,
        industrial_index: 1,
        population_growth_pct: 0,
        industrial_surge_pct: 0,
        festival: 0,
        heatwave: 0,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

/* -----------------------------
   Text-to-speech (UNCHANGED)
------------------------------ */
export function speakText(text: string, lang: string = 'en-US'): void {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }
}
