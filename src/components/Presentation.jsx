import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

export const Presentation = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalSlides = React.Children.count(children);
  const timeoutRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  const resetTimer = useCallback(() => {
    setControlsVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      resetTimer();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') nextSlide();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
      else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      else if (e.key === 'Escape') exitFullscreen();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', resetTimer);
    };
  }, [nextSlide, prevSlide, toggleFullscreen, exitFullscreen, resetTimer]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* Slides Container */}
      {React.Children.map(children, (child, index) => {
        let stateClass = '';
        if (index < currentSlide) stateClass = 'opacity-0 scale-95 pointer-events-none';
        else if (index > currentSlide) stateClass = 'opacity-0 scale-105 pointer-events-none';
        else stateClass = 'opacity-100 scale-100 pointer-events-auto z-20';

        return (
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${stateClass}`}
          >
            {child}
          </div>
        );
      })}

      {/* Top Right Hint */}
      <div
        className={`absolute top-[4%] right-[5.2%] text-[11px] text-white/40 z-50 transition-opacity duration-300 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        ← → Navigate · F Fullscreen
      </div>

      {/* Bottom Navigation */}
      <div
        className={`absolute bottom-0 left-0 w-full px-[5.2%] pb-[4%] flex items-center justify-between z-50 transition-opacity duration-300 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-[13px] text-white/50 tabular-nums font-medium">
          {currentSlide + 1} / {totalSlides}
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-[24px] bg-white/90' : 'w-[6px] bg-white/30'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-[clamp(8px,1vw,16px)] text-white/50">
          <button onClick={prevSlide} className="hover:text-white/90 hover:bg-white/10 p-2 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} className="hover:text-white/90 hover:bg-white/10 p-2 rounded-full transition-colors">
            <ChevronRight size={20} />
          </button>
          <div className="w-[1px] h-[16px] bg-white/30" />
          <button onClick={toggleFullscreen} className="hover:text-white/90 hover:bg-white/10 p-2 rounded-full transition-colors">
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
