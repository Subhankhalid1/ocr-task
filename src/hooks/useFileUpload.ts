import { useState, useCallback } from 'react';
import { FileUploadState } from '../types/passport';

export const useFileUpload = () => {
  const [fileState, setFileState] = useState<FileUploadState>({
    file: null,
    preview: null,
    dragActive: false
  });

  const validateFile = useCallback((file: File): { isValid: boolean; error?: string } => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Please select a valid image file (JPG, PNG, BMP, WebP)'
      };
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size must be less than 10MB'
      };
    }

    return { isValid: true };
  }, []);

  const createPreview = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileSelect = useCallback(async (file: File | null) => {
    if (!file) {
      setFileState({
        file: null,
        preview: null,
        dragActive: false
      });
      return;
    }

    const validation = validateFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    try {
      const preview = await createPreview(file);
      setFileState({
        file,
        preview,
        dragActive: false
      });
    } catch (error) {
      console.error('Error creating preview:', error);
      alert('Error creating image preview');
    }
  }, [validateFile, createPreview]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setFileState(prev => ({ ...prev, dragActive: true }));
    } else if (e.type === 'dragleave') {
      setFileState(prev => ({ ...prev, dragActive: false }));
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setFileState(prev => ({ ...prev, dragActive: false }));
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileSelect(e.dataTransfer.files[0]);
    }
  }, [handleFileSelect]);

  const removeFile = useCallback(() => {
    setFileState({
      file: null,
      preview: null,
      dragActive: false
    });
  }, []);

  const getFileIcon = useCallback(() => {
    if (!fileState.file) return '📄';
    
    const ext = fileState.file.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'bmp':
      case 'webp':
        return '🖼️';
      case 'pdf':
        return '📄';
      default:
        return '📁';
    }
  }, [fileState.file]);

  const getFileSize = useCallback(() => {
    if (!fileState.file) return '';
    
    const bytes = fileState.file.size;
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, [fileState.file]);

  return {
    ...fileState,
    handleFileSelect,
    handleDrag,
    handleDrop,
    removeFile,
    getFileIcon,
    getFileSize,
    validateFile
  };
}; 