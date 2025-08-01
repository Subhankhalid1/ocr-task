import React, { useState } from 'react';
import { FileUpload } from '../components/passport/FileUpload';
import { LanguageSelector } from '../components/passport/LanguageSelector';
import { ProgressIndicator } from '../components/passport/ProgressIndicator';
import { ResultsDisplay } from '../components/passport/ResultsDisplay';
import { usePassportOCR } from '../hooks/usePassportOCR';
import { SupportedLanguage } from '../types/passport';

export const PassportScanner: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('eng');

  const { progress, result, parsedData, isProcessing, validation, processImage, reset } = usePassportOCR();

  const handleProcessImage = () => {
    if (selectedFile) {
      processImage(selectedFile, selectedLanguage);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    reset();
  };

  const hasResults = result && Object.keys(parsedData).length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <span className="text-4xl">🛂</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Passport OCR Scanners
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Extract passport information using advanced optical character recognition technology
          </p>
          <div className="mt-6 flex justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>100% Private & Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Local Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Multi-Language Support</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <FileUpload onFileSelect={setSelectedFile} />

          <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="text-center">
              <button
                onClick={handleProcessImage}
                disabled={!selectedFile || isProcessing}
                className={`
                  relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300
                  ${
                    !selectedFile || isProcessing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  }
                `}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3 text-black">
                    <span className="text-2xl">🔍</span>
                    <span>EXTRACT PASSPORT DATA</span>
                  </div>
                )}
              </button>

              {hasResults && (
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Start Over
                </button>
              )}
            </div>
          </div>

          {isProcessing && <ProgressIndicator progress={progress} />}

          {hasResults && !isProcessing && (
            <ResultsDisplay rawText={result} parsedData={parsedData} validation={validation} />
          )}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🔒</span>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Privacy First</div>
                  <div className="text-gray-600">All processing happens locally</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">⚡</span>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Fast Processing</div>
                  <div className="text-gray-600">Advanced OCR technology</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🌍</span>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Global Support</div>
                  <div className="text-gray-600">Multiple languages supported</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                This application processes images locally in your browser. No data is uploaded to any server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
