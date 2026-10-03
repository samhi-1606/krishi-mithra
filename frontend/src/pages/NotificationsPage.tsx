import React from 'react';
import { Bell, CloudRain, AlertTriangle, TrendingUp, Droplets, Info, CheckCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { useAlerts } from '../hooks/useAlerts';
import { Alert } from '../types';
import { formatDate } from '../utils/formatters';

// Tailwind only ships classes it finds as complete strings, so these cannot be interpolated.
const TYPE_STYLES: Record<Alert['type'], { border: string; bg: string; text: string; icon: React.ReactNode; link: string }> = {
  weather: { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', icon: <CloudRain className="text-blue-500" />, link: '/weather' },
  disease: { border: 'border-red-500', bg: 'bg-red-50', text: 'text-red-700', icon: <AlertTriangle className="text-red-500" />, link: '/farm/satellite' },
  water: { border: 'border-cyan-500', bg: 'bg-cyan-50', text: 'text-cyan-700', icon: <Droplets className="text-cyan-500" />, link: '/water' },
  market: { border: 'border-green-500', bg: 'bg-green-50', text: 'text-green-700', icon: <TrendingUp className="text-green-500" />, link: '/mandi' },
  system: { border: 'border-gray-400', bg: 'bg-gray-50', text: 'text-gray-700', icon: <Info className="text-gray-500" />, link: '/' },
};

export default function NotificationsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { alerts, unreadCount, markRead, markAllRead } = useAlerts();

  const openAlert = (alert: Alert) => {
    markRead(alert.id);
    navigate(alert.actionLink || TYPE_STYLES[alert.type].link);
  };

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2"><Bell /> {t.notifications}</h1>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1">
            <CheckCircle size={16} /> {t.markAsRead}
          </button>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center border">
          <Bell className="mx-auto text-gray-300 mb-2" size={48} />
          <p className="text-gray-500">{t.noAlerts}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map(alert => {
            const style = TYPE_STYLES[alert.type] ?? TYPE_STYLES.system;
            return (
              <div
                key={alert.id}
                className={`bg-white border-l-4 ${style.border} p-4 rounded shadow-sm flex items-start gap-4 ${alert.read ? 'opacity-60' : ''}`}
              >
                <div className={`p-2 ${style.bg} rounded-full shrink-0`}>
                  {style.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-gray-800">
                      {alert.title}
                      {!alert.read && <span className="ml-2 align-middle inline-block w-2 h-2 rounded-full bg-red-500" />}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{formatDate(alert.date)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <button
                    onClick={() => openAlert(alert)}
                    className={`mt-2 text-xs font-semibold ${style.text} hover:underline`}
                  >
                    {t.viewDetails} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
