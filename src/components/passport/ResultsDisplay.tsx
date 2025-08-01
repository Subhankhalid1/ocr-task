import React from 'react';
import { PassportData } from '../../types/passport';
import { formatDate } from '../../utils/passport-parser';

interface ResultsDisplayProps {
  rawText: string;
  parsedData: PassportData;
  validation: { isValid: boolean; missingFields: string[] };
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  rawText,
  parsedData,
  validation
}) => {
  const dataFields = [
    { key: 'passportNumber', label: 'Passport Number', icon: '🆔', required: true },
    { key: 'fullName', label: 'Full Name', icon: '👤', required: true },
    { key: 'dateOfBirth', label: 'Date of Birth', icon: '🎂', required: true },
    { key: 'nationality', label: 'Nationality', icon: '🏳️', required: false },
    { key: 'gender', label: 'Gender', icon: '⚧', required: false },
    { key: 'expiryDate', label: 'Expiry Date', icon: '📅', required: false },
    { key: 'placeOfBirth', label: 'Place of Birth', icon: '🌍', required: false },
    { key: 'dateOfIssue', label: 'Date of Issue', icon: '📋', required: false },
    { key: 'authority', label: 'Authority', icon: '🏛️', required: false },
    { key: 'mrzData', label: 'MRZ Data', icon: '📊', required: false },
  ];

  const getFieldValue = (key: string) => {
    const value = parsedData[key as keyof PassportData];
    if (!value) return 'Not found';
    
    if (key.includes('Date') && value !== 'Not found') {
      return formatDate(value);
    }
    
    return value;
  };

  const getFieldStatus = (key: string) => {
    const value = parsedData[key as keyof PassportData];
    const isRequired = dataFields.find(field => field.key === key)?.required;
    
    if (!value) {
      return isRequired ? 'error' : 'warning';
    }
    return 'success';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '❓';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
            validation.isValid 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
              : 'bg-gradient-to-r from-yellow-500 to-orange-600'
          }`}>
            <span className="text-white text-xl">
              {validation.isValid ? '✅' : '⚠️'}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Extraction Results
            </h3>
            <p className={`font-medium ${
              validation.isValid ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {validation.isValid 
                ? 'All required fields extracted successfully!' 
                : `${validation.missingFields.length} required field(s) missing`
              }
            </p>
          </div>
        </div>
        
        {!validation.isValid && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Missing Required Fields:</h4>
            <ul className="list-disc list-inside text-sm text-yellow-700">
              {validation.missingFields.map((field, index) => (
                <li key={index} className="capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
            <span className="text-white text-xl">🎯</span>
          </div>
          <h4 className="text-xl font-bold text-gray-900">
            Parsed Passport Data
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataFields.map((field) => {
            const status = getFieldStatus(field.key);
            const value = getFieldValue(field.key);
            
            return (
              <div
                key={field.key}
                className={`p-4 rounded-xl border-2 ${getStatusColor(status)} transition-all duration-200`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{field.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">
                        {field.label}
                      </div>
                      {field.required && (
                        <div className="text-xs text-red-500 font-medium">Required</div>
                      )}
                    </div>
                  </div>
                  <span className="text-lg">{getStatusIcon(status)}</span>
                </div>
                
                <div className="mt-2">
                  <div className={`font-mono text-sm break-all ${
                    value === 'Not found' ? 'text-gray-500 italic' : 'text-gray-900'
                  }`}>
                    {value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mr-4">
            <span className="text-white text-xl">📝</span>
          </div>
          <h4 className="text-xl font-bold text-gray-900">
            Raw Extracted Text
          </h4>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
            {rawText || 'No text extracted'}
          </pre>
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <span>Character count: {rawText.length}</span>
          <span>Word count: {rawText.split(/\s+/).filter(word => word.length > 0).length}</span>
        </div>
      </div>
    </div>
  );
}; 