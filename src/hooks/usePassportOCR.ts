import { useState, useCallback } from 'react';
import Tesseract from 'tesseract.js';
import { PassportData, OCRProgress, SupportedLanguage } from '../types/passport';
import { parsePassportData, validatePassportData } from '../utils/passport-parser';

export const usePassportOCR = () => {
  const [progress, setProgress] = useState<OCRProgress>({
    status: 'loading',
    progress: 0,
    message: ''
  });
  const [result, setResult] = useState<string>('');
  const [parsedData, setParsedData] = useState<PassportData>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [validation, setValidation] = useState<{ isValid: boolean; missingFields: string[] }>({
    isValid: false,
    missingFields: []
  });

  const processImage = useCallback(async (
    file: File, 
    language: SupportedLanguage = 'eng'
  ) => {
    if (!file) {
      setProgress({
        status: 'error',
        progress: 0,
        message: 'No file selected'
      });
      return;
    }

    setIsProcessing(true);
    setProgress({
      status: 'loading',
      progress: 0,
      message: 'Initializing OCR engine...'
    });
    setResult('');
    setParsedData({});

    try {
      const { data: { text } } = await Tesseract.recognize(file, language, {
        logger: (m) => {
          if (m.status === 'loading tesseract core') {
            setProgress({
              status: 'loading',
              progress: m.progress * 0.3,
              message: 'Loading OCR engine...'
            });
          } else if (m.status === 'loading language traineddata') {
            setProgress({
              status: 'loading',
              progress: 0.3 + (m.progress * 0.3),
              message: `Loading ${language} language data...`
            });
          } else if (m.status === 'initializing tesseract') {
            setProgress({
              status: 'loading',
              progress: 0.6 + (m.progress * 0.2),
              message: 'Initializing recognition...'
            });
          } else if (m.status === 'recognizing text') {
            setProgress({
              status: 'recognizing',
              progress: 0.8 + (m.progress * 0.2),
              message: 'Extracting text from image...'
            });
          }
        },
      });

      setResult(text);
      
      // Parse the extracted text
      const parsed = parsePassportData(text);
      setParsedData(parsed);
      
      // Validate the parsed data
      const validationResult = validatePassportData(parsed);
      setValidation(validationResult);

      setProgress({
        status: 'completed',
        progress: 1,
        message: validationResult.isValid 
          ? 'Passport data extracted successfully!' 
          : 'Some fields could not be extracted'
      });

    } catch (error) {
      console.error('OCR Error:', error);
      setProgress({
        status: 'error',
        progress: 0,
        message: `Error processing image: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
      setResult('');
      setParsedData({});
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setProgress({
      status: 'loading',
      progress: 0,
      message: ''
    });
    setResult('');
    setParsedData({});
    setIsProcessing(false);
    setValidation({
      isValid: false,
      missingFields: []
    });
  }, []);

  return {
    progress,
    result,
    parsedData,
    isProcessing,
    validation,
    processImage,
    reset
  };
}; 