import React, { useState, useEffect } from 'react';

interface FloatingCTAProps {
  onClick: () => void;
}

const FloatingCTA = ({ onClick }: FloatingCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-[90] md:hidden animate-in slide-in-from-bottom duration-300">
      <div className="bg-white/90 backdrop-blur-xl border-t border-gray-100 p-2 rounded-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <button
          onClick={onClick}
          className="w-full bg-cta text-primary font-black py-4 rounded-xl uppercase tracking-widest text-sm shadow-lg active:scale-95 transition-all"
        >
          Agende sua experiência
        </button>
      </div>
    </div>
  );
};

export default FloatingCTA;