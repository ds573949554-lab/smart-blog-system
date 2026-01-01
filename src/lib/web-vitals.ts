import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals';

type MetricType = 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';

interface WebVitalsMetric {
  name: MetricType;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// 性能阈值配置
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  FID: { good: 100, poor: 300 },
  INP: { good: 200, poor: 500 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};

// 获取性能评级
function getRating(name: MetricType, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// 发送性能数据到控制台（可替换为分析服务）
function sendToAnalytics(metric: WebVitalsMetric) {
  const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';

  console.group(`${emoji} Web Vitals - ${metric.name}`);
  console.log('Value:', metric.value.toFixed(2));
  console.log('Rating:', metric.rating);
  console.log('Delta:', metric.delta.toFixed(2));
  console.log('ID:', metric.id);
  console.groupEnd();

  // 在这里可以发送到分析服务
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify(metric),
  // });
}

// 初始化Web Vitals监控
export function initWebVitals() {
  try {
    onCLS((metric) => {
      sendToAnalytics({
        name: 'CLS',
        value: metric.value,
        rating: getRating('CLS', metric.value),
        delta: metric.delta,
        id: metric.id,
      });
    });

    onFCP((metric) => {
      sendToAnalytics({
        name: 'FCP',
        value: metric.value,
        rating: getRating('FCP', metric.value),
        delta: metric.delta,
        id: metric.id,
      });
    });

    onFID((metric) => {
      sendToAnalytics({
        name: 'FID',
        value: metric.value,
        rating: getRating('FID', metric.value),
        delta: metric.delta,
        id: metric.id,
      });
    });

    onINP((metric) => {
      sendToAnalytics({
        name: 'INP',
        value: metric.value,
        rating: getRating('INP', metric.value),
        delta: metric.delta,
        id: metric.id,
      });
    });

    onLCP((metric) => {
      sendToAnalytics({
        name: 'LCP',
        value: metric.value,
        rating: getRating('LCP', metric.value),
        delta: metric.delta,
        id: metric.id,
      });
    });

    onTTFB((metric) => {
      sendToAnalytics({
        name: 'TTFB',
        value: metric.value,
        rating: getRating('TTFB', metric.value),
        delta: metric.delta,
        id: metric.id,
      });
    });
  } catch (error) {
    console.error('Web Vitals初始化失败:', error);
  }
}

// 性能报告类型
export interface PerformanceReport {
  timestamp: number;
  url: string;
  metrics: {
    cls?: number;
    fcp?: number;
    fid?: number;
    inp?: number;
    lcp?: number;
    ttfb?: number;
  };
  ratings: {
    cls?: 'good' | 'needs-improvement' | 'poor';
    fcp?: 'good' | 'needs-improvement' | 'poor';
    fid?: 'good' | 'needs-improvement' | 'poor';
    inp?: 'good' | 'needs-improvement' | 'poor';
    lcp?: 'good' | 'needs-improvement' | 'poor';
    ttfb?: 'good' | 'needs-improvement' | 'poor';
  };
}

// 获取当前页面性能报告
export function getPerformanceReport(): Promise<PerformanceReport> {
  return new Promise((resolve) => {
    const report: PerformanceReport = {
      timestamp: Date.now(),
      url: window.location.href,
      metrics: {},
      ratings: {},
    };

    // 收集所有指标
    const metrics: Partial<Record<MetricType, WebVitalsMetric>> = {};
    let collectedCount = 0;
    const totalMetrics = 6;

    const checkComplete = () => {
      if (collectedCount >= totalMetrics) {
        resolve(report);
      }
    };

    onCLS((metric) => {
      metrics.CLS = {
        name: 'CLS',
        value: metric.value,
        rating: getRating('CLS', metric.value),
        delta: metric.delta,
        id: metric.id,
      };
      report.metrics.cls = metric.value;
      report.ratings.cls = metrics.CLS.rating;
      collectedCount++;
      checkComplete();
    });

    onFCP((metric) => {
      metrics.FCP = {
        name: 'FCP',
        value: metric.value,
        rating: getRating('FCP', metric.value),
        delta: metric.delta,
        id: metric.id,
      };
      report.metrics.fcp = metric.value;
      report.ratings.fcp = metrics.FCP.rating;
      collectedCount++;
      checkComplete();
    });

    onFID((metric) => {
      metrics.FID = {
        name: 'FID',
        value: metric.value,
        rating: getRating('FID', metric.value),
        delta: metric.delta,
        id: metric.id,
      };
      report.metrics.fid = metric.value;
      report.ratings.fid = metrics.FID.rating;
      collectedCount++;
      checkComplete();
    });

    onINP((metric) => {
      metrics.INP = {
        name: 'INP',
        value: metric.value,
        rating: getRating('INP', metric.value),
        delta: metric.delta,
        id: metric.id,
      };
      report.metrics.inp = metric.value;
      report.ratings.inp = metrics.INP.rating;
      collectedCount++;
      checkComplete();
    });

    onLCP((metric) => {
      metrics.LCP = {
        name: 'LCP',
        value: metric.value,
        rating: getRating('LCP', metric.value),
        delta: metric.delta,
        id: metric.id,
      };
      report.metrics.lcp = metric.value;
      report.ratings.lcp = metrics.LCP.rating;
      collectedCount++;
      checkComplete();
    });

    onTTFB((metric) => {
      metrics.TTFB = {
        name: 'TTFB',
        value: metric.value,
        rating: getRating('TTFB', metric.value),
        delta: metric.delta,
        id: metric.id,
      };
      report.metrics.ttfb = metric.value;
      report.ratings.ttfb = metrics.TTFB.rating;
      collectedCount++;
      checkComplete();
    });

    // 超时保护
    setTimeout(() => {
      if (collectedCount < totalMetrics) {
        console.warn('部分性能指标未收集完成，返回当前结果');
        resolve(report);
      }
    }, 5000);
  });
}
