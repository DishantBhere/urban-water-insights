import { useNavigate } from 'react-router-dom';
import { Droplets, LineChart, Map, FileText, Volume2, Zap, Bell, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/StatusBadge';
import { useLanguage } from '@/contexts/LanguageContext';
import { speakText } from '@/lib/api';
import { speechLanguageCodes } from '@/lib/i18n';

const Home = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('featureForecasting'),
      description: t('featureForecastingDesc'),
    },
    {
      icon: Bell,
      title: t('featureAlerts'),
      description: t('featureAlertsDesc'),
    },
    {
      icon: BarChart3,
      title: t('featureAnalytics'),
      description: t('featureAnalyticsDesc'),
    },
    {
      icon: FileText,
      title: t('featurePolicy'),
      description: t('featurePolicyDesc'),
    },
  ];

  const handleSpeak = () => {
    const message = language === 'en' 
      ? 'Welcome to Urban Water Intelligence. The system is online and ready for water demand forecasting.'
      : language === 'hi'
      ? 'शहरी जल बुद्धिमत्ता में आपका स्वागत है। सिस्टम ऑनलाइन है और जल मांग पूर्वानुमान के लिए तैयार है।'
      : 'शहरी जल बुद्धिमत्ता मध्ये आपले स्वागत आहे। सिस्टम ऑनलाइन आहे आणि पाणी मागणी अंदाजासाठी तयार आहे.';
    
    speakText(message, speechLanguageCodes[language]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-info/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Status Badge */}
            <div className="flex justify-center mb-8">
              <StatusBadge />
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Droplets className="h-20 w-20 text-primary glow-text animate-float" />
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
              {t('heroTitle')}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {t('heroSubtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button
                onClick={() => navigate('/simulator')}
                className="btn-primary text-lg px-8 py-6"
              >
                <LineChart className="mr-2 h-5 w-5" />
                {t('runForecast')}
              </Button>
              <Button
                onClick={() => navigate('/regional')}
                variant="outline"
                className="btn-secondary text-lg px-8 py-6"
              >
                <Map className="mr-2 h-5 w-5" />
                {t('viewRegionalPlanning')}
              </Button>
            </div>

            {/* Text-to-Speech Button */}
            <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Button
                onClick={handleSpeak}
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
              >
                <Volume2 className="mr-2 h-4 w-4" />
                {t('speakAlerts')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 gradient-radial" />
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card animate-slide-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/simulator')}
              className="panel-elevated hover:border-primary/30 transition-all duration-300 group cursor-pointer text-left"
            >
              <LineChart className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t('scenarioSimulator')}
              </h3>
              <p className="text-sm text-muted-foreground">
                Run detailed water demand forecasts with customizable parameters
              </p>
            </button>

            <button
              onClick={() => navigate('/regional')}
              className="panel-elevated hover:border-primary/30 transition-all duration-300 group cursor-pointer text-left"
            >
              <Map className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t('regionalPlanning')}
              </h3>
              <p className="text-sm text-muted-foreground">
                Analyze water demands across major metropolitan regions
              </p>
            </button>

            <button
              onClick={() => navigate('/policy')}
              className="panel-elevated hover:border-primary/30 transition-all duration-300 group cursor-pointer text-left"
            >
              <FileText className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t('policySimulation')}
              </h3>
              <p className="text-sm text-muted-foreground">
                Simulate policy impacts before implementation
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
