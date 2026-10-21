'use client';

import { useEffect } from 'react';
import { createScope } from '@/lib/scope';
import behaviors from '@/lib/behaviors';

// Liga os comportamentos de lib/behaviors ao HTML já renderizado no build.
// Cada um recebe um escopo; ao desmontar, o escopo desfaz eventos, observers e timers.
export default function Behavior() {
  useEffect(() => {
    const scope = createScope();
    behaviors.forEach((run) => {
      try { run(scope); } catch (e) { console.error(e); }
    });
    return () => scope.dispose();
  }, []);
  return null;
}
