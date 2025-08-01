export interface PassportData {
  passportNumber?: string;
  fullName?: string;
  dateOfBirth?: string;
  nationality?: string;
  gender?: string;
  expiryDate?: string;
  mrzData?: string;
  placeOfBirth?: string;
  dateOfIssue?: string;
  authority?: string;
}

export interface OCRProgress {
  status: 'loading' | 'recognizing' | 'completed' | 'error';
  progress: number;
  message?: string;
}

export interface FileUploadState {
  file: File | null;
  preview: string | null;
  dragActive: boolean;
}

export type SupportedLanguage = 'eng' | 'urd' | 'ara' | 'hin' | 'fra' | 'spa' | 'deu' | 'chi_sim';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
  nativeName: string;
} 