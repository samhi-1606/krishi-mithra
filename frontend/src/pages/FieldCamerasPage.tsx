import React, { useState } from 'react';
import { Video, Clock, AlertCircle } from 'lucide-react';

const useLanguage = () => ({ t: (key: string) => key });

const cameras = [
  { id: 'cam1', name: 'Camera 01: North Field', status: 'Normal', color: 'green', desc: 'No issues detected. Crop growth normal.' },
  { id: 'cam2', name: 'Camera 02: East Field', status: 'Stress', color: 'yellow', desc: 'Slight yellowing detected. Possible water stress.' },
  { id: 'cam3', name: 'Camera 03: South Field', status: 'Possible Pest Activity', color: 'red', desc: 'Movement and leaf damage detected.' },
];

export default function FieldCamerasPage() {
  const { t } = useLanguage();
  const [selectedCam, setSelectedCam] = useState<any>(null);

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <h1 className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2"><Video /> 📷 Field Cameras</h1>
      <p className="text-sm bg-blue-50 text-blue-700 p-2 rounded border border-blue-200 inline-block">Demo Camera Feed</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cameras.map(cam => (
          <div key={cam.id} onClick={() => setSelectedCam(cam)} className={`bg-white border rounded-lg p-4 cursor-pointer hover:shadow-md transition ${selectedCam?.id === cam.id ? 'ring-2 ring-[#2E7D32]' : ''}`}>
            <div className="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center relative overflow-hidden">
              <Video className="text-gray-400" size={32} />
              <div className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-${cam.color}-500 animate-pulse`}></div>
            </div>
            <h3 className="font-bold text-sm">{cam.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded bg-${cam.color}-100 text-${cam.color}-800 font-bold`}>{cam.status}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedCam && (
        <div className="bg-white border rounded-lg p-5 shadow-lg mt-6 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">{selectedCam.name} Details</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500"><Clock size={16} /> Live</div>
          </div>
          
          <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center relative mb-4">
            <span className="text-white/50 text-lg tracking-widest">CAMERA FEED PLACEHOLDER</span>
            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 animate-pulse">
              ● REC
            </div>
          </div>

          <div className={`p-4 rounded-lg bg-${selectedCam.color}-50 border border-${selectedCam.color}-200`}>
            <h4 className="font-bold flex items-center gap-2"><AlertCircle size={18} /> AI Analysis</h4>
            <p className="text-sm mt-1">{selectedCam.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
