import { useEffect } from 'react';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function useGoogleTranslate() {
  useEffect(() => {
    // Inject Google Translate script only once
    const addGoogleTranslateScript = () => {
      if (document.getElementById('google-translate-script')) return;

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Callback for when Google Translate is ready
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en', // your default site language
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Ensure hidden container exists
    if (!document.getElementById('google_translate_element')) {
      const container = document.createElement('div');
      container.id = 'google_translate_element';
      container.style.display = 'none'; // hide the default dropdown
      document.body.appendChild(container);
    }

    addGoogleTranslateScript();
  }, []);
}
