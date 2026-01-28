import { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';
import { checkBackendHealth } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  className?: string;
}

const StatusBadge = ({ className }: StatusBadgeProps) => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await checkBackendHealth();
      setIsOnline(healthy);
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isOnline === null) {
    return (
      <div className={cn('status-online animate-pulse', className)}>
        <Circle className="h-2 w-2 fill-current animate-pulse" />
        <span>Checking...</span>
      </div>
    );
  }

  return (
    <div className={cn(isOnline ? 'status-online' : 'status-offline', className)}>
      <Circle className={cn('h-2 w-2 fill-current', isOnline && 'animate-pulse')} />
      <span>{isOnline ? t('systemOnline') : t('systemOffline')}</span>
    </div>
  );
};

export default StatusBadge;
