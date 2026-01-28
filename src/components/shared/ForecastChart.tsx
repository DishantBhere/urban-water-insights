import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

interface ForecastChartProps {
  data: number[];
  comparisonData?: number[];
  title?: string;
  loading?: boolean;
}

const ForecastChart = ({ data, comparisonData, title, loading }: ForecastChartProps) => {
  const { t } = useLanguage();

  const chartData = useMemo(() => {
    return data.map((value, index) => ({
      day: `Day ${index + 1}`,
      demand: Math.round(value * 100) / 100,
      baseline: comparisonData ? Math.round(comparisonData[index] * 100) / 100 : undefined,
    }));
  }, [data, comparisonData]);

  if (loading) {
    return (
      <div className="chart-container flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner h-12 w-12 mx-auto mb-4" />
          <p className="text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="chart-container flex items-center justify-center">
        <p className="text-muted-foreground">Run a forecast to see results</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={comparisonData ? 350 : 320}>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(186, 100%, 42%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(186, 100%, 42%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
          <XAxis
            dataKey="day"
            stroke="hsl(215, 20%, 55%)"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(215, 20%, 55%)"
            fontSize={12}
            tickLine={false}
            label={{
              value: t('waterDemand'),
              angle: -90,
              position: 'insideLeft',
              fill: 'hsl(215, 20%, 55%)',
              fontSize: 12,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222, 47%, 10%)',
              border: '1px solid hsl(217, 33%, 20%)',
              borderRadius: '8px',
              color: 'hsl(210, 40%, 96%)',
            }}
            labelStyle={{ color: 'hsl(186, 100%, 50%)' }}
          />
          {comparisonData && (
            <Area
              type="monotone"
              dataKey="baseline"
              stroke="hsl(38, 92%, 50%)"
              strokeWidth={2}
              fill="url(#baselineGradient)"
              name={t('baseline')}
            />
          )}
          <Area
            type="monotone"
            dataKey="demand"
            stroke="hsl(186, 100%, 50%)"
            strokeWidth={2}
            fill="url(#demandGradient)"
            name={comparisonData ? t('policyAdjusted') : t('waterDemand')}
            style={{ filter: 'drop-shadow(0 0 6px hsl(186, 100%, 50%))' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
