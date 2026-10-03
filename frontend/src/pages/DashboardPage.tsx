import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Cloud, CloudRain, Droplets, MapPin, 
  Wind, TrendingUp, AlertTriangle, AlertCircle, Info,
  Satellite, ScanLine, BarChart3, Droplet, Bot
} from 'lucide-react';
import { useFarmer } from '../hooks/useFarmer';
import { useLanguage } from '../hooks/useLanguage';
import { useAlerts } from '../hooks/useAlerts';

const DashboardPage: React.FC = () => {
  const { farmer } = useFarmer();
  const { t } = useLanguage();
  const { alerts } = useAlerts();

  // Helper to get alert icon based on severity
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-5 w-5 text-white" />;
      case 'medium': return <AlertCircle className="h-5 w-5 text-white" />;
      default: return <Info className="h-5 w-5 text-white" />;
    }
  };

  // Helper for alert colors
  const getAlertStyle = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-[#D32F2F] text-white';
      case 'medium': return 'bg-[#F57C00] text-white';
      case 'low': return 'bg-[#F9A825] text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-slide-up pb-24 md:pb-8">
      {/* a) Hero Greeting */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t.namaste}, {farmer?.name} 👋
        </h1>
        <p className="text-sm text-gray-600 mt-1 flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-[#2E7D32]" />
          {farmer?.farmDetails?.area} {t.acres} • {farmer?.farmDetails?.primaryCrop}
        </p>
      </section>

      {/* Grid for top section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* b) Farm Copilot Card */}
        <div className="card md:col-span-2 p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="section-title text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Bot className="h-6 w-6 mr-2 text-[#2E7D32]" />
              {t.yourFarmToday}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t.farmHealth}</p>
                <div className="flex items-center">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-[#2E7D32] w-[82%]"></div>
                  </div>
                  <span className="font-bold text-sm">82%</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t.weatherRisk}</p>
                <p className="font-semibold text-sm text-[#F57C00]">{t.moderate}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t.waterRisk}</p>
                <p className="font-semibold text-sm text-[#2E7D32]">{t.low}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t.market}</p>
                <p className="font-semibold text-sm text-[#2E7D32] flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> 4.2%
                </p>
              </div>
            </div>
            <div className="mb-2">
              <span className="badge-warning text-xs font-semibold px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                {t('3 things need attention')}
              </span>
            </div>
          </div>
          <div className="bg-[#FAF7EF] p-4 rounded-lg border border-[#E8F5E9]">
            <p className="text-sm font-medium text-gray-800 flex items-start">
              <span className="text-xl mr-2">💡</span>
              <span><strong>{t.bhumiRecommends}:</strong> {t("Inspect Zone B7 before tomorrow's rain.")}</span>
            </p>
          </div>
        </div>

        {/* c) Farm Health Hero Card */}
        <div className="card p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <h3 className="font-semibold text-gray-700 w-full text-left mb-4">{t('Overall Farm Health')}</h3>
          <div className="relative w-32 h-32 mb-4">
            {/* Simple circular progress visualization */}
            <svg viewBox="0 0 36 36" className="w-32 h-32">
              <path
                className="text-gray-200"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#2E7D32]"
                strokeWidth="3"
                strokeDasharray="82, 100"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-2xl font-bold text-gray-800">82%</span>
            </div>
          </div>
          <span className="text-[#2E7D32] font-semibold mb-4 bg-[#E8F5E9] px-3 py-1 rounded-full text-sm">{t.healthy}</span>
          
          <div className="w-full text-xs text-gray-600 flex justify-between mb-4">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#2E7D32] mr-1"></span>82%</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#F9A825] mr-1"></span>11%</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#D32F2F] mr-1"></span>7%</span>
          </div>

          <Link to="/farm/satellite" className="w-full text-center text-[#2E7D32] font-medium hover:underline flex justify-center items-center">
            View Farm Health <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* d) Needs Your Attention */}
      <section>
        <h2 className="section-title text-lg font-bold text-gray-800 mb-4">{t.needsAttention}</h2>
        <div className="space-y-3">
          {alerts && alerts.length > 0 ? (
            alerts.slice(0, 3).map((alert: any) => (
              <div key={alert.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start sm:items-center flex-col sm:flex-row gap-4">
                <div className={`p-2 rounded-full flex-shrink-0 ${getAlertStyle(alert.severity)}`}>
                  {getAlertIcon(alert.severity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900">{t(alert.title)}</h4>
                    {alert.confidence && (
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {alert.confidence}% {t('confidence')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{t(alert.description || alert.message || '')}</p>
                </div>
                <Link to={alert.actionLink || '#'} className="btn-outline flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 flex items-center w-full sm:w-auto justify-center">
                  {alert.actionText || t.view} <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))
          ) : (
            <>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start sm:items-center flex-col sm:flex-row gap-4">
                <div className="p-2 rounded-full flex-shrink-0 bg-[#D32F2F] text-white">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900">{t.possibleDisease}</h4>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">91% {t('confidence')}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{t('Detected in Zone B7')}</p>
                </div>
                <Link to="/farm/scan" className="btn-outline flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 flex items-center w-full sm:w-auto justify-center">
                  {t.inspect} <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start sm:items-center flex-col sm:flex-row gap-4">
                <div className="p-2 rounded-full flex-shrink-0 bg-[#F57C00] text-white">
                  <CloudRain className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900">{t('Heavy rainfall expected')}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{t('Forecasted for next 48 hours')}</p>
                </div>
                <Link to="/weather" className="btn-outline flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 flex items-center w-full sm:w-auto justify-center">
                  {t.prepare} <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start sm:items-center flex-col sm:flex-row gap-4">
                <div className="p-2 rounded-full flex-shrink-0 bg-[#F9A825] text-white">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900">{t('Water risk monitoring')}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{t('Upstream dam activity detected')}</p>
                </div>
                <Link to="/water" className="btn-outline flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 flex items-center w-full sm:w-auto justify-center">
                  {t.view} <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* e) Quick Actions */}
      <section>
        <h2 className="section-title text-lg font-bold text-gray-800 mb-4">{t.quickActions}</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          <Link to="/farm/satellite" className="card-hover flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#2E7D32] transition-colors">
            <div className="bg-[#E8F5E9] p-3 rounded-full mb-2">
              <Satellite className="h-6 w-6 text-[#2E7D32]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-center text-gray-700">{t.scanFarm}</span>
          </Link>
          <Link to="/farm/scan" className="card-hover flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#2E7D32] transition-colors">
            <div className="bg-[#E8F5E9] p-3 rounded-full mb-2">
              <ScanLine className="h-6 w-6 text-[#2E7D32]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-center text-gray-700">{t.scanCrop}</span>
          </Link>
          <Link to="/weather" className="card-hover flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#2E7D32] transition-colors">
            <div className="bg-[#E8F5E9] p-3 rounded-full mb-2">
              <Cloud className="h-6 w-6 text-[#2E7D32]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-center text-gray-700">{t.weather}</span>
          </Link>
          <Link to="/mandi" className="card-hover flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#2E7D32] transition-colors">
            <div className="bg-[#E8F5E9] p-3 rounded-full mb-2">
              <BarChart3 className="h-6 w-6 text-[#2E7D32]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-center text-gray-700">{t.mandi}</span>
          </Link>
          <Link to="/water" className="card-hover flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#2E7D32] transition-colors">
            <div className="bg-[#E8F5E9] p-3 rounded-full mb-2">
              <Droplet className="h-6 w-6 text-[#2E7D32]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-center text-gray-700">{t.waterRisk}</span>
          </Link>
          <Link to="/bhumi" className="card-hover flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#2E7D32] transition-colors">
            <div className="bg-[#E8F5E9] p-3 rounded-full mb-2">
              <Bot className="h-6 w-6 text-[#2E7D32]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-center text-gray-700">{t.askBhumi}</span>
          </Link>
        </div>
      </section>

      {/* f & g) Preview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* f) Weather Preview */}
        <div className="card p-5 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 flex items-center">
              <Cloud className="h-5 w-5 mr-2 text-[#2E7D32]" /> {t("Today's Weather")}
            </h3>
            <Link to="/weather" className="text-sm text-[#2E7D32] hover:underline">{t('Full Forecast')}</Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Cloud className="h-12 w-12 text-gray-400 mr-4" />
              <div>
                <p className="text-3xl font-bold text-gray-900">32°C</p>
                <p className="text-sm text-gray-500">{t('Partly Cloudy')}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Droplets className="h-4 w-4 mr-2 text-blue-500" /> 65% {t.humidity}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Wind className="h-4 w-4 mr-2 text-gray-400" /> 12 km/h {t.wind}
              </div>
            </div>
          </div>
        </div>

        {/* g) Market Preview */}
        <div className="card p-5 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-[#2E7D32]" /> {t.mandiPrices}
            </h3>
            <Link to="/mandi" className="text-sm text-[#2E7D32] hover:underline">{t('View All')}</Link>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('Best price for')} {farmer?.farmDetails?.primaryCrop || t('Cotton')}</p>
            <div className="flex items-end mb-2">
              <span className="text-3xl font-bold text-gray-900">₹7,450</span>
              <span className="text-sm text-gray-500 ml-2 mb-1">{t('/ quintal')}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-[#2E7D32] flex items-center font-medium bg-[#E8F5E9] px-2 py-0.5 rounded">
                <TrendingUp className="h-3 w-3 mr-1" /> +120
              </span>
              <span className="text-gray-500 ml-2">{t('vs yesterday in local mandi')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* h) Demo Mode Badge */}
      <div className="mt-8 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200">
        <span className="text-xs font-bold tracking-wider text-gray-500 mb-2">{t.demoMode}</span>
        <button className="text-sm text-[#2E7D32] font-medium hover:underline focus:outline-none">
          {t.loadDemoScenario}
        </button>
      </div>

    </div>
  );
};

export default DashboardPage;
