const API_BASE_URL = 'http://127.0.0.1:8000';

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

export async function fetchForecast(params: ForecastRequest): Promise<ForecastResponse> {
  const response = await fetch(`${API_BASE_URL}/forecast`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(`${API_BASE_URL}/forecast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        forecast_days: 7,
        avg_temp: 25,
        rainfall: 0,
        population_index: 1,
        industrial_index: 1,
        population_growth: 0,
        industrial_surge: 0,
        festival: false,
        heatwave: false,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

export function speakText(text: string, lang: string = 'en-US'): void {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }
}
