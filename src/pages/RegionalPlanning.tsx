import { useState, useEffect } from 'react';
import { MapPin, Users, Droplets, Factory, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ForecastChart from '@/components/shared/ForecastChart';
import AlertsPanel from '@/components/shared/AlertsPanel';
import { useLanguage } from '@/contexts/LanguageContext';
import { regions, Region } from '@/lib/regions';
import { fetchForecast, ForecastResponse } from '@/lib/api';

const RegionalPlanning = () => {
  const { t } = useLanguage();
  
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ForecastResponse | null>(null);

  const handleRegionChange = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    if (region) {
      setSelectedRegion(region);
      setResult(null);
    }
  };

  const handleRunForecast = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchForecast({
        forecast_days: 14,
        avg_temp: selectedRegion.defaultParams.avg_temp,
        rainfall: selectedRegion.defaultParams.rainfall,
        population_index: selectedRegion.defaultParams.population_index,
        industrial_index: selectedRegion.defaultParams.industrial_index,
        population_growth: 2,
        industrial_surge: 5,
        festival: false,
        heatwave: false,
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch forecast');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('regionalPlanning')}
            </h1>
            <p className="text-muted-foreground">
              Analyze water demand across major metropolitan regions
            </p>
          </div>

          {/* Region Selector */}
          <div className="panel-elevated mb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="flex-1 space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {t('selectRegion')}
                </label>
                <Select
                  value={selectedRegion.id}
                  onValueChange={handleRegionChange}
                >
                  <SelectTrigger className="w-full md:w-64 bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleRunForecast}
                disabled={loading}
                className="btn-primary"
              >
                <Play className="mr-2 h-4 w-4" />
                {loading ? t('loading') : t('runForecast')}
              </Button>
            </div>
          </div>

          {/* Region Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="panel-elevated">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">{t('basePopulation')}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {selectedRegion.population} <span className="text-sm font-normal text-muted-foreground">{t('million')}</span>
              </p>
            </div>

            <div className="panel-elevated">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="h-5 w-5 text-info" />
                <span className="text-sm text-muted-foreground">{t('baseCapacity')}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {selectedRegion.capacity.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">{t('mlDay')}</span>
              </p>
            </div>

            <div className="panel-elevated">
              <div className="flex items-center gap-3 mb-2">
                <Factory className="h-5 w-5 text-warning" />
                <span className="text-sm text-muted-foreground">{t('industrialLoad')}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {selectedRegion.industrialLoad}x
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-8">
            {error ? (
              <div className="chart-container flex items-center justify-center">
                <div className="text-center">
                  <p className="text-destructive mb-2">{t('error')}</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </div>
            ) : (
              <ForecastChart
                data={result?.forecast || []}
                loading={loading}
                title={`${selectedRegion.name} - ${t('forecastResults')}`}
              />
            )}
          </div>

          {/* Alerts */}
          {result && (
            <AlertsPanel
              alerts={result.alerts}
              actions={result.actions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionalPlanning;
