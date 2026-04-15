'use client';

import { useEffect } from 'react';

export default function ScrollWatcher() {
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const handler = () => {
      document.documentElement.classList.add('scrolling');
      clearTimeout(t);
      t = setTimeout(() => {
        document.documentElement.classList.remove('scrolling');
      }, 800);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      clearTimeout(t);
    };
  }, []);

  return null;
}
