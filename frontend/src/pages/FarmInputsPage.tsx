import React, { useState } from 'react';
import { Package, Sprout, TestTube, Bug } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function FarmInputsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('seeds');

  const tabs = [
    { id: 'seeds', label: t.seeds, icon: <Package size={18} /> },
    { id: 'soil', label: t('Soil Health'), icon: <TestTube size={18} /> },
    { id: 'fertilizer', label: t.fertilizer, icon: <Sprout size={18} /> },
    { id: 'pest', label: t.pestControl, icon: <Bug size={18} /> },
  ];

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <h1 className="text-2xl font-bold text-[#2E7D32]">{t.farmInputs}</h1>

      <div className="flex border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id ? 'border-b-2 border-[#2E7D32] text-[#2E7D32]' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm border min-h-[300px]">
        {activeTab === 'seeds' && (
          <div className="space-y-4 animate-slide-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <select className="border p-2 rounded"><option>{t('Crop: Rice')}</option></select>
              <select className="border p-2 rounded"><option>{t('Region: Telangana')}</option></select>
              <select className="border p-2 rounded"><option>{t('Season: Kharif')}</option></select>
              <select className="border p-2 rounded"><option>{t('Soil: Black')}</option></select>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg bg-green-50">
                <h3 className="font-bold text-lg text-green-800">BPT 5204 (Samba Mahsuri)</h3>
                <p className="text-sm text-gray-700 mt-2">{t('High yielding, fine grain variety. Duration: 145-150 days. Resistant to Leaf folder.')}</p>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg">MTU 1010 (Cottondora Sannalu)</h3>
                <p className="text-sm text-gray-600 mt-2">{t('Short duration (120 days). Drought tolerant. Good for delayed monsoon.')}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'soil' && (
          <div className="space-y-4 animate-slide-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="text-xs text-gray-500">{t('pH Level')}</label>
                <input type="number" defaultValue="6.5" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="text-xs text-gray-500">{t('Nitrogen (N)')}</label>
                <input type="number" defaultValue="250" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="text-xs text-gray-500">{t('Phosphorus (P)')}</label>
                <input type="number" defaultValue="15" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="text-xs text-gray-500">{t('Potassium (K)')}</label>
                <input type="number" defaultValue="180" className="border p-2 rounded w-full" />
              </div>
            </div>
            <button className="bg-[#2E7D32] text-white px-4 py-2 rounded">{t('Analyze Soil')}</button>
            
            <div className="mt-6 p-4 border rounded bg-gray-50">
              <h4 className="font-bold mb-3">{t('Results')}</h4>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between border-b pb-1">{t.ph} <span>6.5 (<span className="text-green-600 font-bold">{t.good}</span>)</span></p>
                <p className="flex justify-between border-b pb-1">{t.nitrogen} <span>250 kg/ha (<span className="text-yellow-600 font-bold">{t.moderate}</span>)</span></p>
                <p className="flex justify-between border-b pb-1">{t.phosphorus} <span>15 kg/ha (<span className="text-red-600 font-bold">{t.low}</span>)</span></p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fertilizer' && (
          <div className="space-y-4 animate-slide-up">
            <select className="border p-2 rounded mr-4"><option>{t('Crop: Rice')}</option></select>
            <select className="border p-2 rounded"><option>{t('Soil Health: Based on recent test')}</option></select>
            
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-800">{t('Recommendation (Basal Dose)')}</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>{t('Urea: 50 kg/acre')}</li>
                <li>{t('DAP: 40 kg/acre (Increased due to low Phosphorus)')}</li>
                <li>{t('MOP: 20 kg/acre')}</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'pest' && (
          <div className="space-y-4 animate-slide-up">
            <select className="border p-2 rounded w-full md:w-1/3 mb-4"><option>{t('Crop: Rice')}</option></select>
            
            <div className="space-y-4">
              <div className="border p-4 rounded-lg flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded shrink-0 flex items-center justify-center text-xs">{t('Image')}</div>
                <div>
                  <h4 className="font-bold text-red-700">{t('Brown Plant Hopper (BPH)')}</h4>
                  <p className="text-sm text-gray-600">{t('Symptoms: Circular patches of drying plants ("hopper burn").')}</p>
                  <p className="text-sm font-semibold mt-2">{t('IPM Suggestion: Avoid excess nitrogen. Maintain alleyways of 30cm for every 2m. Spray Dinotefuran or Pymetrozine if damage is severe.')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
