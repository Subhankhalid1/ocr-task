import { LanguageOption } from '../types/passport';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'eng',
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English'
  },
  {
    code: 'urd',
    name: 'Urdu',
    flag: '🇵🇰',
    nativeName: 'اردو'
  },
  {
    code: 'ara',
    name: 'Arabic',
    flag: '🇸🇦',
    nativeName: 'العربية'
  },
  {
    code: 'hin',
    name: 'Hindi',
    flag: '🇮🇳',
    nativeName: 'हिन्दी'
  },
  {
    code: 'fra',
    name: 'French',
    flag: '🇫🇷',
    nativeName: 'Français'
  },
  {
    code: 'spa',
    name: 'Spanish',
    flag: '🇪🇸',
    nativeName: 'Español'
  },
  {
    code: 'deu',
    name: 'German',
    flag: '🇩🇪',
    nativeName: 'Deutsch'
  },
  {
    code: 'chi_sim',
    name: 'Chinese (Simplified)',
    flag: '🇨🇳',
    nativeName: '简体中文'
  }
];

export const getLanguageByCode = (code: string): LanguageOption | undefined => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
}; 