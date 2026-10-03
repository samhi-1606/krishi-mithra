import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useFarmer } from '../hooks/useFarmer';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', native: 'اردو' }
];

const CROPS = [
  { id: 'rice', name: 'Rice', emoji: '🌾' },
  { id: 'cotton', name: 'Cotton', emoji: '🧶' },
  { id: 'maize', name: 'Maize', emoji: '🌽' },
  { id: 'chilli', name: 'Chilli', emoji: '🌶️' },
  { id: 'tomato', name: 'Tomato', emoji: '🍅' },
  { id: 'turmeric', name: 'Turmeric', emoji: '🫚' },
  { id: 'groundnut', name: 'Groundnut', emoji: '🥜' },
  { id: 'pulses', name: 'Pulses', emoji: '🫘' },
];

export default function OnboardingPage() {
  const { language, setLanguage, t } = useLanguage();
  const { setFarmer } = useFarmer();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    state: 'Telangana',
    district: 'Warangal',
    mandal: 'Hanamkonda',
    village: 'Bheemaram',
    crops: [] as string[],
    farmArea: '5',
    soilType: 'Red soil',
    irrigation: 'Borewell'
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const toggleCrop = (cropName: string) => {
    setFormData(prev => ({
      ...prev,
      crops: prev.crops.includes(cropName) 
        ? prev.crops.filter(c => c !== cropName)
        : [...prev.crops, cropName]
    }));
  };

  const handleFinish = () => {
    setFarmer({
      id: `custom-${Date.now()}`,
      name: 'Farmer',
      phone: '',
      location: {
        lat: 17.97,
        lon: 79.59,
        address: `${formData.district}, ${formData.state}`,
        region: formData.state,
      },
      farmDetails: {
        area: Number(formData.farmArea) || 3.5,
        primaryCrop: formData.crops[0] || 'Rice',
        soilType: formData.soilType || 'Red soil',
        irrigationType: formData.irrigation || 'Borewell',
      },
      preferredLanguage: language,
    });
    navigate('/');
  };

  const loadDemo = () => {
    setFarmer({
      id: 'f1',
      name: 'Ramesh Goud',
      phone: '+91 9876543210',
      location: {
        lat: 17.9689,
        lon: 79.5941,
        address: 'Warangal, Telangana',
        region: 'Telangana',
      },
      farmDetails: {
        area: 3.5,
        primaryCrop: 'Rice',
        soilType: 'Black Cotton',
        irrigationType: 'Borewell',
      },
      preferredLanguage: 'en',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAF7EF] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden relative min-h-[600px] flex flex-col">
        
        {/* Step Indicator */}
        <div className="px-8 pt-8 flex justify-center gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${
              step >= i ? 'bg-[#2E7D32] w-8' : 'bg-gray-200 w-4'
            }`} />
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {step === 1 && (
            <div className="text-center animate-fade-in space-y-6">
              <div className="text-6xl mb-4 animate-bounce">🌾</div>
              <h1 className="text-3xl font-bold text-[#2E7D32]">{t.welcome}</h1>
              <p className="text-gray-500">{t.welcomeSubtitle}</p>
              
              <div className="text-left mt-8">
                <h3 className="font-semibold text-gray-700 mb-4">{t.chooseLanguage}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        language === lang.code 
                          ? 'border-[#2E7D32] bg-green-50 ring-2 ring-green-200' 
                          : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-lg font-bold text-gray-800">{lang.native}</div>
                      <div className="text-xs text-gray-500">{t(lang.name)}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-8">
                <button onClick={loadDemo} className="text-sm text-[#2E7D32] font-medium hover:underline">
                  {t.exploreDemoFarm}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">{t.whereIsYourFarm}</h2>
              <p className="text-gray-500">{t('This helps us provide accurate weather and market data.')}</p>
              
              <div className="space-y-4 mt-6">
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-blue-100 bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors">
                  <MapPin className="w-5 h-5" />
                  {t.useMyLocation}
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-sm text-gray-400">{t('OR')}</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">{t.state}</label>
                    <select 
                      className="input-field w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                      value={formData.state}
                      onChange={e => setFormData({...formData, state: e.target.value})}
                    >
                      <option value="Telangana">{t('Telangana')}</option>
                      <option value="Andhra Pradesh">{t('Andhra Pradesh')}</option>
                      <option value="Maharashtra">{t('Maharashtra')}</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">{t.district}</label>
                    <select 
                      className="input-field w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                      value={formData.district}
                      onChange={e => setFormData({...formData, district: e.target.value})}
                    >
                      <option value="Warangal">{t('Warangal')}</option>
                      <option value="Karimnagar">{t('Karimnagar')}</option>
                      <option value="Khammam">{t('Khammam')}</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">{t('Mandal/Taluk')}</label>
                    <input 
                      type="text" 
                      className="input-field w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                      value={formData.mandal}
                      onChange={e => setFormData({...formData, mandal: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">{t.village}</label>
                    <input 
                      type="text" 
                      className="input-field w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                      value={formData.village}
                      onChange={e => setFormData({...formData, village: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">{t.whatDoYouGrow}</h2>
              <p className="text-gray-500">{t('Select all the crops you are currently growing.')}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {CROPS.map(crop => {
                  const isSelected = formData.crops.includes(crop.name);
                  return (
                    <button
                      key={crop.id}
                      onClick={() => toggleCrop(crop.name)}
                      className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                        isSelected 
                          ? 'border-[#2E7D32] bg-green-50' 
                          : 'border-gray-100 bg-white hover:border-green-200'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#2E7D32] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <span className="text-4xl mb-2">{crop.emoji}</span>
                      <span className="font-medium text-gray-800">{t(crop.name)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">{t.tellUsAboutFarm}</h2>
              <p className="text-gray-500">{t('Optional details to help Bhumi AI give better advice.')}</p>
              
              <div className="space-y-5 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('Farm Area (in acres)')}</label>
                  <input 
                    type="number" 
                    className="input-field w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                    value={formData.farmArea}
                    onChange={e => setFormData({...formData, farmArea: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.soilType}</label>
                  <select 
                    className="input-field w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                    value={formData.soilType}
                    onChange={e => setFormData({...formData, soilType: e.target.value})}
                  >
                    <option value="Red soil">{t('Red soil')}</option>
                    <option value="Black soil">{t('Black soil')}</option>
                    <option value="Alluvial">{t('Alluvial')}</option>
                    <option value="Sandy">{t('Sandy')}</option>
                    <option value="Clayey">{t('Clayey')}</option>
                    <option value="Loamy">{t('Loamy')}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.irrigation}</label>
                  <select 
                    className="input-field w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                    value={formData.irrigation}
                    onChange={e => setFormData({...formData, irrigation: e.target.value})}
                  >
                    <option value="Borewell">{t('Borewell')}</option>
                    <option value="Canal">{t('Canal')}</option>
                    <option value="Drip">{t('Drip')}</option>
                    <option value="Rain-fed">{t('Rain-fed')}</option>
                    <option value="Sprinkler">{t('Sprinkler')}</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="border-t p-4 px-8 bg-gray-50 flex items-center justify-between rounded-b-3xl">
          {step > 1 ? (
            <button 
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-200 flex items-center gap-2 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" /> {t.back}
            </button>
          ) : <div></div>}

          {step < 4 ? (
            <button 
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl font-medium bg-[#2E7D32] hover:bg-green-800 text-white flex items-center gap-2 shadow-md transition-colors"
            >
              {t.next} <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={handleFinish}
              className="px-8 py-2.5 rounded-xl font-bold bg-[#F9A825] hover:bg-yellow-600 text-gray-900 flex items-center gap-2 shadow-md transition-colors"
            >
              {t.getStarted} <Check className="w-5 h-5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
