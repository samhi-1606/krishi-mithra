import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Search, ShieldAlert, CheckCircle2 } from 'lucide-react';

const useLanguage = () => ({ t: (key: string) => key });

export default function CropScanPage() {
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(false);

  const handleDemo = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setResult(true);
    }, 2000);
  };

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <h1 className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2"><Camera /> 📸 Scan Your Crop</h1>

      {!scanning && !result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-[#2E7D32] flex flex-col items-center gap-3 transition">
            <div className="bg-blue-100 p-3 rounded-full"><ImageIcon className="text-blue-600" size={24} /></div>
            <span className="font-semibold">Upload Image</span>
          </button>
          <button className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-[#2E7D32] flex flex-col items-center gap-3 transition">
            <div className="bg-green-100 p-3 rounded-full"><Camera className="text-green-600" size={24} /></div>
            <span className="font-semibold">Take Photo</span>
          </button>
          <button onClick={handleDemo} className="bg-[#FAF7EF] p-6 rounded-lg border-2 border-[#2E7D32] flex flex-col items-center gap-3 transition shadow-sm">
            <div className="bg-orange-100 p-3 rounded-full"><Search className="text-orange-600" size={24} /></div>
            <span className="font-semibold text-[#2E7D32]">Use Demo Image</span>
          </button>
        </div>
      )}

      {scanning && (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <div className="relative w-32 h-32 border-4 border-dashed border-[#2E7D32] rounded-lg animate-spin"></div>
          <div className="absolute"><Search className="text-[#2E7D32] animate-pulse" size={32} /></div>
          <p className="font-bold text-lg text-gray-700 animate-pulse">AI is analyzing the leaf...</p>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-slide-up">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Analysis Complete</h2>
            <button onClick={() => setResult(false)} className="text-sm text-blue-600 underline">Scan another</button>
          </div>

          <div className="bg-white border rounded-lg overflow-hidden shadow">
            <div className="bg-red-50 p-4 border-b border-red-100 flex items-start gap-4">
              <ShieldAlert className="text-red-500 shrink-0" size={32} />
              <div>
                <h3 className="text-xl font-bold text-red-700">Possible Rice Leaf Blast</h3>
                <p className="text-sm text-gray-600 mt-1">Confidence: <span className="font-bold text-gray-800">87%</span> | Severity: <span className="font-bold text-orange-600">High</span></p>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-bold mb-2 flex items-center gap-2"><CheckCircle2 size={18} className="text-green-600" /> Recommended Actions</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>Remove and destroy heavily infected leaves immediately.</li>
                <li>Avoid applying excessive nitrogen fertilizer which can worsen the condition.</li>
                <li>Apply recommended fungicides such as Tricyclazole 75% WP (0.6g/liter) or Isoprothiolane 40% EC (1.5ml/liter).</li>
                <li>Ensure proper field drainage to reduce humidity in the microclimate.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
