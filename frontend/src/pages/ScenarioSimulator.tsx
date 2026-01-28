import { useState } from "react";
import {
  Play,
  RotateCcw,
  Thermometer,
  CloudRain,
  Users,
  Factory,
  TrendingUp,
  Flame,
  PartyPopper,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SliderInput from "@/components/shared/SliderInput";
import ToggleInput from "@/components/shared/ToggleInput";
import LanguageSelector from "@/components/shared/LanguageSelector";
import ForecastChart from "@/components/shared/ForecastChart";
import AlertsPanel from "@/components/shared/AlertsPanel";

import { fetchForecast, ForecastResponse } from "@/lib/api";

/* -----------------------------
   SAFE DEFAULT VALUES
------------------------------ */
const defaultParams = {
  forecastDays: 7,
  avgTemp: 28,
  rainfall: 10,
  populationIndex: 1.0,
  industrialIndex: 1.0,
  populationGrowth: 2,
  industrialSurge: 0,
  festival: false,
  heatwave: false,
};

const ScenarioSimulator = () => {
  const [params, setParams] = useState(defaultParams);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ForecastResponse | null>(null);

  const handleRunForecast = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchForecast({
        forecast_days: params.forecastDays,
        avg_temp: params.avgTemp,
        rainfall: params.rainfall,
        population_index: params.populationIndex,
        industrial_index: params.industrialIndex,
        population_growth: params.populationGrowth,
        industrial_surge: params.industrialSurge,
        festival: params.festival,
        heatwave: params.heatwave,
      });

      setResult(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch forecast"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setParams(defaultParams);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT PANEL */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="panel-elevated sticky top-24 space-y-6">
              <h2 className="text-xl font-bold">Scenario Simulator</h2>

              {/* Forecast Duration */}
              <Select
                value={String(params.forecastDays)}
                onValueChange={(v) =>
                  setParams({ ...params, forecastDays: Number(v) })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>

              <SliderInput
                label="Average Temperature"
                value={params.avgTemp}
                onChange={(v) => setParams({ ...params, avgTemp: v })}
                min={15}
                max={45}
                step={1}
                unit="°C"
                icon={<Thermometer className="h-4 w-4" />}
              />

              <SliderInput
                label="Rainfall"
                value={params.rainfall}
                onChange={(v) => setParams({ ...params, rainfall: v })}
                min={0}
                max={100}
                step={1}
                unit="mm"
                icon={<CloudRain className="h-4 w-4" />}
              />

              <SliderInput
                label="Population Index"
                value={params.populationIndex}
                onChange={(v) =>
                  setParams({ ...params, populationIndex: v })
                }
                min={0.5}
                max={2.5}
                step={0.1}
                icon={<Users className="h-4 w-4" />}
              />

              <SliderInput
                label="Industrial Index"
                value={params.industrialIndex}
                onChange={(v) =>
                  setParams({ ...params, industrialIndex: v })
                }
                min={0.5}
                max={2.5}
                step={0.1}
                icon={<Factory className="h-4 w-4" />}
              />

              <SliderInput
                label="Population Growth"
                value={params.populationGrowth}
                onChange={(v) =>
                  setParams({ ...params, populationGrowth: v })
                }
                min={0}
                max={10}
                step={0.5}
                unit="%"
                icon={<TrendingUp className="h-4 w-4" />}
              />

              <SliderInput
                label="Industrial Surge"
                value={params.industrialSurge}
                onChange={(v) =>
                  setParams({ ...params, industrialSurge: v })
                }
                min={0}
                max={20}
                step={1}
                unit="%"
                icon={<TrendingUp className="h-4 w-4" />}
              />

              <ToggleInput
                label="Festival Period"
                checked={params.festival}
                onChange={(v) => setParams({ ...params, festival: v })}
                icon={<PartyPopper className="h-4 w-4" />}
              />

              <ToggleInput
                label="Heatwave Active"
                checked={params.heatwave}
                onChange={(v) => setParams({ ...params, heatwave: v })}
                icon={<Flame className="h-4 w-4" />}
              />

              <LanguageSelector />

              <div className="flex gap-3">
                <Button
                  onClick={handleRunForecast}
                  disabled={loading}
                  className="flex-1"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {loading ? "Loading..." : "Run Forecast"}
                </Button>

                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </aside>

          {/* RIGHT PANEL */}
          <main className="flex-1 space-y-6">
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <ForecastChart
                data={result?.forecast || []}
                loading={loading}
                title="Water Demand Forecast"
              />
            )}

            {result && (
              <AlertsPanel
                alerts={result.alerts}
                actions={result.actions}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulator;
