import React from 'react';
import { SupportedLanguage } from '../../types/passport';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

interface LanguageSelectorProps {
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
          <span className="text-white text-xl">🌐</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Language Selection
          </h3>
          <p className="text-gray-600">
            Choose the language for OCR processing
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {SUPPORTED_LANGUAGES.map((language) => (
          <button
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-200 text-left
              ${selectedLanguage === language.code
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{language.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {language.name}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {language.nativeName}
                </div>
              </div>
            </div>
            
            {selectedLanguage === language.code && (
              <div className="absolute top-2 right-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 <strong>Tip:</strong> Choose the language that matches your passport text for better accuracy.
        </p>
      </div>
    </div>
  );
}; 