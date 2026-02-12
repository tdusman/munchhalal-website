'use client';

import { useEffect } from 'react';
import { initSeedData } from '@/lib/storage';

export function SeedInitializer() {
  useEffect(() => {
    initSeedData();
  }, []);

  return null;
}
