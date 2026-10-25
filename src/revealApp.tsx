import { useLayoutEffect, type ReactNode } from 'react';

/** Muestra #root solo cuando React ya ha sustituido el HTML estático. */
export function RevealApp({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-app', '');
  }, []);
  return children;
}
