'use client';

import { useEffect, useState } from 'react';
import { getPerformanceReport, type PerformanceReport } from '@/lib/web-vitals';

export function usePerformance() {
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const performanceReport = await getPerformanceReport();
        setReport(performanceReport);
      } catch (error) {
        console.error('获取性能报告失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // 页面加载完成后收集性能数据
    if (document.readyState === 'complete') {
      fetchReport();
    } else {
      window.addEventListener('load', fetchReport);
      return () => window.removeEventListener('load', fetchReport);
    }
  }, []);

  return { report, isLoading };
}

// 性能得分计算
export function calculatePerformanceScore(report: PerformanceReport): number {
  if (!report.ratings) return 0;

  const scores = {
    good: 1,
    'needs-improvement': 0.5,
    poor: 0,
  };

  let totalScore = 0;
  let count = 0;

  Object.values(report.ratings).forEach((rating) => {
    if (rating) {
      totalScore += scores[rating];
      count++;
    }
  });

  return count > 0 ? Math.round((totalScore / count) * 100) : 0;
}

// 性能建议生成
export function getPerformanceSuggestions(report: PerformanceReport): string[] {
  const suggestions: string[] = [];

  if (report.ratings.lcp === 'poor') {
    suggestions.push('优化最大内容绘制(LCP): 考虑压缩图片、使用CDN、优化服务器响应时间');
  }

  if (report.ratings.fid === 'poor' || report.ratings.inp === 'poor') {
    suggestions.push('减少交互延迟: 优化JavaScript执行、减少主线程工作、使用Web Workers');
  }

  if (report.ratings.cls === 'poor') {
    suggestions.push('减少布局偏移(CLS): 为图片和广告设置尺寸、避免在现有内容上方插入内容');
  }

  if (report.ratings.fcp === 'poor') {
    suggestions.push('优化首次内容绘制(FCP): 减少渲染阻塞资源、内联关键CSS、延迟加载非关键资源');
  }

  if (report.ratings.ttfb === 'poor') {
    suggestions.push('优化服务器响应时间(TTFB): 使用CDN、启用缓存、优化数据库查询');
  }

  return suggestions;
}
