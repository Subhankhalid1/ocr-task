# Passport OCR Scanner

A modern, privacy-focused passport OCR scanner built with React, TypeScript, and Tesseract.js.

## Features

### 🔒 Privacy First
- **100% Local Processing**: All OCR processing happens in your browser
- **No Server Upload**: Images never leave your device
- **Secure**: No data is transmitted to external servers

### 🌍 International Support
- **Multi-Language OCR**: Supports 8 languages including English, Urdu, Arabic, Hindi, French, Spanish, German, and Chinese
- **Global Passport Formats**: Handles various passport formats and layouts
- **Unicode Support**: Full support for non-Latin characters

### 🎯 Advanced Data Extraction
Extracts the following passport fields:
- **Passport Number** (Required)
- **Full Name** (Required)
- **Date of Birth** (Required)
- **Nationality**
- **Gender**
- **Expiry Date**
- **Place of Birth**
- **Date of Issue**
- **Authority**
- **MRZ Data** (Machine Readable Zone)

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Drag & Drop**: Intuitive file upload with drag and drop support
- **Real-time Progress**: Live progress indicators during processing
- **Visual Feedback**: Color-coded validation and status indicators
- **Smooth Animations**: Polished transitions and hover effects

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **OCR Engine**: Tesseract.js
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Getting Started

### Prerequisites
- Node.js 16+ 
- pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Usage

1. **Upload Image**: Click the upload area or drag and drop a passport image
2. **Select Language**: Choose the language that matches your passport text
3. **Process**: Click "EXTRACT PASSPORT DATA" to start OCR processing
4. **View Results**: Review the extracted data and raw text

## File Structure

```
src/
├── components/passport/
│   ├── FileUpload.tsx          # File upload with drag & drop
│   ├── LanguageSelector.tsx    # Language selection component
│   ├── ProgressIndicator.tsx   # Processing progress display
│   ├── ResultsDisplay.tsx      # Results and validation display
│   └── index.ts               # Component exports
├── hooks/
│   ├── usePassportOCR.ts      # OCR processing logic
│   └── useFileUpload.ts       # File upload logic
├── types/
│   └── passport.ts            # TypeScript type definitions
├── utils/
│   └── passport-parser.ts     # Data parsing utilities
├── constants/
│   └── languages.ts           # Supported languages
└── pages/
    └── passport-scanner.tsx   # Main scanner page
```

## Supported Languages

| Language | Code | Flag | Native Name |
|----------|------|------|-------------|
| English | `eng` | 🇺🇸 | English |
| Urdu | `urd` | 🇵🇰 | اردو |
| Arabic | `ara` | 🇸🇦 | العربية |
| Hindi | `hin` | 🇮🇳 | हिन्दी |
| French | `fra` | 🇫🇷 | Français |
| Spanish | `spa` | 🇪🇸 | Español |
| German | `deu` | 🇩🇪 | Deutsch |
| Chinese (Simplified) | `chi_sim` | 🇨🇳 | 简体中文 |

## Supported File Formats

- **Images**: JPG, JPEG, PNG, BMP, WebP
- **Maximum Size**: 10MB
- **Quality**: High-resolution images work best

## Error Handling

The application handles various error scenarios:

- **Invalid File Type**: Shows error for unsupported formats
- **File Too Large**: Validates file size limits
- **OCR Errors**: Graceful handling of processing failures
- **Missing Fields**: Visual indicators for required vs optional fields
- **Poor Image Quality**: Suggestions for better results

## Performance Optimizations

- **Lazy Loading**: OCR engine loads only when needed
- **Memory Management**: Proper cleanup of file objects
- **Progress Tracking**: Real-time feedback during processing
- **Caching**: Language data cached for faster subsequent use

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Support**: iOS Safari, Chrome Mobile
- **Web Workers**: Utilizes Web Workers for non-blocking OCR processing

## Security Features

- **Local Processing**: No data leaves the browser
- **File Validation**: Strict file type and size validation
- **Memory Cleanup**: Automatic cleanup of sensitive data
- **No Tracking**: No analytics or tracking scripts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the browser console for error messages
2. Ensure your image is clear and well-lit
3. Try different languages if OCR accuracy is low
4. Verify file format and size requirements

---

**Note**: This application is for educational and demonstration purposes. Always ensure compliance with local laws and regulations when processing official documents. 