import React, { useState } from 'react';
import { Satellite, AlertCircle, CheckCircle, Activity, Loader } from 'lucide-react';

const useLanguage = () => ({ t: (key: string) => key });

export default function SatellitePage() {
  const { t } = useLanguage();
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  const messages = [
    "Acquiring imagery...",
    "Mapping crop zones...",
    "Analyzing vegetation...",
    "Checking crop stress...",
    "Detecting anomalies...",
    "Generating health map..."
  ];

  const handleAnalyze = () => {
    setAnalyzing(true);
    let step = 0;
    setStatusMsg(messages[0]);
    const interval = setInterval(() => {
      step++;
      if (step < messages.length) {
        setStatusMsg(messages[step]);
      } else {
        clearInterval(interval);
        setAnalyzing(false);
        setAnalyzed(true);
      }
    }, 800);
  };

  const getCellColor = (id: string) => {
    if (!analyzed) return 'bg-gray-200';
    if (id === 'B7') return 'bg-red-500 animate-pulse';
    if (['B6', 'C7'].includes(id)) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  return (
    <div className="p-4 space-y-6 flex flex-col md:flex-row gap-6 relative overflow-hidden">
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2"><Satellite /> 🛰 Satellite Crop Monitoring</h1>
        
        {analyzed && (
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-green-500 rounded"></span> Healthy (85%)</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-yellow-400 rounded"></span> Stress (10%)</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-red-500 rounded"></span> Risk (5%)</div>
          </div>
        )}

        <div className="relative aspect-square max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-inner border-2 border-gray-300">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-1">
            {Array.from({ length: 16 }).map((_, i) => {
              const row = String.fromCharCode(65 + Math.floor(i / 4));
              const col = (i % 4) + 1;
              const id = `${row}${col}`;
              return (
                <div 
                  key={id}
                  onClick={() => analyzed && id === 'B7' && setSelectedCell(id)}
                  className={`rounded flex items-center justify-center text-xs font-bold text-white/50 transition-colors duration-500 ${getCellColor(id)} ${analyzed && id==='B7' ? 'cursor-pointer hover:opacity-80' : ''}`}
                >
                  {id}
                </div>
              );
            })}
          </div>
        </div>

        {!analyzed && !analyzing && (
          <button onClick={handleAnalyze} className="w-full bg-[#2E7D32] text-white py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2">
            <Activity /> Analyze Farm
          </button>
        )}

        {analyzing && (
          <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3 border border-blue-200">
            <Loader className="animate-spin text-blue-600" />
            <span className="font-semibold text-blue-800">{statusMsg}</span>
          </div>
        )}
      </div>

      {selectedCell === 'B7' && (
        <div className="md:w-80 bg-white border-l shadow-2xl p-6 absolute right-0 top-0 bottom-0 animate-[slideIn_0.3s_ease-out] z-10 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-red-600 flex items-center gap-2"><AlertCircle /> Zone {selectedCell}</h2>
            <button onClick={() => setSelectedCell(null)} className="text-gray-500 hover:text-gray-800">✕</button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm text-gray-600">Detection</p>
              <p className="font-bold text-lg">Possible Rice Leaf Blast</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded text-center">
                <p className="text-xs text-gray-500">AI Confidence</p>
                <p className="font-bold text-blue-600">91%</p>
              </div>
              <div className="bg-yellow-50 p-2 rounded text-center">
                <p className="text-xs text-gray-500">Severity</p>
                <p className="font-bold text-yellow-600">Medium</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Estimated Area</p>
              <p className="font-semibold">0.21 Acres</p>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-bold mb-2">What you should do:</h3>
              <ol className="list-decimal pl-5 text-sm space-y-2 text-gray-700">
                <li>Visit Zone B7 to manually inspect the leaves.</li>
                <li>Look for diamond-shaped lesions with gray centers.</li>
                <li>Avoid applying excess nitrogen fertilizer.</li>
                <li>Improve water management (avoid drought stress).</li>
                <li>If symptoms match, apply recommended fungicide (e.g., Tricyclazole).</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
