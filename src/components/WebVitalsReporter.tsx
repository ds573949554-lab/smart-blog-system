'use client';

import { useEffect } from 'react';
import { initWebVitals } from '@/lib/web-vitals';

export function WebVitalsReporter() {
  useEffect(() => {
    // 仅在生产环境或需要时启用
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS === 'true') {
      initWebVitals();
    }
  }, []);

  return null;
}
