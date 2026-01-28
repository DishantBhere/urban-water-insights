import { useState, useEffect, useCallback, useRef } from 'react';

export interface WaterDemandUpdate {
  timestamp: Date;
  demand: number;
  zone: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface SystemNotification {
  id: string;
  type: 'info' | 'warning' | 'alert' | 'success';
  title: string;
  message: string;
  timestamp: Date;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  liveData: WaterDemandUpdate[];
  notifications: SystemNotification[];
  currentDemand: number;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  connect: () => void;
  disconnect: () => void;
  clearNotifications: () => void;
}

const ZONES = ['Zone A - Residential', 'Zone B - Commercial', 'Zone C - Industrial', 'Zone D - Municipal'];

const NOTIFICATION_TEMPLATES = [
  { type: 'info' as const, title: 'System Update', message: 'Water pressure normalized in Zone A' },
  { type: 'warning' as const, title: 'High Demand Alert', message: 'Peak usage detected in commercial district' },
  { type: 'alert' as const, title: 'Maintenance Required', message: 'Pump station 3 requires inspection' },
  { type: 'success' as const, title: 'Optimization Complete', message: 'Distribution network optimized successfully' },
  { type: 'info' as const, title: 'Weather Update', message: 'Temperature rising - expect increased demand' },
  { type: 'warning' as const, title: 'Leak Detection', message: 'Minor leak detected in pipeline sector 7' },
  { type: 'success' as const, title: 'Reservoir Status', message: 'All reservoirs at optimal capacity' },
  { type: 'info' as const, title: 'Smart Meter Update', message: '2,450 smart meters reporting normally' },
];

export function useWebSocket(): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [liveData, setLiveData] = useState<WaterDemandUpdate[]>([]);
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [currentDemand, setCurrentDemand] = useState(0);
  
  const dataIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const notificationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const baseDemandRef = useRef(1000 + Math.random() * 500);

  const generateDemandUpdate = useCallback((): WaterDemandUpdate => {
    // Simulate realistic water demand fluctuations
    const timeOfDay = new Date().getHours();
    let demandMultiplier = 1;
    
    // Peak hours: morning (6-9) and evening (18-21)
    if ((timeOfDay >= 6 && timeOfDay <= 9) || (timeOfDay >= 18 && timeOfDay <= 21)) {
      demandMultiplier = 1.3 + Math.random() * 0.3;
    } else if (timeOfDay >= 0 && timeOfDay <= 5) {
      demandMultiplier = 0.5 + Math.random() * 0.2;
    }

    const demand = baseDemandRef.current * demandMultiplier + (Math.random() - 0.5) * 100;
    const zone = ZONES[Math.floor(Math.random() * ZONES.length)];
    
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    if (demand > 1600) status = 'critical';
    else if (demand > 1400) status = 'warning';

    return {
      timestamp: new Date(),
      demand: Math.round(demand * 100) / 100,
      zone,
      status,
    };
  }, []);

  const generateNotification = useCallback((): SystemNotification => {
    const template = NOTIFICATION_TEMPLATES[Math.floor(Math.random() * NOTIFICATION_TEMPLATES.length)];
    return {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...template,
      timestamp: new Date(),
    };
  }, []);

  const connect = useCallback(() => {
    if (isConnected) return;
    
    setConnectionStatus('connecting');
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setConnectionStatus('connected');
      
      // Start generating live data every 2 seconds
      dataIntervalRef.current = setInterval(() => {
        const update = generateDemandUpdate();
        setCurrentDemand(update.demand);
        setLiveData(prev => {
          const newData = [...prev, update];
          // Keep only last 30 data points
          return newData.slice(-30);
        });
      }, 2000);

      // Generate notifications randomly every 8-15 seconds
      const scheduleNextNotification = () => {
        const delay = 8000 + Math.random() * 7000;
        notificationIntervalRef.current = setTimeout(() => {
          const notification = generateNotification();
          setNotifications(prev => [notification, ...prev].slice(0, 10));
          scheduleNextNotification();
        }, delay);
      };
      scheduleNextNotification();

      // Add initial connection notification
      setNotifications([{
        id: `notif-connect-${Date.now()}`,
        type: 'success',
        title: 'Connected',
        message: 'Real-time data stream established',
        timestamp: new Date(),
      }]);

    }, 1500);
  }, [isConnected, generateDemandUpdate, generateNotification]);

  const disconnect = useCallback(() => {
    if (dataIntervalRef.current) {
      clearInterval(dataIntervalRef.current);
      dataIntervalRef.current = null;
    }
    if (notificationIntervalRef.current) {
      clearTimeout(notificationIntervalRef.current);
      notificationIntervalRef.current = null;
    }
    setIsConnected(false);
    setConnectionStatus('disconnected');
    const disconnectNotification: SystemNotification = {
      id: `notif-disconnect-${Date.now()}`,
      type: 'info',
      title: 'Disconnected',
      message: 'Real-time data stream closed',
      timestamp: new Date(),
    };
    setNotifications(prev => [disconnectNotification, ...prev].slice(0, 10));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    connect();
    return () => {
      if (dataIntervalRef.current) clearInterval(dataIntervalRef.current);
      if (notificationIntervalRef.current) clearTimeout(notificationIntervalRef.current);
    };
  }, []);

  return {
    isConnected,
    liveData,
    notifications,
    currentDemand,
    connectionStatus,
    connect,
    disconnect,
    clearNotifications,
  };
}
