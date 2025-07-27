import React, { useEffect } from 'react';

/**
 * PartnersCarousel displays a horizontally scrolling marquee of partner logos.
 * It includes a UAE-flag accent bar at the top to match the Hero section.
 */
const partnerLogos: Array<{ src?: string; alt: string }> = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/No7Brand.svg/640px-No7Brand.svg.png',
    alt: 'No7',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Legoland_logo.svg/640px-Legoland_logo.svg.png',
    alt: 'Legoland',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/76/London_Zoo_logo.svg/640px-London_Zoo_logo.svg.png',
    alt: 'London Zoo',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Warner_Bros_logo.svg/640px-Warner_Bros_logo.svg.png',
    alt: 'Warner Bros',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Disneyland_Paris_logo.svg/640px-Disneyland_Paris_logo.svg.png',
    alt: 'Disneyland Paris',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Iceland_Foods.svg/640px-Iceland_Foods.svg.png',
    alt: 'Iceland',
  },
  {
    // Placeholder entry for Better; no reliable public image was available.
    alt: 'Better',
  },
  {
    // Placeholder entry for Odeon; no reliable public image was available.
    alt: 'Odeon',
  },
];

const PartnersCarousel: React.FC = () => {
  useEffect(() => {
    // Inject keyframe animation for the horizontal scrolling effect.
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes partners-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Duplicate the logos list for seamless scrolling.
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="relative py-8 bg-white">
      {/* UAE-flag accent bar at the top, matching the hero carousel’s style */}
      <div className="absolute top-0 left-0 w-full h-1 flex">
          <div className="flex-1 bg-uae-red"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-uae-black"></div>
          <div className="flex-1 bg-uae-green"></div>
      </div>
      {/* Heading above the logos, harmonizing with site colours */}
      <p className="text-center text-uae-black text-lg md:text-xl font-medium mt-2 mb-6">
        Backed up by leading brands:
      </p>
      <div className="overflow-hidden">
        <div
          className="flex items-center whitespace-nowrap"
          style={{ animation: 'partners-scroll 30s linear infinite' }}
        >
          {logos.map((logo, idx) =>
            logo.src ? (
              <div
                key={`logo-${idx}`}
                className="mx-4 bg-white rounded-md p-3 shadow-sm flex items-center justify-center flex-shrink-0"
                style={{ width: '8rem', height: '4.5rem' }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div
                key={`logo-${idx}`}
                className="mx-4 bg-white rounded-md p-3 shadow-sm flex items-center justify-center text-md font-semibold text-gray-700 flex-shrink-0"
                style={{ width: '8rem', height: '4.5rem' }}
              >
                {logo.alt}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
