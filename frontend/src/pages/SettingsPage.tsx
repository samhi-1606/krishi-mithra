import React, { useState } from 'react';
import { Settings, User, Globe, Info, Save } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const [demoFarmer, setDemoFarmer] = useState('1');

  return (
    <div className="p-4 space-y-6 animate-slide-up max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2"><Settings /> {t.settings}</h1>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        
        <div className="p-5 border-b">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Globe size={20} className="text-blue-500" /> {t('Language Preferences')}</h2>
          <select 
            className="w-full border p-2 rounded bg-gray-50"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            <option value="en">{t('English')}</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="hi">हिंदी (Hindi)</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">{t('Changes apply immediately across the app.')}</p>
        </div>

        <div className="p-5 border-b">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><User size={20} className="text-green-500" /> {t('Profile & Demo Data')}</h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('Select Demo Profile')}</label>
          <select 
            className="w-full border p-2 rounded bg-gray-50"
            value={demoFarmer}
            onChange={e => setDemoFarmer(e.target.value)}
          >
            <option value="1">Ramesh ({t('Rice Farmer')}, వరంగల్)</option>
            <option value="2">Suresh ({t('Cotton Farmer')}, కరీంనగర్)</option>
          </select>
          
          <div className="mt-4 p-3 bg-gray-50 rounded border text-sm text-gray-700">
            <p><strong>{t('Name:')}</strong> Ramesh</p>
            <p><strong>{t('Location:')}</strong> Warangal, Telangana</p>
            <p><strong>{t('Farm Size:')}</strong> 4.5 {t.acres}</p>
            <p><strong>{t('Primary Crop:')}</strong> {t('Rice')}</p>
          </div>
        </div>

        <div className="p-5">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Info size={20} className="text-gray-500" /> {t('App Information')}</h2>
          <div className="text-sm text-gray-600">
            <p>Krishi Mithra v1.0.0-beta</p>
            <p>© 2026 {t.farmIntelligence}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 border-t flex justify-end">
          <button className="bg-[#2E7D32] text-white px-6 py-2 rounded font-bold flex items-center gap-2 hover:bg-green-700 transition">
            <Save size={18} /> {t('Save Settings')}
          </button>
        </div>
      </div>
    </div>
  );
}
