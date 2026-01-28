import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AlertsPanelProps {
  alerts: string[];
  actions: string[];
}

const AlertsPanel = ({ alerts, actions }: AlertsPanelProps) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Alerts */}
      <div className="panel-elevated">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
          <AlertTriangle className="h-5 w-5 text-warning" />
          {t('alerts')}
        </h3>
        <div className="space-y-3">
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <div key={index} className="alert-warning">
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{alert}</p>
              </div>
            ))
          ) : (
            <div className="alert-success">
              <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{t('noAlerts')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="panel-elevated">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
          <Info className="h-5 w-5 text-info" />
          {t('recommendations')}
        </h3>
        <div className="space-y-3">
          {actions.length > 0 ? (
            actions.map((action, index) => (
              <div key={index} className="alert-info">
                <CheckCircle className="h-4 w-4 text-info shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{action}</p>
              </div>
            ))
          ) : (
            <div className="alert-info">
              <Info className="h-4 w-4 text-info shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{t('noRecommendations')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;
