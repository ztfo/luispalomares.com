/**
 * Google Analytics Utility Functions
 * Provides standardized tracking methods and enhanced analytics capabilities
 */

// Check if GA is available
const isGAvailable = () => {
  return typeof window !== 'undefined' && window.gtag && typeof window.gtag === 'function';
};

// Check if browser APIs are available
const isBrowserAvailable = () => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

// Standardized event tracking
export const trackEvent = (eventName, eventData = {}) => {
  if (!isGAvailable()) return;
  
  try {
    const defaultData = {
      timestamp: Date.now(),
      page_location: window.location.href,
      page_path: window.location.pathname,
      user_agent: navigator.userAgent,
      ...eventData
    };
    
    window.gtag('event', eventName, defaultData);
  } catch (error) {
    console.warn('GA event tracking failed:', error);
  }
};

// Track user engagement metrics
export const trackEngagement = (action, details = {}) => {
  trackEvent('user_engagement', {
    event_category: 'User Engagement',
    event_label: action,
    engagement_type: action,
    ...details
  });
};

// Track scroll behavior
export const trackScroll = (scrollDepth, pageInfo = {}) => {
  trackEvent('scroll', {
    event_category: 'User Behavior',
    event_label: `scroll_${scrollDepth}%`,
    scroll_depth: scrollDepth,
    ...pageInfo
  });
};

// Track time spent on page
export const trackTimeSpent = (timeSpent, pageInfo = {}) => {
  trackEvent('time_spent', {
    event_category: 'User Behavior',
    event_label: `time_spent_${Math.round(timeSpent / 1000)}s`,
    time_spent_ms: timeSpent,
    time_spent_seconds: Math.round(timeSpent / 1000),
    ...pageInfo
  });
};

// Track project-specific events
export const trackProjectEvent = (eventName, project, additionalData = {}) => {
  if (!project) return;
  
  const projectData = {
    project_id: project.id,
    project_company: project.company,
    project_type: project.projectType,
    project_series: project.series,
    project_revenue: project.revenue,
    ...additionalData
  };
  
  trackEvent(eventName, projectData);
};

// Track external link clicks with categorization
export const trackExternalLink = (linkInfo) => {
  const {
    url,
    label,
    category = 'External Links',
    linkType = 'unknown',
    location = 'unknown',
    additionalData = {}
  } = linkInfo;
  
  trackEvent('external_link_click', {
    event_category: category,
    event_label: label,
    link_url: url,
    link_type: linkType,
    link_location: location,
    ...additionalData
  });
};

// Track navigation events
export const trackNavigation = (fromPage, toPage, navigationType = 'router') => {
  trackEvent('navigation', {
    event_category: 'Navigation',
    event_label: `${fromPage}_to_${toPage}`,
    from_page: fromPage,
    to_page: toPage,
    navigation_type: navigationType
  });
};

// Track tab navigation
export const trackTabNavigation = (fromTab, toTab, context = '') => {
  trackEvent('tab_navigation', {
    event_category: 'Navigation',
    event_label: `${toTab}_tab`,
    previous_tab: fromTab,
    new_tab: toTab,
    tab_context: context
  });
};

// Track user session information
export const trackSessionInfo = () => {
  if (!isGAvailable() || !isBrowserAvailable()) return;
  
  try {
    const sessionData = {
      event_category: 'Session',
      event_label: 'session_info',
      session_id: Date.now().toString(36),
      referrer: document.referrer,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    
    window.gtag('event', 'session_info', sessionData);
  } catch (error) {
    console.warn('Session info tracking failed:', error);
  }
};

// Initialize enhanced analytics
export const initEnhancedAnalytics = () => {
  if (!isGAvailable() || !isBrowserAvailable()) return;
  
  try {
    // Track session info on page load
    trackSessionInfo();
    
    // Set up scroll tracking
    let scrollTimeout;
    let lastScrollDepth = 0;
    
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        try {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = Math.round((scrollTop / docHeight) * 100);
          
          // Track scroll depth at 25%, 50%, 75%, and 100%
          if (scrollPercent >= 25 && lastScrollDepth < 25) {
            trackScroll(25);
            lastScrollDepth = 25;
          } else if (scrollPercent >= 50 && lastScrollDepth < 50) {
            trackScroll(50);
            lastScrollDepth = 50;
          } else if (scrollPercent >= 75 && lastScrollDepth < 75) {
            trackScroll(75);
            lastScrollDepth = 75;
          } else if (scrollPercent >= 95 && lastScrollDepth < 95) {
            trackScroll(95);
            lastScrollDepth = 95;
          }
        } catch (error) {
          console.warn('Scroll tracking failed:', error);
        }
      }, 150);
    });
    
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      try {
        if (document.hidden) {
          trackEvent('page_hidden', {
            event_category: 'User Behavior',
            event_label: 'page_hidden',
            hidden_time: Date.now()
          });
        } else {
          trackEvent('page_visible', {
            event_category: 'User Behavior',
            event_label: 'page_visible',
            visible_time: Date.now()
          });
        }
      } catch (error) {
        console.warn('Visibility tracking failed:', error);
      }
    });
  } catch (error) {
    console.warn('Enhanced analytics initialization failed:', error);
  }
};

// Export default tracking functions for easy use
export default {
  trackEvent,
  trackEngagement,
  trackScroll,
  trackTimeSpent,
  trackProjectEvent,
  trackExternalLink,
  trackNavigation,
  trackTabNavigation,
  trackSessionInfo,
  initEnhancedAnalytics
};
