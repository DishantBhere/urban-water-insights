import { useMemo } from 'react';
import { Activity, Wifi, WifiOff, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { WaterDemandUpdate } from '@/hooks/useWebSocket';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface LiveDataFeedProps {
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  liveData: WaterDemandUpdate[];
  currentDemand: number;
  onConnect: () => void;
  onDisconnect: () => void;
}

const LiveDataFeed = ({
  isConnected,
  connectionStatus,
  liveData,
  currentDemand,
  onConnect,
  onDisconnect,
}: LiveDataFeedProps) => {
  const { t } = useLanguage();

  const chartData = useMemo(() => {
    return liveData.map((item, index) => ({
      time: item.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      demand: item.demand,
      index,
    }));
  }, [liveData]);

  const trend = useMemo(() => {
    if (liveData.length < 2) return 'stable';
    const recent = liveData.slice(-5);
    const first = recent[0]?.demand || 0;
    const last = recent[recent.length - 1]?.demand || 0;
    const diff = last - first;
    if (diff > 20) return 'up';
    if (diff < -20) return 'down';
    return 'stable';
  }, [liveData]);

  const latestUpdate = liveData[liveData.length - 1];

  return (
    <div className="panel-elevated">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-2 rounded-lg',
            isConnected ? 'bg-success/20' : 'bg-muted'
          )}>
            <Activity className={cn(
              'h-5 w-5',
              isConnected ? 'text-success animate-pulse' : 'text-muted-foreground'
            )} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Live Data Feed</h3>
            <p className="text-sm text-muted-foreground">Real-time water demand monitoring</p>
          </div>
        </div>
        
        <button
          onClick={isConnected ? onDisconnect : onConnect}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
            isConnected 
              ? 'bg-destructive/20 text-destructive hover:bg-destructive/30' 
              : 'bg-success/20 text-success hover:bg-success/30'
          )}
        >
          {isConnected ? (
            <>
              <WifiOff className="h-4 w-4" />
              Disconnect
            </>
          ) : (
            <>
              <Wifi className="h-4 w-4" />
              {connectionStatus === 'connecting' ? 'Connecting...' : 'Connect'}
            </>
          )}
        </button>
      </div>

      {/* Connection Status */}
      <div className="flex items-center gap-2 mb-4">
        <div className={cn(
          'h-2 w-2 rounded-full',
          connectionStatus === 'connected' && 'bg-success animate-pulse',
          connectionStatus === 'connecting' && 'bg-warning animate-pulse',
          connectionStatus === 'disconnected' && 'bg-muted-foreground',
          connectionStatus === 'error' && 'bg-destructive'
        )} />
        <span className="text-sm text-muted-foreground capitalize">{connectionStatus}</span>
      </div>

      {isConnected && liveData.length > 0 ? (
        <>
          {/* Current Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Demand</span>
                {trend === 'up' && <TrendingUp className="h-4 w-4 text-warning" />}
                {trend === 'down' && <TrendingDown className="h-4 w-4 text-success" />}
                {trend === 'stable' && <Minus className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div className="text-2xl font-bold text-primary mt-1">
                {currentDemand.toFixed(1)}
                <span className="text-sm font-normal text-muted-foreground ml-1">ML/day</span>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <span className="text-sm text-muted-foreground">Active Zone</span>
              <div className="text-lg font-semibold text-foreground mt-1 truncate">
                {latestUpdate?.zone || 'N/A'}
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <span className="text-sm text-muted-foreground">Status</span>
              <div className={cn(
                'text-lg font-semibold mt-1 capitalize',
                latestUpdate?.status === 'normal' && 'text-success',
                latestUpdate?.status === 'warning' && 'text-warning',
                latestUpdate?.status === 'critical' && 'text-destructive'
              )}>
                {latestUpdate?.status || 'N/A'}
              </div>
            </div>
          </div>

          {/* Live Chart */}
          <div className="h-48 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="liveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(186, 100%, 42%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(186, 100%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(215, 20%, 45%)" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(215, 20%, 45%)" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 10%)',
                    border: '1px solid hsl(217, 33%, 20%)',
                    borderRadius: '8px',
                    color: 'hsl(210, 40%, 96%)',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="hsl(186, 100%, 50%)"
                  strokeWidth={2}
                  fill="url(#liveGradient)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Wifi className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {connectionStatus === 'connecting' 
              ? 'Establishing connection...' 
              : 'Connect to view live data stream'}
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveDataFeed;
