import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import useGoogleTranslate from './../hooks/useGoogleTranslate'

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize Google Translate
  useGoogleTranslate();

  // Hide Google Translate default elements
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      #google_translate_element {
        display: none !important;
      }
      .goog-te-banner-frame {
        display: none !important;
      }
      .goog-te-menu-value {
        display: none !important;
      }
      body {
        top: 0 !important;
      }
      .goog-te-gadget {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const waitForGoogleTranslate = (callback: () => void) => {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const googleTranslateCombo = document.querySelector('.goog-te-combo');
      if (googleTranslateCombo) {
        console.log('[GoogleTranslate] Combo is now available after', attempts, 'attempts');
        clearInterval(interval);
        callback();
      }
      if (attempts > 50) { // ~25s timeout
        console.error('[GoogleTranslate] Combo never appeared');
        clearInterval(interval);
      }
    }, 500);
  };

  const triggerGoogleTranslate = (languageCode: string) => {
    waitForGoogleTranslate(() => {
      const googleTranslateCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (!googleTranslateCombo) return;

      console.log('[GoogleTranslate] Switching language to:', languageCode);
      googleTranslateCombo.value = languageCode;

      googleTranslateCombo.dispatchEvent(new Event('change', { bubbles: true }));
      googleTranslateCombo.dispatchEvent(new Event('input', { bubbles: true }));

      console.log('[GoogleTranslate] Language changed to:', googleTranslateCombo.value);
    });
  };

  const handleLanguageChange = (language: Language) => {
    console.log('[LanguageSelector] User selected:', language);
    setCurrentLanguage(language);
    setIsOpen(false);
    triggerGoogleTranslate(language.code);
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden"></div>

      {/* Custom Language Selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-white border border-white/20 hover:border-white/40"
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLanguage.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                currentLanguage.code === language.code ? 'bg-uae-green/10 text-uae-green' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {currentLanguage.code === language.code && (
                <div className="ml-auto w-2 h-2 bg-uae-green rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
