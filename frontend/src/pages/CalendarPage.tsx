import React, { useState } from 'react';
import { Calendar as CalIcon, Sprout, Wheat, Leaf } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function CalendarPage() {
  const { t } = useLanguage();
  const [region, setRegion] = useState('Telangana');
  const [crop, setCrop] = useState('Rice');
  const [season, setSeason] = useState('Kharif');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <h1 className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2"><CalIcon /> {t.cropCalendar}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select className="border p-2 rounded" value={region} onChange={e => setRegion(e.target.value)}>
          <option value="Telangana">తెలంగాణ</option>
        </select>
        <select className="border p-2 rounded" value={crop} onChange={e => setCrop(e.target.value)}>
          <option value="Rice">{t('Rice')}</option>
          <option value="Cotton">{t('Cotton')}</option>
        </select>
        <select className="border p-2 rounded" value={season} onChange={e => setSeason(e.target.value)}>
          <option value="Kharif">{t.kharif} ({t('Monsoon')})</option>
          <option value="Rabi">{t.rabi} ({t('Winter')})</option>
          <option value="Zaid">{t.zaid} ({t('Summer')})</option>
        </select>
      </div>

      <div className="bg-white p-4 rounded-lg shadow border overflow-x-auto">
        <h3 className="font-bold mb-4">{t('Timeline (Kharif Rice)')}</h3>
        <div className="min-w-[600px]">
          <div className="grid grid-cols-12 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
            {months.map(m => <div key={m}>{t(m)}</div>)}
          </div>
          <div className="relative h-12 bg-gray-100 rounded">
            {/* Jun - Jul: Planting */}
            <div className="absolute left-[41.6%] w-[16.6%] h-full bg-green-400 rounded-l flex items-center justify-center text-xs font-bold text-white shadow-inner">{t.planting}</div>
            {/* Aug - Oct: Growing */}
            <div className="absolute left-[58.2%] w-[25%] h-full bg-yellow-400 flex items-center justify-center text-xs font-bold text-white shadow-inner">{t.growing}</div>
            {/* Nov - Dec: Harvest */}
            <div className="absolute left-[83.2%] w-[16.6%] h-full bg-orange-400 rounded-r flex items-center justify-center text-xs font-bold text-white shadow-inner">{t.harvest}</div>
          </div>
        </div>
      </div>

      <div className="bg-[#FAF7EF] p-4 rounded-lg border-l-4 border-[#F9A825] shadow">
        <h2 className="text-xl font-bold mb-4">{t('This Month (October) - Growing Phase')}</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-white p-3 rounded border">
            <Sprout className="text-green-600 mt-1" />
            <div>
              <h4 className="font-bold">{t('Fertilizer Application')}</h4>
              <p className="text-sm text-gray-600">{t('Apply the second dose of Nitrogen fertilizer (Urea) if not done.')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-3 rounded border">
            <Leaf className="text-yellow-600 mt-1" />
            <div>
              <h4 className="font-bold">{t('Pest Monitoring')}</h4>
              <p className="text-sm text-gray-600">{t('Check for Stem Borer and Leaf Folder. Spray appropriate pesticides if damage exceeds 5%.')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-3 rounded border">
            <Wheat className="text-orange-600 mt-1" />
            <div>
              <h4 className="font-bold">{t('Water Management')}</h4>
              <p className="text-sm text-gray-600">{t('Maintain 2-3 cm water level in the field during the panicle initiation stage.')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
