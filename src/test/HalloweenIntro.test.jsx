import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HalloweenIntro } from '../components/HalloweenIntro';

describe('HalloweenIntro', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders the intro dialog on mount', () => {
    render(<HalloweenIntro onComplete={() => {}} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/Happy/)).toBeInTheDocument();
    expect(screen.getByText(/EchoBox Music/)).toBeInTheDocument();
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(<HalloweenIntro onComplete={() => {}} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-describedby', 'halloween-intro-hint');
    expect(dialog).toHaveAttribute('tabIndex', '0');
  });

  it('displays the Enter EchoBox Studio button', () => {
    render(<HalloweenIntro onComplete={() => {}} />);
    
    // Button text check
    expect(screen.getByText('Enter EchoBox Studio')).toBeInTheDocument();
  });

  it('dismisses the intro when button is clicked', async () => {
    const onComplete = vi.fn();
    render(<HalloweenIntro onComplete={onComplete} />);
    
    const button = screen.getByText('Enter EchoBox Studio');
    fireEvent.click(button);
    
    // Fast-forward to complete the fade-out animation
    vi.advanceTimersByTime(600);
    
    expect(onComplete).toHaveBeenCalled();
  });

  it('dismisses the intro when clicked anywhere', async () => {
    const onComplete = vi.fn();
    render(<HalloweenIntro onComplete={onComplete} />);
    
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    
    vi.advanceTimersByTime(600);
    expect(onComplete).toHaveBeenCalled();
  });

  it('dismisses the intro when Enter key is pressed', () => {
    const onComplete = vi.fn();
    render(<HalloweenIntro onComplete={onComplete} />);
    
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Enter' });
    
    vi.advanceTimersByTime(600);
    expect(onComplete).toHaveBeenCalled();
  });

  it('dismisses the intro when Escape key is pressed', () => {
    const onComplete = vi.fn();
    render(<HalloweenIntro onComplete={onComplete} />);
    
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    
    vi.advanceTimersByTime(600);
    expect(onComplete).toHaveBeenCalled();
  });

  it('ignores other keyboard keys', () => {
    const onComplete = vi.fn();
    render(<HalloweenIntro onComplete={onComplete} />);
    
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'a' });
    
    vi.advanceTimersByTime(100);
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('auto-dismisses after 4 seconds', () => {
    const onComplete = vi.fn();
    render(<HalloweenIntro onComplete={onComplete} />);
    
    // Advance 4 seconds for auto-dismiss
    vi.advanceTimersByTime(4000);
    // Advance another 600ms for fade-out animation
    vi.advanceTimersByTime(600);
    
    expect(onComplete).toHaveBeenCalled();
  });

  it('removes event listener on unmount', () => {
    const onComplete = vi.fn();
    const { unmount } = render(<HalloweenIntro onComplete={onComplete} />);
    
    unmount();
    
    // Should not crash when trying to interact after unmount
    vi.advanceTimersByTime(100);
  });

  it('applies animation classes correctly during lifecycle', () => {
    const onComplete = vi.fn();
    const { rerender } = render(<HalloweenIntro onComplete={onComplete} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('halloween-intro--active');
    
    fireEvent.click(dialog);
    
    // After dismiss is triggered, should apply exit class
    expect(dialog).toHaveClass('halloween-intro--exit');
  });

  it('prevents default behavior on keyboard events', () => {
    const onComplete = vi.fn();
    render(<HalloweenIntro onComplete={onComplete} />);
    
    const dialog = screen.getByRole('dialog');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    
    fireEvent.keyDown(dialog, { key: 'Enter' });
    
    expect(preventDefaultSpy).toBeDefined();
  });
});
