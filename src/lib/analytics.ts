// Analytics tracking helper for Google Analytics & Local Publisher Management

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const LOCAL_VISITOR_STATS_KEY = 'quynh_hoa_visitor_stats_v1';

export interface VisitorStats {
  totalViews: number;
  uniqueSessions: number;
  lastVisitedAt: string;
  chatMessagesSent: number;
}

export function initAnalyticsTrack() {
  try {
    // Record local visitor analytics
    const saved = localStorage.getItem(LOCAL_VISITOR_STATS_KEY);
    let stats: VisitorStats = saved
      ? JSON.parse(saved)
      : { totalViews: 0, uniqueSessions: 0, lastVisitedAt: '', chatMessagesSent: 0 };

    stats.totalViews += 1;
    stats.lastVisitedAt = new Date().toLocaleString('vi-VN');

    // Check if new session
    if (!sessionStorage.getItem('quynh_hoa_session_active')) {
      sessionStorage.setItem('quynh_hoa_session_active', 'true');
      stats.uniqueSessions += 1;
    }

    localStorage.setItem(LOCAL_VISITOR_STATS_KEY, JSON.stringify(stats));

    // Trigger GA pageview
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Quỳnh Hoa Story Studio',
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  } catch (e) {
    console.error('Analytics init error:', e);
  }
}

export function trackAnalyticsEvent(eventName: string, params: Record<string, any> = {}) {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
    }

    // Update local chat message count if relevant
    if (eventName === 'send_chat_message') {
      const saved = localStorage.getItem(LOCAL_VISITOR_STATS_KEY);
      if (saved) {
        const stats: VisitorStats = JSON.parse(saved);
        stats.chatMessagesSent += 1;
        localStorage.setItem(LOCAL_VISITOR_STATS_KEY, JSON.stringify(stats));
      }
    }
  } catch (e) {
    console.error('Analytics event error:', e);
  }
}

export function getVisitorStats(): VisitorStats {
  try {
    const saved = localStorage.getItem(LOCAL_VISITOR_STATS_KEY);
    return saved
      ? JSON.parse(saved)
      : { totalViews: 1, uniqueSessions: 1, lastVisitedAt: 'Vừa xong', chatMessagesSent: 0 };
  } catch {
    return { totalViews: 1, uniqueSessions: 1, lastVisitedAt: 'Vừa xong', chatMessagesSent: 0 };
  }
}
