'use client';
import { useEffect } from 'react';

export function useLandingReveals() {
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) return;
    const elements = document.querySelectorAll<HTMLElement>(
      '#main .section-heading, #main .companions, #main .principle-visual, #main .principle, #main .get-started-copy, #main .install-panel, #main .faq-list, #main .closing'
    );
    const reveal = (element: HTMLElement) => {
      element.removeAttribute('data-reveal');
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    elements.forEach(element => {
      if (element.getBoundingClientRect().top > innerHeight) {
        element.dataset.reveal = 'pending';
        observer.observe(element);
      }
    });
    const showFocused = (event: FocusEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>('[data-reveal]');
      if (element) reveal(element);
    };
    const showAll = () => { if (motion.matches) elements.forEach(reveal); };
    document.addEventListener('focusin', showFocused);
    motion.addEventListener('change', showAll);
    return () => {
      observer.disconnect();
      elements.forEach(element => element.removeAttribute('data-reveal'));
      document.removeEventListener('focusin', showFocused);
      motion.removeEventListener('change', showAll);
    };
  }, []);
}
