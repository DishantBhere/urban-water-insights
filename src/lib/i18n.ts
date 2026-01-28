export type Language = 'en' | 'hi' | 'mr';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    scenarioSimulator: 'Scenario Simulator',
    regionalPlanning: 'Regional Planning',
    policySimulation: 'Policy Simulation',
    
    // Home
    heroTitle: 'Urban Water Intelligence',
    heroSubtitle: 'Smart City Water Demand Forecasting & Decision Support',
    runForecast: 'Run Forecast',
    viewRegionalPlanning: 'View Regional Planning',
    systemOnline: 'System Online',
    systemOffline: 'System Offline',
    speakAlerts: 'Speak Alerts',
    
    // Features
    featureForecasting: 'AI-Powered Forecasting',
    featureForecastingDesc: 'Advanced machine learning models predict water demand with high accuracy',
    featureAlerts: 'Real-time Alerts',
    featureAlertsDesc: 'Instant notifications for critical water management decisions',
    featureAnalytics: 'Regional Analytics',
    featureAnalyticsDesc: 'Comprehensive analysis across multiple urban regions',
    featurePolicy: 'Policy Simulation',
    featurePolicyDesc: 'Test policy impacts before implementation',
    
    // Scenario Simulator
    forecastDuration: 'Forecast Duration',
    days: 'days',
    avgTemperature: 'Average Temperature',
    rainfall: 'Rainfall',
    populationIndex: 'Population Index',
    industrialIndex: 'Industrial Index',
    populationGrowth: 'Population Growth',
    industrialSurge: 'Industrial Surge',
    festivalPeriod: 'Festival Period',
    heatwaveActive: 'Heatwave Active',
    reset: 'Reset',
    language: 'Language',
    
    // Results
    forecastResults: 'Forecast Results',
    waterDemand: 'Water Demand (ML/day)',
    alerts: 'Alerts',
    recommendations: 'Recommendations',
    noAlerts: 'No alerts at this time',
    noRecommendations: 'No recommendations at this time',
    loading: 'Loading...',
    error: 'Error fetching data',
    
    // Regional
    selectRegion: 'Select Region',
    basePopulation: 'Base Population',
    baseCapacity: 'Base Capacity',
    industrialLoad: 'Industrial Load',
    million: 'million',
    mlDay: 'ML/day',
    
    // Policy
    supplyAugmentation: 'Supply Augmentation',
    waterRationing: 'Water Rationing',
    priceIncrease: 'Price Increase',
    baseline: 'Baseline',
    policyAdjusted: 'Policy Adjusted',
    shortageReduction: 'Shortage Reduction',
    demandReduction: 'Demand Reduction',
    revenueImpact: 'Revenue Impact',
    exportJson: 'Export JSON',
    exportCsv: 'Export CSV',
  },
  hi: {
    // Navigation
    home: 'होम',
    scenarioSimulator: 'परिदृश्य सिम्युलेटर',
    regionalPlanning: 'क्षेत्रीय योजना',
    policySimulation: 'नीति सिमुलेशन',
    
    // Home
    heroTitle: 'शहरी जल बुद्धिमत्ता',
    heroSubtitle: 'स्मार्ट सिटी जल मांग पूर्वानुमान और निर्णय समर्थन',
    runForecast: 'पूर्वानुमान चलाएं',
    viewRegionalPlanning: 'क्षेत्रीय योजना देखें',
    systemOnline: 'सिस्टम ऑनलाइन',
    systemOffline: 'सिस्टम ऑफलाइन',
    speakAlerts: 'अलर्ट बोलें',
    
    // Features
    featureForecasting: 'AI-संचालित पूर्वानुमान',
    featureForecastingDesc: 'उन्नत मशीन लर्निंग मॉडल उच्च सटीकता के साथ जल मांग की भविष्यवाणी करते हैं',
    featureAlerts: 'रीयल-टाइम अलर्ट',
    featureAlertsDesc: 'महत्वपूर्ण जल प्रबंधन निर्णयों के लिए तत्काल सूचनाएं',
    featureAnalytics: 'क्षेत्रीय विश्लेषण',
    featureAnalyticsDesc: 'कई शहरी क्षेत्रों में व्यापक विश्लेषण',
    featurePolicy: 'नीति सिमुलेशन',
    featurePolicyDesc: 'कार्यान्वयन से पहले नीति प्रभावों का परीक्षण करें',
    
    // Scenario Simulator
    forecastDuration: 'पूर्वानुमान अवधि',
    days: 'दिन',
    avgTemperature: 'औसत तापमान',
    rainfall: 'वर्षा',
    populationIndex: 'जनसंख्या सूचकांक',
    industrialIndex: 'औद्योगिक सूचकांक',
    populationGrowth: 'जनसंख्या वृद्धि',
    industrialSurge: 'औद्योगिक उछाल',
    festivalPeriod: 'त्योहार अवधि',
    heatwaveActive: 'हीटवेव सक्रिय',
    reset: 'रीसेट',
    language: 'भाषा',
    
    // Results
    forecastResults: 'पूर्वानुमान परिणाम',
    waterDemand: 'जल मांग (ML/दिन)',
    alerts: 'अलर्ट',
    recommendations: 'सिफारिशें',
    noAlerts: 'इस समय कोई अलर्ट नहीं',
    noRecommendations: 'इस समय कोई सिफारिश नहीं',
    loading: 'लोड हो रहा है...',
    error: 'डेटा प्राप्त करने में त्रुटि',
    
    // Regional
    selectRegion: 'क्षेत्र चुनें',
    basePopulation: 'आधार जनसंख्या',
    baseCapacity: 'आधार क्षमता',
    industrialLoad: 'औद्योगिक भार',
    million: 'मिलियन',
    mlDay: 'ML/दिन',
    
    // Policy
    supplyAugmentation: 'आपूर्ति वृद्धि',
    waterRationing: 'जल राशनिंग',
    priceIncrease: 'मूल्य वृद्धि',
    baseline: 'बेसलाइन',
    policyAdjusted: 'नीति समायोजित',
    shortageReduction: 'कमी में कमी',
    demandReduction: 'मांग में कमी',
    revenueImpact: 'राजस्व प्रभाव',
    exportJson: 'JSON निर्यात',
    exportCsv: 'CSV निर्यात',
  },
  mr: {
    // Navigation
    home: 'मुख्यपृष्ठ',
    scenarioSimulator: 'परिस्थिती सिम्युलेटर',
    regionalPlanning: 'प्रादेशिक नियोजन',
    policySimulation: 'धोरण सिम्युलेशन',
    
    // Home
    heroTitle: 'शहरी जल बुद्धिमत्ता',
    heroSubtitle: 'स्मार्ट सिटी पाणी मागणी अंदाज आणि निर्णय समर्थन',
    runForecast: 'अंदाज चालवा',
    viewRegionalPlanning: 'प्रादेशिक नियोजन पहा',
    systemOnline: 'सिस्टम ऑनलाइन',
    systemOffline: 'सिस्टम ऑफलाइन',
    speakAlerts: 'अलर्ट बोला',
    
    // Features
    featureForecasting: 'AI-चालित अंदाज',
    featureForecastingDesc: 'प्रगत मशीन लर्निंग मॉडेल उच्च अचूकतेसह पाणी मागणीचा अंदाज करतात',
    featureAlerts: 'रिअल-टाइम अलर्ट',
    featureAlertsDesc: 'महत्त्वाच्या जल व्यवस्थापन निर्णयांसाठी त्वरित सूचना',
    featureAnalytics: 'प्रादेशिक विश्लेषण',
    featureAnalyticsDesc: 'अनेक शहरी प्रदेशांमध्ये सर्वसमावेशक विश्लेषण',
    featurePolicy: 'धोरण सिम्युलेशन',
    featurePolicyDesc: 'अंमलबजावणीपूर्वी धोरण प्रभावांची चाचणी घ्या',
    
    // Scenario Simulator
    forecastDuration: 'अंदाज कालावधी',
    days: 'दिवस',
    avgTemperature: 'सरासरी तापमान',
    rainfall: 'पाऊस',
    populationIndex: 'लोकसंख्या निर्देशांक',
    industrialIndex: 'औद्योगिक निर्देशांक',
    populationGrowth: 'लोकसंख्या वाढ',
    industrialSurge: 'औद्योगिक वाढ',
    festivalPeriod: 'सण कालावधी',
    heatwaveActive: 'उष्णतेची लाट सक्रिय',
    reset: 'रीसेट',
    language: 'भाषा',
    
    // Results
    forecastResults: 'अंदाज परिणाम',
    waterDemand: 'पाणी मागणी (ML/दिवस)',
    alerts: 'अलर्ट',
    recommendations: 'शिफारशी',
    noAlerts: 'या वेळी कोणतेही अलर्ट नाहीत',
    noRecommendations: 'या वेळी कोणत्याही शिफारशी नाहीत',
    loading: 'लोड होत आहे...',
    error: 'डेटा मिळवण्यात त्रुटी',
    
    // Regional
    selectRegion: 'प्रदेश निवडा',
    basePopulation: 'आधार लोकसंख्या',
    baseCapacity: 'आधार क्षमता',
    industrialLoad: 'औद्योगिक भार',
    million: 'दशलक्ष',
    mlDay: 'ML/दिवस',
    
    // Policy
    supplyAugmentation: 'पुरवठा वाढ',
    waterRationing: 'पाणी रेशनिंग',
    priceIncrease: 'किंमत वाढ',
    baseline: 'बेसलाइन',
    policyAdjusted: 'धोरण समायोजित',
    shortageReduction: 'तुटवड्यात कपात',
    demandReduction: 'मागणीत कपात',
    revenueImpact: 'महसूल प्रभाव',
    exportJson: 'JSON निर्यात',
    exportCsv: 'CSV निर्यात',
  },
};

export function getTranslation(lang: Language, key: keyof typeof translations['en']): string {
  return translations[lang][key] || translations['en'][key];
}

export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
};

export const speechLanguageCodes: Record<Language, string> = {
  en: 'en-US',
  hi: 'hi-IN',
  mr: 'mr-IN',
};
