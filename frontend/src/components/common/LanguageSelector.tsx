import React, { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { supportedLanguages } from '../../i18n';

interface LanguageSelectorProps {
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onClose }) => {
  const { language, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const popularCodes = ['hi', 'te', 'en'];

  const filteredLanguages = supportedLanguages.filter(
    lang => lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
            lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularLanguages = filteredLanguages.filter(l => popularCodes.includes(l.code));
  const otherLanguages = filteredLanguages.filter(l => !popularCodes.includes(l.code));

  const handleSelect = (code: string) => {
    setLanguage(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{t.chooseLanguage}</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Search */}
        <div className="px-5 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32]"
              placeholder={t.searchLanguage}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Languages list */}
        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {popularLanguages.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.popular}</h4>
              <div className="space-y-1.5">
                {popularLanguages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      language === lang.code 
                        ? 'bg-[#E8F5E9] border-2 border-[#2E7D32]' 
                        : 'border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-left">
                      <span className="text-lg font-semibold text-gray-900">{lang.nativeName}</span>
                      <span className="text-sm text-gray-500 ml-2">{lang.name}</span>
                    </div>
                    {language === lang.code && <Check className="h-5 w-5 text-[#2E7D32]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {otherLanguages.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.otherIndianLanguages}</h4>
              <div className="space-y-1.5">
                {otherLanguages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      language === lang.code 
                        ? 'bg-[#E8F5E9] border-2 border-[#2E7D32]' 
                        : 'border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-left">
                      <span className="text-lg font-semibold text-gray-900">{lang.nativeName}</span>
                      <span className="text-sm text-gray-500 ml-2">{lang.name}</span>
                    </div>
                    {language === lang.code && <Check className="h-5 w-5 text-[#2E7D32]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
