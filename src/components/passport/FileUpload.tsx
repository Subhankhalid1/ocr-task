import React from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const {
    file,
    preview,
    dragActive,
    handleFileSelect,
    handleDrag,
    handleDrop,
    removeFile,
    getFileIcon,
    getFileSize
  } = useFileUpload();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileSelect(selectedFile);
    onFileSelect(selectedFile);
  };

  const handleRemoveFile = () => {
    removeFile();
    onFileSelect(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
          <span className="text-white text-xl">📤</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Upload Passport Image
          </h2>
          <p className="text-gray-600">
            Select or drag your passport image here
          </p>
        </div>
      </div>
      
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ease-in-out
          ${dragActive 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${file ? 'border-green-500 bg-green-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          onChange={handleInputChange}
          accept="image/*"
          className="hidden"
          id="file-input"
        />
        
        <label htmlFor="file-input" className="cursor-pointer block">
          {file ? (
            <div className="text-center">
              {preview ? (
                <div className="mb-4">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-w-full h-48 object-contain rounded-lg mx-auto border border-gray-200"
                  />
                </div>
              ) : (
                <div className="text-6xl mb-4">{getFileIcon()}</div>
              )}
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {file.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {getFileSize()}
              </p>
              
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Remove File
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('file-input')?.click()}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Change File
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop your passport image here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse files
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Supports JPG, PNG, BMP, WebP</p>
                <p>Maximum file size: 10MB</p>
              </div>
            </div>
          )}
        </label>
        
        {dragActive && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-xl flex items-center justify-center">
            <div className="text-blue-600 text-lg font-medium">
              Drop your file here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 