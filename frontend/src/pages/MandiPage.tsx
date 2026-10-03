import React, { useState, useEffect } from 'react';
import { Search, MapPin, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../hooks/useLanguage';

// Mock hooks
const useFarmer = () => ({ farmer: { crop: 'Rice' } });
const useAlerts = () => ({ alerts: [], addAlert: () => {} });

const demoData = [
  { id: 1, crop: 'Rice', market: 'Warangal', district: 'Warangal', price: 2100, date: '2023-10-01', trend: 'up', emoji: '🌾' },
  { id: 2, crop: 'Cotton', market: 'Karimnagar', district: 'Karimnagar', price: 7200, date: '2023-10-01', trend: 'down', emoji: '☁️' },
  { id: 3, crop: 'Maize', market: 'Nizamabad', district: 'Nizamabad', price: 1800, date: '2023-10-01', trend: 'up', emoji: '🌽' },
];

const chartData = [
  { name: 'Mon', price: 2000 },
  { name: 'Tue', price: 2050 },
  { name: 'Wed', price: 2100 },
  { name: 'Thu', price: 2080 },
  { name: 'Fri', price: 2120 },
];

export default function MandiPage() {
  const { t } = useLanguage();
  const { farmer } = useFarmer();
  const [loading, setLoading] = useState(true);
  const [filterCrop, setFilterCrop] = useState('All');
  const [filterDistrict, setFilterDistrict] = useState('All');
  const [filterMarket, setFilterMarket] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="p-4">{t('Loading...')}</div>;

  const filteredData = demoData.filter(d => 
    (filterCrop === 'All' || d.crop === filterCrop) &&
    (filterDistrict === 'All' || d.district === filterDistrict)
  );

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <h1 className="text-2xl font-bold text-[#2E7D32]">{t.mandiPrices}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select className="select-field border p-2 rounded" value={filterCrop} onChange={e => setFilterCrop(e.target.value)}>
          <option value="All">{t.allCrops}</option>
          <option value="Rice">{t('Rice')}</option>
          <option value="Cotton">{t('Cotton')}</option>
          <option value="Maize">{t('Maize')}</option>
          <option value="Chilli">{t('Chilli')}</option>
          <option value="Tomato">{t('Tomato')}</option>
          <option value="Turmeric">{t('Turmeric')}</option>
        </select>
        <select className="select-field border p-2 rounded" value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)}>
          <option value="All">{t.allDistricts}</option>
          <option value="Warangal">వరంగల్</option>
          <option value="Karimnagar">కరీంనగర్</option>
          <option value="Nizamabad">నిజామాబాద్</option>
          <option value="Hyderabad">హైదరాబాద్</option>
          <option value="Khammam">ఖమ్మం</option>
        </select>
        <select className="select-field border p-2 rounded" value={filterMarket} onChange={e => setFilterMarket(e.target.value)}>
          <option value="All">{t.allMarkets}</option>
        </select>
      </div>

      <div className="card p-4 bg-[#FAF7EF] border-l-4 border-[#2E7D32] rounded shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2"><Star className="text-[#F9A825]" /> {t.bestNearbyPrice} - {t(farmer.crop)}</h2>
            <p className="text-2xl font-bold text-[#2E7D32]">₹2120/{t.perQuintal}</p>
            <p className="flex items-center text-sm text-green-600"><TrendingUp size={16} /> {t('2.5% vs yesterday')}</p>
          </div>
          <div className="w-32 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="price" stroke="#2E7D32" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map(item => (
          <div key={item.id} className="card card-hover p-4 border rounded shadow flex justify-between items-center bg-white">
            <div>
              <h3 className="font-bold text-lg">{item.emoji} {t(item.crop)}</h3>
              <p className="text-sm text-gray-600"><MapPin size={14} className="inline" /> {item.market}, {item.district}</p>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">₹{item.price}/{t.perQuintal}</p>
              <p className={`flex items-center justify-end text-sm ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {item.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-4 bg-white border rounded shadow h-64">
        <h3 className="font-bold mb-4">{t.trend}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="price" stroke="#2E7D32" fill="#2E7D32" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
