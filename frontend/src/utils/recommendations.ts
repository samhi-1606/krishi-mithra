import { 
  WeatherData, 
  CropHealthGrid, 
  WaterRisk, 
  MarketPrice, 
  CalendarData, 
  Recommendation 
} from '../types';

export const generateRecommendations = (
  weather?: WeatherData,
  cropHealth?: CropHealthGrid,
  waterRisk?: WaterRisk,
  market?: MarketPrice[],
  calendar?: CalendarData
): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // Weather rules
  if (weather && weather.temp > 38) {
    recommendations.push({
      id: 'rec-heat',
      title: 'Extreme Heat Alert',
      description: 'Ensure adequate irrigation. High temperatures detected.',
      type: 'warning',
      priority: 'high'
    });
  }

  if (weather && weather.rainProbability > 80) {
    recommendations.push({
      id: 'rec-rain',
      title: 'Heavy Rain Expected',
      description: 'Postpone fertilizer application. Check farm drainage systems.',
      type: 'action',
      priority: 'high'
    });
  }

  // Crop Health & Weather Combo
  if (cropHealth && weather && weather.rainProbability > 60) {
    const unhealthyZones = cropHealth.zones.filter(z => z.status !== 'healthy');
    if (unhealthyZones.length > 0) {
      recommendations.push({
        id: 'rec-disease-rain',
        title: 'Disease Risk Mitigation',
        description: 'Inspect affected zones before rainfall to prevent disease spread.',
        type: 'action',
        priority: 'high'
      });
    }
  }

  // Water Risk
  if (waterRisk && waterRisk.riskLevel === 'high' && waterRisk.riskType === 'flood') {
    recommendations.push({
      id: 'rec-flood',
      title: 'Flood Risk Warning',
      description: 'Potential water risk from upstream. Monitor drainage and secure equipment.',
      type: 'warning',
      priority: 'high'
    });
  }

  // Market Trends
  if (market && market.length > 0) {
    const trendingUp = market.some(m => m.trend === 'up' && m.changePercentage > 5);
    if (trendingUp) {
      recommendations.push({
        id: 'rec-market',
        title: 'Favorable Market Prices',
        description: 'Market prices trending up. Consider optimal selling of harvested crops.',
        type: 'info',
        priority: 'medium'
      });
    }
  }

  // Calendar Events
  if (calendar && calendar.events) {
    const upcoming = calendar.events.filter(e => e.status === 'pending');
    if (upcoming.length > 0) {
      recommendations.push({
        id: 'rec-calendar',
        title: 'Upcoming Farm Activity',
        description: `Optimal window for: ${upcoming[0].title}.`,
        type: 'info',
        priority: 'medium'
      });
    }
  }

  return recommendations;
};
