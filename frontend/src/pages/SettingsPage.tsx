import React from 'react';
import { Settings, User, Globe, Info } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useFarmer } from '../hooks/useFarmer';
import { supportedLanguages } from '../i18n';
import { demoFarmers } from '../data/demoData';

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { farmer, selectDemoFarmer } = useFarmer();

  return (
    <div className="p-4 space-y-6 animate-slide-up max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2"><Settings /> {t.settings}</h1>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        
        <div className="p-5 border-b">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Globe size={20} className="text-blue-500" /> {t.chooseLanguage}</h2>
          <select 
            className="w-full border p-2 rounded bg-gray-50"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {supportedLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">Changes apply immediately across the app.</p>
        </div>

        <div className="p-5 border-b">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><User size={20} className="text-green-500" /> {t.demoMode}</h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Demo Profile</label>
          <select 
            className="w-full border p-2 rounded bg-gray-50"
            value={demoFarmers.some(f => f.id === farmer?.id) ? farmer?.id : ''}
            onChange={e => selectDemoFarmer(e.target.value)}
          >
            {!demoFarmers.some(f => f.id === farmer?.id) && (
              <option value="">{farmer?.name || 'Custom profile'}</option>
            )}
            {demoFarmers.map(f => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.farmDetails.primaryCrop} farmer, {f.location.region})
              </option>
            ))}
          </select>
          
          {farmer && (
            <div className="mt-4 p-3 bg-gray-50 rounded border text-sm text-gray-700">
              <p><strong>Name:</strong> {farmer.name}</p>
              <p><strong>Location:</strong> {farmer.location.address}</p>
              <p><strong>Farm Size:</strong> {farmer.farmDetails.area} {t.acres}</p>
              <p><strong>Primary Crop:</strong> {farmer.farmDetails.primaryCrop}</p>
            </div>
          )}
        </div>

        <div className="p-5">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Info size={20} className="text-gray-500" /> App Information</h2>
          <div className="text-sm text-gray-600">
            <p>Krishi Mithra v1.0.0-beta</p>
            <p>© 2026 Farm Intelligence Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
}
