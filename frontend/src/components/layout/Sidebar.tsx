import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, Sprout, Droplets, Cloud, FileText, Calendar, Bot, Settings } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const Sidebar: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    { name: t.home, path: '/', icon: Home, end: true },
    { name: t.mandi, path: '/mandi', icon: BarChart3 },
    { name: t.farmIntelligence, path: '/farm', icon: Sprout },
    { name: t.waterIntelligence, path: '/water', icon: Droplets },
    { name: t.weather, path: '/weather', icon: Cloud },
    { name: t.schemes, path: '/schemes', icon: FileText },
    { name: t.cropCalendar, path: '/calendar', icon: Calendar },
    { name: t.bhumi, path: '/bhumi', icon: Bot },
    { name: t.settings, path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Logo in sidebar */}
      <div className="flex items-center px-4 py-5 border-b border-gray-100">
        <span className="text-2xl mr-2">🌾</span>
        <span className="font-bold text-[#2E7D32] text-lg tracking-tight">KRISHI MITHRA</span>
      </div>
      
      <div className="flex-1 flex flex-col pt-4 pb-4 overflow-y-auto">
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#E8F5E9] text-[#2E7D32] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
