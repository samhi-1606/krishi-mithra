import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '../hooks/useLanguage';
import { useFarmer } from '../hooks/useFarmer';
import { useAlerts } from '../hooks/useAlerts';
import { Droplets, Info, AlertTriangle, ShieldCheck, Activity, MapPin, Waves, RefreshCw } from 'lucide-react';

const createIcon = (color: string, emoji: string) => L.divIcon({
  html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${emoji}</div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const DAMS = [
  { id: 'sriram', name: 'Sriram Sagar Dam', lat: 18.97, lng: 78.35, river: 'Godavari', status: 85, condition: 'Monitoring' },
  { id: 'nagarjuna', name: 'Nagarjuna Sagar', lat: 16.57, lng: 79.31, river: 'Krishna', status: 70, condition: 'Normal' },
  { id: 'singur', name: 'Singur Dam', lat: 17.75, lng: 77.93, river: 'Manjira', status: 60, condition: 'Normal' },
];

const RESERVOIRS = [
  { id: 'kadem', name: 'Kadem Reservoir', lat: 19.08, lng: 78.26 },
  { id: 'nizam', name: 'Nizamsagar', lat: 18.17, lng: 77.85 },
];

const WELLS = [
  { id: 'w1', lat: 17.98, lng: 79.58, distance: '1.2 km', status: 'active' },
  { id: 'w2', lat: 17.95, lng: 79.61, distance: '3.4 km', status: 'low' },
  { id: 'w3', lat: 17.99, lng: 79.60, distance: '2.1 km', status: 'active' },
];

// Godavari approximate path
const GODAVARI_PATH: [number, number][] = [
  [19.0, 78.0], [18.97, 78.35], [18.8, 79.0], [18.5, 79.5], [18.0, 80.0], [17.5, 80.5]
];

export default function WaterPage() {
  const { t } = useLanguage();
  const { farmer } = useFarmer();
  const { addAlert } = useAlerts();

  const [activeTab, setActiveTab] = useState('overview');
  const [simulationState, setSimulationState] = useState<'normal' | 'dam' | 'river' | 'risk' | 'farm' | 'completed'>('normal');

  const farmLat = farmer?.location?.lat || 17.97;
  const farmLng = farmer?.location?.lon || 79.59;

  const handleSimulate = () => {
    setSimulationState('dam');
    setTimeout(() => setSimulationState('river'), 1500);
    setTimeout(() => setSimulationState('risk'), 3000);
    setTimeout(() => setSimulationState('farm'), 4500);
    setTimeout(() => {
      setSimulationState('completed');
      addAlert({
        title: '🚨 Potential Downstream Water Risk',
        message: 'Upstream water release detected. Your registered farm is inside the monitored downstream region. Risk: MODERATE',
        type: 'water',
        severity: 'warning'
      });
    }, 6000);
  };

  const resetSimulation = () => {
    setSimulationState('normal');
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-[#FAF7EF]">
      {/* Side Panel */}
      <div className="w-full md:w-96 bg-white shadow-lg z-10 flex flex-col h-full overflow-hidden">
        <div className="p-4 bg-[#2E7D32] text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Waves className="w-6 h-6" />
            Water Intelligence
          </h2>
          <p className="text-sm opacity-90 mt-1">Real-time hydrological monitoring</p>
        </div>

        <div className="flex border-b">
          {['overview', 'dams', 'rivers', 'wells'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab ? 'text-[#2E7D32] border-b-2 border-[#2E7D32]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${simulationState === 'completed' ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
                <div className="flex items-start gap-3">
                  {simulationState === 'completed' ? (
                    <AlertTriangle className="w-6 h-6 text-orange-500 mt-1" />
                  ) : (
                    <ShieldCheck className="w-6 h-6 text-green-600 mt-1" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {simulationState === 'completed' ? 'Moderate Water Risk' : 'Normal Conditions'}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {simulationState === 'completed' 
                        ? 'Your farm is in a potential downstream exposure zone due to upstream dam release.'
                        : 'No immediate water risks detected for your registered farm area.'}
                    </p>
                  </div>
                </div>
              </div>

              {simulationState === 'completed' && (
                <div className="card border-l-4 border-orange-500 p-4 bg-white shadow-sm rounded-lg">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-orange-500" />
                    Water Recommendations
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                    <li>Monitor official water updates closely</li>
                    <li>Move equipment and livestock from low-lying areas</li>
                    <li>Check field drainage systems</li>
                    <li>Avoid entering potentially flooded areas</li>
                  </ul>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Simulation</h3>
                {simulationState === 'normal' ? (
                  <button 
                    onClick={handleSimulate}
                    className="w-full btn-primary py-3 rounded-lg flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-800 text-white font-medium shadow-md transition-all"
                  >
                    <Activity className="w-5 h-5" />
                    Simulate Dam Release
                  </button>
                ) : (
                  <button 
                    onClick={resetSimulation}
                    className="w-full py-3 rounded-lg flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset Simulation
                  </button>
                )}
                
                {simulationState !== 'normal' && simulationState !== 'completed' && (
                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-medium text-gray-500">SIMULATION IN PROGRESS...</div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 transition-all duration-500" 
                        style={{ 
                          width: simulationState === 'dam' ? '25%' : 
                                 simulationState === 'river' ? '50%' : 
                                 simulationState === 'risk' ? '75%' : '90%' 
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'dams' && (
            <div className="space-y-3">
              {DAMS.map(dam => (
                <div key={dam.id} className="p-3 border rounded-lg bg-white shadow-sm flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-gray-900">{dam.name}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      simulationState !== 'normal' && dam.id === 'sriram' 
                      ? 'bg-orange-100 text-orange-700' 
                      : 'bg-green-100 text-green-700'
                    }`}>
                      {simulationState !== 'normal' && dam.id === 'sriram' ? 'Release Detected' : dam.condition}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>River: {dam.river}</span>
                    <span>Reservoir: {dam.status}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rivers' && (
            <div className="space-y-3">
              <div className="p-3 border rounded-lg bg-white shadow-sm">
                <div className="font-medium text-gray-900">Godavari River</div>
                <div className="text-sm text-gray-500 mt-1">Distance from farm: ~45 km</div>
                <div className={`text-xs mt-2 font-medium ${simulationState === 'normal' ? 'text-blue-600' : 'text-orange-600'}`}>
                  Status: {simulationState === 'normal' ? 'Normal Flow' : 'Increased Flow Detected'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wells' && (
            <div className="space-y-3">
              {WELLS.map((well, idx) => (
                <div key={well.id} className="p-3 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">Borewell {idx + 1}</div>
                    <div className="text-xs text-gray-500">Distance: {well.distance}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${well.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                    {well.status === 'active' ? 'Active' : 'Low'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative z-0">
        <MapContainer center={[17.97, 79.59]} zoom={8} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Farm Marker */}
          <Marker position={[farmLat, farmLng]} icon={createIcon('#2E7D32', '🌾')}>
            <Popup>
              <div className="font-bold text-gray-900">{farmer?.name || 'Your Farm'}</div>
              <div className="text-sm text-gray-600">{farmer?.farmDetails.primaryCrop || 'Mixed Crops'}</div>
              <div className="text-xs text-gray-500 mt-1">{farmer?.farmDetails.area ? `${farmer.farmDetails.area} acres` : 'Area not specified'}</div>
            </Popup>
          </Marker>

          {/* Farm Exposure Warning Ring */}
          {(simulationState === 'farm' || simulationState === 'completed') && (
            <Circle 
              center={[farmLat, farmLng]} 
              radius={5000} 
              pathOptions={{ color: '#F57C00', fillColor: '#F57C00', fillOpacity: 0.4, weight: 2, dashArray: '5, 10' }} 
            />
          )}

          {/* Dam Markers */}
          {DAMS.map(dam => (
            <Marker key={dam.id} position={[dam.lat, dam.lng]} icon={createIcon(simulationState !== 'normal' && dam.id === 'sriram' ? '#F57C00' : '#1976D2', '壩')}>
              <Popup>
                <div className="font-bold">{dam.name}</div>
                <div className="text-sm">Reservoir: {dam.status}%</div>
                <div className={`text-sm font-semibold mt-1 ${simulationState !== 'normal' && dam.id === 'sriram' ? 'text-orange-600' : 'text-green-600'}`}>
                  {simulationState !== 'normal' && dam.id === 'sriram' ? 'Release Detected ⚠️' : dam.condition}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Reservoir Markers */}
          {RESERVOIRS.map(res => (
            <Marker key={res.id} position={[res.lat, res.lng]} icon={createIcon('#00BCD4', '💧')}>
              <Popup>{res.name}</Popup>
            </Marker>
          ))}

          {/* Well Markers */}
          {WELLS.map(well => (
            <Marker key={well.id} position={[well.lat, well.lng]} icon={createIcon('#757575', '🕳️')}>
              <Popup>
                Borewell<br/>
                Distance: {well.distance}<br/>
                Status: {well.status}
              </Popup>
            </Marker>
          ))}

          {/* Godavari River Polyline */}
          <Polyline 
            positions={GODAVARI_PATH} 
            pathOptions={{ 
              color: simulationState !== 'normal' ? '#F57C00' : '#2196F3', 
              weight: (simulationState === 'river' || simulationState === 'risk' || simulationState === 'farm' || simulationState === 'completed') ? 6 : 4,
              opacity: 0.8 
            }} 
          >
            <Popup>Godavari River</Popup>
          </Polyline>

          {/* Downstream Risk Zone */}
          {(simulationState === 'risk' || simulationState === 'farm' || simulationState === 'completed') && (
            <Circle 
              center={[18.5, 79.5]} // Approximate downstream center
              radius={40000} 
              pathOptions={{ color: '#F57C00', fillColor: '#F57C00', fillOpacity: 0.2, weight: 1 }} 
            />
          )}

        </MapContainer>
      </div>
    </div>
  );
}
