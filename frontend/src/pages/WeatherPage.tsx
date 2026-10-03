import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Wind, Droplets, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const demoForecast = [
  { day: 'Mon', high: 35, low: 24, rain: 10, humidity: 60, wind: 12 },
  { day: 'Tue', high: 36, low: 25, rain: 5, humidity: 55, wind: 14 },
  { day: 'Wed', high: 34, low: 23, rain: 80, humidity: 85, wind: 20 },
  { day: 'Thu', high: 31, low: 22, rain: 90, humidity: 90, wind: 25 },
  { day: 'Fri', high: 33, low: 23, rain: 40, humidity: 70, wind: 15 },
  { day: 'Sat', high: 35, low: 24, rain: 10, humidity: 65, wind: 10 },
];

export default function WeatherPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="p-4">{t('Checking weather...')}</div>;

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <h1 className="text-2xl font-bold text-[#2E7D32]">{t('Weather Forecast')}</h1>

      <div className="bg-[#D32F2F] text-white p-4 rounded-lg flex items-center gap-3 shadow-md">
        <AlertTriangle />
        <div>
          <h4 className="font-bold">{t('Heavy Rain Alert')}</h4>
          <p className="text-sm">{t('Expect heavy rainfall (80% probability) on Wednesday. Secure harvested crops.')}</p>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold">35°C</h2>
          <p className="text-lg opacity-90">{t('Partly Cloudy')}</p>
          <p className="text-sm opacity-80 mt-2">వరంగల్, తెలంగాణ</p>
        </div>
        <Sun size={64} className="text-yellow-300" />
      </div>

      <h3 className="font-bold text-lg mt-6">{t('6-Day Forecast')}</h3>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {demoForecast.map((day, i) => (
          <div key={i} className="min-w-[140px] card bg-white p-4 rounded-lg shadow border flex flex-col items-center shrink-0">
            <h4 className="font-bold text-gray-700">{t(day.day)}</h4>
            {day.rain > 50 ? <CloudRain className="text-blue-500 my-2" /> : <Sun className="text-yellow-500 my-2" />}
            <div className="flex gap-2 font-bold text-lg">
              <span>{day.high}°</span>
              <span className="text-gray-400">{day.low}°</span>
            </div>
            <div className="mt-3 text-xs text-gray-600 space-y-1 w-full">
              <p className="flex justify-between"><span className="flex items-center gap-1"><Droplets size={12} /> {t('Rain')}</span> <span>{day.rain}%</span></p>
              <p className="flex justify-between"><span className="flex items-center gap-1"><Wind size={12} /> {t.wind}</span> <span>{day.wind} km/h</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
