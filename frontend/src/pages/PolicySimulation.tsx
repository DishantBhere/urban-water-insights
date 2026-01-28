import { useState, useEffect, useMemo } from 'react';
import { Play, Download, Percent, DollarSign, Droplets, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SliderInput from '@/components/shared/SliderInput';
import ForecastChart from '@/components/shared/ForecastChart';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchForecast, ForecastResponse } from '@/lib/api';

const PolicySimulation = () => {
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [baseline, setBaseline] = useState<ForecastResponse | null>(null);
  const [policyResult, setPolicyResult] = useState<ForecastResponse | null>(null);

  // Policy sliders
  const [supplyAug, setSupplyAug] = useState(0);
  const [rationing, setRationing] = useState(0);
  const [priceIncrease, setPriceIncrease] = useState(0);

  // Fetch baseline on mount
  useEffect(() => {
    const fetchBaseline = async () => {
      try {
        const response = await fetchForecast({
          forecast_days: 14,
          avg_temp: 30,
          rainfall: 5,
          population_index: 1.2,
          industrial_index: 1.5,
          population_growth: 2,
          industrial_surge: 5,
          festival: false,
          heatwave: false,
        });
        setBaseline(response);
      } catch {
        // Baseline fetch failed silently
      }
    };
    fetchBaseline();
  }, []);

  const handleRunPolicy = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate policy effects by adjusting parameters
      const adjustedPopIndex = Math.max(0.5, 1.2 - (rationing / 100) * 0.3);
      const adjustedIndIndex = Math.max(0.5, 1.5 - (priceIncrease / 100) * 0.2);

      const response = await fetchForecast({
        forecast_days: 14,
        avg_temp: 30,
        rainfall: 5 + (supplyAug / 100) * 10, // Simulate more supply as "effective rainfall"
        population_index: adjustedPopIndex,
        industrial_index: adjustedIndIndex,
        population_growth: Math.max(0, 2 - (priceIncrease / 100)),
        industrial_surge: Math.max(0, 5 - (rationing / 100) * 2),
        festival: false,
        heatwave: false,
      });
      setPolicyResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run policy simulation');
    } finally {
      setLoading(false);
    }
  };

  // Calculate impact metrics
  const impacts = useMemo(() => {
    if (!baseline || !policyResult) return null;

    const baselineAvg = baseline.forecast.reduce((a, b) => a + b, 0) / baseline.forecast.length;
    const policyAvg = policyResult.forecast.reduce((a, b) => a + b, 0) / policyResult.forecast.length;
    const demandReduction = ((baselineAvg - policyAvg) / baselineAvg) * 100;
    const shortageReduction = Math.min(demandReduction * 1.5, 100);
    const revenueImpact = priceIncrease * 0.8 - rationing * 0.3 + supplyAug * 0.2;

    return {
      demandReduction: demandReduction.toFixed(1),
      shortageReduction: shortageReduction.toFixed(1),
      revenueImpact: revenueImpact.toFixed(1),
    };
  }, [baseline, policyResult, supplyAug, rationing, priceIncrease]);

  const exportJSON = () => {
    if (!policyResult || !baseline) return;
    
    const data = {
      timestamp: new Date().toISOString(),
      policies: { supplyAug, rationing, priceIncrease },
      baseline: baseline.forecast,
      adjusted: policyResult.forecast,
      impacts,
      alerts: policyResult.alerts,
      recommendations: policyResult.actions,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'policy-simulation.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    if (!policyResult || !baseline) return;

    const headers = ['Day', 'Baseline', 'Policy Adjusted'];
    const rows = baseline.forecast.map((b, i) => [
      `Day ${i + 1}`,
      b.toFixed(2),
      policyResult.forecast[i]?.toFixed(2) || '',
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'policy-simulation.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('policySimulation')}
            </h1>
            <p className="text-muted-foreground">
              Test policy impacts before implementation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Policy Controls */}
            <div className="lg:col-span-1">
              <div className="panel-elevated space-y-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground">
                  Policy Parameters
                </h2>

                <SliderInput
                  label={t('supplyAugmentation')}
                  value={supplyAug}
                  onChange={setSupplyAug}
                  min={0}
                  max={50}
                  step={5}
                  unit="%"
                  icon={<Droplets className="h-4 w-4 text-info" />}
                />

                <SliderInput
                  label={t('waterRationing')}
                  value={rationing}
                  onChange={setRationing}
                  min={0}
                  max={30}
                  step={5}
                  unit="%"
                  icon={<Percent className="h-4 w-4 text-warning" />}
                />

                <SliderInput
                  label={t('priceIncrease')}
                  value={priceIncrease}
                  onChange={setPriceIncrease}
                  min={0}
                  max={50}
                  step={5}
                  unit="%"
                  icon={<DollarSign className="h-4 w-4 text-success" />}
                />

                <div className="h-px bg-border" />

                <Button
                  onClick={handleRunPolicy}
                  disabled={loading}
                  className="w-full btn-primary"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {loading ? t('loading') : 'Run Simulation'}
                </Button>

                {policyResult && (
                  <div className="flex gap-3">
                    <Button
                      onClick={exportJSON}
                      variant="outline"
                      className="flex-1 btn-secondary text-sm"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t('exportJson')}
                    </Button>
                    <Button
                      onClick={exportCSV}
                      variant="outline"
                      className="flex-1 btn-secondary text-sm"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t('exportCsv')}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Chart */}
              {error ? (
                <div className="chart-container flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-destructive mb-2">{t('error')}</p>
                    <p className="text-sm text-muted-foreground">{error}</p>
                  </div>
                </div>
              ) : (
                <ForecastChart
                  data={policyResult?.forecast || baseline?.forecast || []}
                  comparisonData={policyResult ? baseline?.forecast : undefined}
                  loading={loading}
                  title={`${t('baseline')} vs ${t('policyAdjusted')}`}
                />
              )}

              {/* Impact Cards */}
              {impacts && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="panel-elevated">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">{t('shortageReduction')}</span>
                    </div>
                    <p className="text-2xl font-bold text-success">
                      {impacts.shortageReduction}%
                    </p>
                  </div>

                  <div className="panel-elevated">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="h-4 w-4 text-info" />
                      <span className="text-sm text-muted-foreground">{t('demandReduction')}</span>
                    </div>
                    <p className="text-2xl font-bold text-info">
                      {impacts.demandReduction}%
                    </p>
                  </div>

                  <div className="panel-elevated">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-warning" />
                      <span className="text-sm text-muted-foreground">{t('revenueImpact')}</span>
                    </div>
                    <p className={`text-2xl font-bold ${Number(impacts.revenueImpact) >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {Number(impacts.revenueImpact) >= 0 ? '+' : ''}{impacts.revenueImpact}%
                    </p>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {policyResult && policyResult.actions.length > 0 && (
                <div className="panel-elevated">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {t('recommendations')}
                  </h3>
                  <div className="space-y-2">
                    {policyResult.actions.map((action, i) => (
                      <div key={i} className="alert-info">
                        <p className="text-sm text-foreground">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicySimulation;
