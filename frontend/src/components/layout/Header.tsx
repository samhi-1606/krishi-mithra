import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Globe, Bell, User, Menu } from 'lucide-react';
import { useFarmer } from '../../hooks/useFarmer';
import { useAlerts } from '../../hooks/useAlerts';
import { useLanguage } from '../../hooks/useLanguage';
import { languages } from '../../i18n';
import LanguageSelector from '../common/LanguageSelector';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { farmer } = useFarmer();
  const { unreadCount } = useAlerts();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const currentLangObj = languages.find(l => l.code === language);

  return (
    <>
      <header className="bg-white shadow-sm z-10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center">
              <button 
                onClick={onMenuClick}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none mr-2"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl mr-2">🌾</span>
                <span className="font-bold text-[#2E7D32] text-xl tracking-tight hidden sm:block">KRISHI MITHRA</span>
              </div>
            </div>

            {/* Center: Location */}
            {farmer && (
              <div className="hidden sm:flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                <MapPin className="h-4 w-4 mr-1 text-[#2E7D32]" />
                <span className="truncate max-w-[200px]">
                  {farmer.location?.address || 'India'}
                </span>
              </div>
            )}

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button 
                onClick={() => setIsLangModalOpen(true)}
                className="flex items-center text-sm text-gray-700 hover:text-[#2E7D32] transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100"
              >
                <Globe className="h-5 w-5 mr-1 text-[#2E7D32]" />
                <span className="hidden sm:inline">{currentLangObj?.nativeName || 'English'}</span>
              </button>

              <button
                onClick={() => navigate('/notifications')}
                className="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold text-center leading-4 ring-2 ring-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {farmer && (
                <button
                  onClick={() => navigate('/settings')}
                  className="flex items-center text-sm focus:outline-none rounded-full bg-[#E8F5E9] p-1.5"
                >
                  <User className="h-5 w-5 text-[#2E7D32]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {isLangModalOpen && (
        <LanguageSelector onClose={() => setIsLangModalOpen(false)} />
      )}
    </>
  );
};

export default Header;
