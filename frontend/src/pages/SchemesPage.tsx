import React, { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle, Info } from 'lucide-react';

const useLanguage = () => ({ t: (key: string) => key });

const schemes = [
  { id: 1, name: 'PM-KISAN', type: 'Central', eligibility: 'Small and marginal farmers', benefit: '₹6,000 per year in 3 installments', how: 'Apply via CSC or pmkisan.gov.in' },
  { id: 2, name: 'PMFBY (Crop Insurance)', type: 'Central', eligibility: 'All farmers growing notified crops', benefit: 'Comprehensive insurance cover against crop failure', how: 'Apply via bank or PMFBY portal' },
  { id: 3, name: 'Soil Health Card Scheme', type: 'Central', eligibility: 'All farmers', benefit: 'Soil testing and fertilizer recommendations', how: 'Contact local agriculture office' },
  { id: 4, name: 'Kisan Credit Card (KCC)', type: 'Central', eligibility: 'Farmers, tenant farmers, sharecroppers', benefit: 'Short-term credit limits for crop inputs', how: 'Apply at your local bank branch' },
  { id: 5, name: 'PMKSY (Irrigation)', type: 'Central', eligibility: 'Farmers with land records', benefit: 'Subsidy for micro-irrigation systems', how: 'Contact State Agriculture Department' },
  { id: 6, name: 'Agriculture Infrastructure Fund', type: 'Central', eligibility: 'FPOs, PACS, Agri-entrepreneurs', benefit: 'Interest subvention on loans for post-harvest infrastructure', how: 'Apply via AIF portal' },
  { id: 7, name: 'e-NAM', type: 'Central', eligibility: 'All farmers', benefit: 'Access to national electronic trading portal', how: 'Register at local APMC or enam.gov.in' },
  { id: 8, name: 'NMSA (Sustainable Agri)', type: 'Central', eligibility: 'All farmers', benefit: 'Support for organic farming, rainfed area development', how: 'Through State Government schemes' },
];

export default function SchemesPage() {
  const { t } = useLanguage();
  const [region, setRegion] = useState('All');
  const [crop, setCrop] = useState('All');
  
  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <h1 className="text-2xl font-bold text-[#2E7D32]">{t('Government Schemes')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select className="select-field border p-2 rounded" value={region} onChange={e => setRegion(e.target.value)}>
          <option value="All">All Regions</option>
          <option value="Telangana">Telangana</option>
        </select>
        <select className="select-field border p-2 rounded" value={crop} onChange={e => setCrop(e.target.value)}>
          <option value="All">All Crops</option>
          <option value="Rice">Rice</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {schemes.map(s => (
          <div key={s.id} className="card bg-white border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-bold text-lg text-gray-800">{s.name}</h2>
              <span className="badge-success bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{s.type}</span>
            </div>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700 flex items-center gap-1"><CheckCircle size={14} className="text-green-600" /> Eligibility:</span>
                <p className="text-gray-600 ml-5">{s.eligibility}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700 flex items-center gap-1"><Info size={14} className="text-blue-600" /> Benefit:</span>
                <p className="text-gray-600 ml-5">{s.benefit}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">How to Apply:</span>
                <p className="text-gray-600">{s.how}</p>
              </div>
            </div>
            
            <button className="mt-4 w-full btn-outline border border-[#2E7D32] text-[#2E7D32] py-2 rounded flex items-center justify-center gap-2 hover:bg-green-50">
              Visit Official Source <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
