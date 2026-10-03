import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, Sprout, Droplets, Bot } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const BottomNav: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    { name: t.home, path: '/', icon: Home, end: true },
    { name: t.mandi, path: '/mandi', icon: BarChart3 },
    { name: t.farm, path: '/farm', icon: Sprout },
    { name: t.water, path: '/water', icon: Droplets },
    { name: t.bhumi, path: '/bhumi', icon: Bot },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-16 z-50 safe-bottom">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-200 ${
              isActive ? 'text-[#2E7D32] bg-[#E8F5E9]' : 'text-gray-400 hover:text-gray-600'
            }`
          }
        >
          <item.icon className="h-5 w-5" />
          <span className="text-[10px] font-medium">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
