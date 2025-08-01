import React from 'react';
import { OCRProgress } from '../../types/passport';

interface ProgressIndicatorProps {
  progress: OCRProgress;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress }) => {
  const getStatusIcon = () => {
    switch (progress.status) {
      case 'loading':
        return '⚡';
      case 'recognizing':
        return '🔍';
      case 'completed':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '⚡';
    }
  };

  const getStatusColor = () => {
    switch (progress.status) {
      case 'loading':
        return 'text-blue-600';
      case 'recognizing':
        return 'text-purple-600';
      case 'completed':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const getProgressColor = () => {
    switch (progress.status) {
      case 'loading':
        return 'bg-blue-500';
      case 'recognizing':
        return 'bg-purple-500';
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <div
          className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4`}
        >
          <span className="text-white text-xl">{getStatusIcon()}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Processing Progress</h3>
          <p className={`text-sm font-medium ${getStatusColor()}`}>{progress.message || 'Processing your image...'}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
              style={{ width: `${progress.progress * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">0%</span>
            <span className="text-sm font-medium text-gray-900">{Math.round(progress.progress * 100)}%</span>
            <span className="text-sm text-gray-600">100%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-sm font-medium text-gray-900">Progress</div>
            <div className="text-lg font-bold text-blue-600">{Math.round(progress.progress * 100)}%</div>
          </div>

          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-sm font-medium text-gray-900">Status</div>
            <div className={`text-sm font-bold capitalize ${getStatusColor()}`}>{progress.status}</div>
          </div>

          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-1">🔍</div>
            <div className="text-sm font-medium text-gray-900">Stage</div>
            <div className="text-sm font-bold text-gray-700">
              {progress.status === 'loading' && 'Initializing'}
              {progress.status === 'recognizing' && 'Extracting Text'}
              {progress.status === 'completed' && 'Completed'}
              {progress.status === 'error' && 'Error'}
            </div>
          </div>
        </div>

        {progress.status === 'loading' || progress.status === 'recognizing' ? (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
