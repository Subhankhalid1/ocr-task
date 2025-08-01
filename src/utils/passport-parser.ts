import { PassportData } from '../types/passport';

export const parsePassportData = (text: string): PassportData => {
  const data: PassportData = {};
  
  // Normalize text for better matching
  const normalizedText = text.toUpperCase().replace(/\s+/g, ' ');
  
  // Passport Number patterns (various formats)
  const passportPatterns = [
    /[A-Z]\d{7}/g,           // A1234567
    /G\d{7}/g,               // G1234567
    /[A-Z]{2}\d{7}/g,        // AB1234567
    /\b\d{9}\b/g,            // 123456789
  ];
  
  for (const pattern of passportPatterns) {
    const match = normalizedText.match(pattern);
    if (match) {
      data.passportNumber = match[0];
      break;
    }
  }
  
  // Full Name (look for consecutive capital letters)
  const nameMatch = normalizedText.match(/([A-Z]+\s+[A-Z]+(?:\s+[A-Z]+)*)/);
  if (nameMatch) {
    data.fullName = nameMatch[1].trim();
  }
  
  // Date of Birth (various formats)
  const dobPatterns = [
    /\d{2}\s+[A-Z]{3}\s+\d{4}/g,  // 15 JAN 1990
    /\d{2}\/\d{2}\/\d{4}/g,       // 15/01/1990
    /\d{2}-\d{2}-\d{4}/g,         // 15-01-1990
    /\d{2}\.\d{2}\.\d{4}/g,       // 15.01.1990
  ];
  
  for (const pattern of dobPatterns) {
    const match = normalizedText.match(pattern);
    if (match) {
      data.dateOfBirth = match[0];
      break;
    }
  }
  
  // Nationality
  const nationalityPatterns = [
    /PAKISTANI/,
    /AMERICAN/,
    /BRITISH/,
    /CANADIAN/,
    /AUSTRALIAN/,
    /INDIAN/,
    /CHINESE/,
    /JAPANESE/,
    /GERMAN/,
    /FRENCH/,
    /SPANISH/,
    /ITALIAN/,
  ];
  
  for (const pattern of nationalityPatterns) {
    if (pattern.test(normalizedText)) {
      data.nationality = pattern.source;
      break;
    }
  }
  
  // Gender
  if (normalizedText.includes('MALE') || normalizedText.includes('M')) {
    data.gender = 'Male';
  } else if (normalizedText.includes('FEMALE') || normalizedText.includes('F')) {
    data.gender = 'Female';
  }
  
  // Expiry Date
  const expiryPatterns = [
    /EXPIRY[:\s]*(\d{2}\s+[A-Z]{3}\s+\d{4})/i,
    /EXPIRES[:\s]*(\d{2}\s+[A-Z]{3}\s+\d{4})/i,
    /VALID[:\s]*UNTIL[:\s]*(\d{2}\s+[A-Z]{3}\s+\d{4})/i,
  ];
  
  for (const pattern of expiryPatterns) {
    const match = normalizedText.match(pattern);
    if (match) {
      data.expiryDate = match[1];
      break;
    }
  }
  
  // MRZ Data (Machine Readable Zone)
  const mrzMatch = normalizedText.match(/[A-Z0-9<]{44}/);
  if (mrzMatch) {
    data.mrzData = mrzMatch[0];
  }
  
  // Place of Birth
  const birthPlaceMatch = normalizedText.match(/BIRTH[:\s]*([A-Z\s]+)/i);
  if (birthPlaceMatch) {
    data.placeOfBirth = birthPlaceMatch[1].trim();
  }
  
  // Date of Issue
  const issuePatterns = [
    /ISSUED[:\s]*(\d{2}\s+[A-Z]{3}\s+\d{4})/i,
    /DATE[:\s]*OF[:\s]*ISSUE[:\s]*(\d{2}\s+[A-Z]{3}\s+\d{4})/i,
  ];
  
  for (const pattern of issuePatterns) {
    const match = normalizedText.match(pattern);
    if (match) {
      data.dateOfIssue = match[1];
      break;
    }
  }
  
  // Authority
  const authorityMatch = normalizedText.match(/AUTHORITY[:\s]*([A-Z\s]+)/i);
  if (authorityMatch) {
    data.authority = authorityMatch[1].trim();
  }
  
  return data;
};

export const validatePassportData = (data: PassportData): { isValid: boolean; missingFields: string[] } => {
  const requiredFields = ['passportNumber', 'fullName', 'dateOfBirth'];
  const missingFields = requiredFields.filter(field => !data[field as keyof PassportData]);
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  // Try to parse various date formats
  const datePatterns = [
    /(\d{2})\s+([A-Z]{3})\s+(\d{4})/,  // 15 JAN 1990
    /(\d{2})\/(\d{2})\/(\d{4})/,       // 15/01/1990
    /(\d{2})-(\d{2})-(\d{4})/,         // 15-01-1990
    /(\d{2})\.(\d{2})\.(\d{4})/,       // 15.01.1990
  ];
  
  for (const pattern of datePatterns) {
    const match = dateString.match(pattern);
    if (match) {
      const [, day, month, year] = match;
      const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                         'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      
      if (monthNames.includes(month)) {
        const monthIndex = monthNames.indexOf(month);
        return new Date(parseInt(year), monthIndex, parseInt(day)).toLocaleDateString();
      } else {
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString();
      }
    }
  }
  
  return dateString;
}; 