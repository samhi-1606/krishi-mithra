import React, { useState } from 'react';
import { Package, Sprout, TestTube, Bug } from 'lucide-react';

const useLanguage = () => ({ t: (key: string) => key });

export default function FarmInputsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('seeds');

  const tabs = [
    { id: 'seeds', label: 'Seeds', icon: <Package size={18} /> },
    { id: 'soil', label: 'Soil Health', icon: <TestTube size={18} /> },
    { id: 'fertilizer', label: 'Fertilizers', icon: <Sprout size={18} /> },
    { id: 'pest', label: 'Pest Control', icon: <Bug size={18} /> },
  ];

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <h1 className="text-2xl font-bold text-[#2E7D32]">{t('Farm Inputs')}</h1>

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
              <select className="border p-2 rounded"><option>Crop: Rice</option></select>
              <select className="border p-2 rounded"><option>Region: Telangana</option></select>
              <select className="border p-2 rounded"><option>Season: Kharif</option></select>
              <select className="border p-2 rounded"><option>Soil: Black</option></select>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg bg-green-50">
                <h3 className="font-bold text-lg text-green-800">BPT 5204 (Samba Mahsuri)</h3>
                <p className="text-sm text-gray-700 mt-2">High yielding, fine grain variety. Duration: 145-150 days. Resistant to Leaf folder.</p>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg">MTU 1010 (Cottondora Sannalu)</h3>
                <p className="text-sm text-gray-600 mt-2">Short duration (120 days). Drought tolerant. Good for delayed monsoon.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'soil' && (
          <div className="space-y-4 animate-slide-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="text-xs text-gray-500">pH Level</label>
                <input type="number" defaultValue="6.5" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Nitrogen (N)</label>
                <input type="number" defaultValue="250" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Phosphorus (P)</label>
                <input type="number" defaultValue="15" className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Potassium (K)</label>
                <input type="number" defaultValue="180" className="border p-2 rounded w-full" />
              </div>
            </div>
            <button className="bg-[#2E7D32] text-white px-4 py-2 rounded">Analyze Soil</button>
            
            <div className="mt-6 p-4 border rounded bg-gray-50">
              <h4 className="font-bold mb-3">Results</h4>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between border-b pb-1">pH <span>6.5 (<span className="text-green-600 font-bold">Good</span>)</span></p>
                <p className="flex justify-between border-b pb-1">Nitrogen <span>250 kg/ha (<span className="text-yellow-600 font-bold">Moderate</span>)</span></p>
                <p className="flex justify-between border-b pb-1">Phosphorus <span>15 kg/ha (<span className="text-red-600 font-bold">Low</span>)</span></p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fertilizer' && (
          <div className="space-y-4 animate-slide-up">
            <select className="border p-2 rounded mr-4"><option>Crop: Rice</option></select>
            <select className="border p-2 rounded"><option>Soil Health: Based on recent test</option></select>
            
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-800">Recommendation (Basal Dose)</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>Urea: 50 kg/acre</li>
                <li>DAP: 40 kg/acre (Increased due to low Phosphorus)</li>
                <li>MOP: 20 kg/acre</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'pest' && (
          <div className="space-y-4 animate-slide-up">
            <select className="border p-2 rounded w-full md:w-1/3 mb-4"><option>Crop: Rice</option></select>
            
            <div className="space-y-4">
              <div className="border p-4 rounded-lg flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded shrink-0 flex items-center justify-center text-xs">Image</div>
                <div>
                  <h4 className="font-bold text-red-700">Brown Plant Hopper (BPH)</h4>
                  <p className="text-sm text-gray-600">Symptoms: Circular patches of drying plants ("hopper burn").</p>
                  <p className="text-sm font-semibold mt-2">IPM Suggestion: Avoid excess nitrogen. Maintain alleyways of 30cm for every 2m. Spray Dinotefuran or Pymetrozine if damage is severe.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
