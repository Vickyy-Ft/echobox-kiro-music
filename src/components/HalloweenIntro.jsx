import { useState, useEffect } from 'react';
import '../styles/HalloweenIntro.css';

/**
 * HalloweenIntro — Spooky animated intro splash screen
 * 
 * Shows on first load with:
 * - Animated Halloween text
 * - Floating particles
 * - Fade-in/fade-out effects
 * - Auto-dismisses after 4 seconds or on click
 */
export function HalloweenIntro({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 4 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 600); // Wait for fade-out animation
  };

  // Handle keyboard events: Enter or Escape to dismiss
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      handleDismiss();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`halloween-intro ${isAnimating ? 'halloween-intro--active' : 'halloween-intro--exit'}`}
      onClick={handleDismiss}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label="Halloween intro splash screen"
      aria-describedby="halloween-intro-hint"
      tabIndex={0}
    >
      {/* Floating particles */}
      <div className="halloween-particles" aria-hidden="true">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="halloween-intro__content">
        <div className="halloween-intro__icon">
          🎃
        </div>
        
        <h1 className="halloween-intro__title">
          <span className="halloween-text">Happy</span>
          <span className="halloween-text halloween-text--delay-1">Halloween</span>
        </h1>
        
        <p className="halloween-intro__subtitle">
          <span className="spooky-text">EchoBox Music</span>
        </p>

        <div className="halloween-intro__bats">
          <span className="bat">🦇</span>
          <span className="bat bat--delay-1">🦇</span>
          <span className="bat bat--delay-2">🦇</span>
        </div>

        <button 
          className="halloween-intro__button"
          onClick={handleDismiss}
          aria-label="Enter EchoBox Music Studio"
        >
          Enter EchoBox Studio
        </button>

        <p className="halloween-intro__hint" id="halloween-intro-hint">
          Or press Enter / Escape to continue
        </p>
      </div>

      {/* Decorative elements */}
      <div className="halloween-intro__decorations" aria-hidden="true">
        <span className="decoration decoration--top-left">👻</span>
        <span className="decoration decoration--top-right">💀</span>
        <span className="decoration decoration--bottom-left">🕷️</span>
        <span className="decoration decoration--bottom-right">🕸️</span>
      </div>
    </div>
  );
}
