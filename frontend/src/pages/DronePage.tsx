import React, { useState } from 'react';
import { Plane, Upload, Eye, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function DronePage() {
  const { t } = useLanguage();
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <h1 className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2"><Plane /> 🛸 {t.droneScan}</h1>

      {!showDemo ? (
        <div className="flex gap-4">
          <button className="flex-1 bg-white border-2 border-dashed border-gray-300 p-8 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#2E7D32] transition-colors">
            <Upload size={32} className="text-gray-400" />
            <span className="font-semibold text-gray-600">{t('Upload Drone Image')}</span>
          </button>
          <button onClick={() => setShowDemo(true)} className="flex-1 bg-[#2E7D32] text-white p-8 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg">
            <Eye size={32} />
            <span className="font-semibold">{t('Use Demo Drone Scan')}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <button onClick={() => setShowDemo(false)} className="text-sm text-blue-600 underline">{t('← Back to upload')}</button>
          
          <div className="relative w-full h-64 bg-gradient-to-br from-green-700 via-green-600 to-green-800 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
            {/* Mock aerial view pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px' }}></div>
            
            {/* Bounding boxes */}
            <div className="absolute top-1/4 right-1/4 w-24 h-24 border-2 border-red-500 bg-red-500/20 rounded">
              <span className="bg-red-500 text-white text-xs px-1 absolute -top-5 left-0">{t('Disease (89%)')}</span>
            </div>
            <div className="absolute bottom-1/4 left-1/3 w-32 h-20 border-2 border-yellow-400 bg-yellow-400/20 rounded">
              <span className="bg-yellow-400 text-black text-xs px-1 absolute -top-5 left-0">{t('Water Stress')}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow border">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><AlertTriangle className="text-orange-500" /> {t('Scan Results')}</h2>
            <div className="space-y-4">
              <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-red-700">{t('Possible Disease Detected')}</h3>
                    <p className="text-sm text-gray-700">{t('East Section • 0.15 acres affected')}</p>
                  </div>
                  <span className="bg-white px-2 py-1 rounded text-xs font-bold border">{t('89% Confidence')}</span>
                </div>
                <p className="text-sm mt-2 text-gray-600">{t('Visual signatures match fungal infection. Immediate inspection recommended.')}</p>
              </div>

              <div className="p-3 border-l-4 border-yellow-400 bg-yellow-50 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-yellow-800">{t('Water Stress')}</h3>
                    <p className="text-sm text-gray-700">{t('North Section • 0.4 acres affected')}</p>
                  </div>
                  <span className="bg-white px-2 py-1 rounded text-xs font-bold border">{t('Medium Severity')}</span>
                </div>
                <p className="text-sm mt-2 text-gray-600">{t('Canopy shows signs of dehydration. Check irrigation lines in this sector.')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
