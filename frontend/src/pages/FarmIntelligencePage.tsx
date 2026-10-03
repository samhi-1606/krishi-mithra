import React from 'react';
import { Satellite, Plane, Camera, Scan, Activity } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigate } from 'react-router-dom';

export default function FarmIntelligencePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <h1 className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2"><Activity /> {t('Farm Intelligence')}</h1>

      <div className="bg-white p-5 rounded-lg shadow border">
        <h2 className="font-bold text-lg mb-2">Farm Health Overview</h2>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-green-600">85%</span>
          </div>
          <div>
            <p className="text-gray-600">Overall Health Score: <span className="font-bold text-green-600">Good</span></p>
            <p className="text-sm text-gray-500 mt-1">Last scan: Today, 09:30 AM</p>
            <p className="text-sm text-gray-500">1 potential issue detected in North Field.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div onClick={() => navigate('/farm/satellite')} className="card p-6 bg-white rounded-lg shadow border cursor-pointer hover:border-[#2E7D32] transition-colors flex flex-col items-center text-center gap-3">
          <div className="bg-blue-100 p-4 rounded-full"><Satellite size={32} className="text-blue-600" /></div>
          <h3 className="font-bold text-lg">Satellite Monitoring</h3>
          <p className="text-sm text-gray-600">Macro-level crop health analysis using NDVI imaging.</p>
        </div>

        <div onClick={() => navigate('/farm/drone')} className="card p-6 bg-white rounded-lg shadow border cursor-pointer hover:border-[#2E7D32] transition-colors flex flex-col items-center text-center gap-3">
          <div className="bg-purple-100 p-4 rounded-full"><Plane size={32} className="text-purple-600" /></div>
          <h3 className="font-bold text-lg">Drone Scan</h3>
          <p className="text-sm text-gray-600">High-resolution aerial imagery for precise issue detection.</p>
        </div>

        <div onClick={() => navigate('/farm/scan')} className="card p-6 bg-white rounded-lg shadow border cursor-pointer hover:border-[#2E7D32] transition-colors flex flex-col items-center text-center gap-3">
          <div className="bg-orange-100 p-4 rounded-full"><Scan size={32} className="text-orange-600" /></div>
          <h3 className="font-bold text-lg">Crop Image Scanner</h3>
          <p className="text-sm text-gray-600">Take a photo of a leaf to instantly identify diseases.</p>
        </div>

        <div onClick={() => navigate('/farm/cameras')} className="card p-6 bg-white rounded-lg shadow border cursor-pointer hover:border-[#2E7D32] transition-colors flex flex-col items-center text-center gap-3">
          <div className="bg-teal-100 p-4 rounded-full"><Camera size={32} className="text-teal-600" /></div>
          <h3 className="font-bold text-lg">Field CCTV</h3>
          <p className="text-sm text-gray-600">24/7 monitoring of your fields via installed cameras.</p>
        </div>
      </div>
    </div>
  );
}
