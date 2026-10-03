import React, { useState } from 'react';
import { Bell, CloudRain, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const useLanguage = () => ({ t: (key: string) => key });

const demoNotifications = [
  { id: 1, type: 'weather', title: 'Heavy Rain Alert', desc: 'Expect heavy rainfall in your area tomorrow. Postpone fertilizer application.', time: '2 hours ago', icon: <CloudRain className="text-blue-500" />, color: 'blue', link: '/weather' },
  { id: 2, type: 'satellite', title: 'Possible Crop Stress', desc: 'Satellite imagery detected potential stress in Zone B7.', time: '5 hours ago', icon: <AlertTriangle className="text-red-500" />, color: 'red', link: '/farm-intelligence/satellite' },
  { id: 3, type: 'market', title: 'Price Surge', desc: 'Rice prices have increased by 2.5% in Warangal Mandi.', time: '1 day ago', icon: <TrendingUp className="text-green-500" />, color: 'green', link: '/mandi' },
];

export default function NotificationsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(demoNotifications);

  const clearAll = () => setNotifications([]);

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2"><Bell /> {t('Notifications')}</h1>
        {notifications.length > 0 && (
          <button onClick={clearAll} className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1">
            <CheckCircle size={16} /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center border">
          <Bell className="mx-auto text-gray-300 mb-2" size={48} />
          <p className="text-gray-500">No new notifications.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className={`bg-white border-l-4 border-${n.color}-500 p-4 rounded shadow-sm flex items-start gap-4`}>
              <div className={`p-2 bg-${n.color}-50 rounded-full shrink-0`}>
                {n.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800">{n.title}</h3>
                  <span className="text-xs text-gray-500">{n.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{n.desc}</p>
                <button 
                  onClick={() => navigate(n.link)}
                  className={`mt-2 text-xs font-semibold text-${n.color}-700 hover:underline`}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
