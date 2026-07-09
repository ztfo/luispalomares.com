// Thin wrappers around gtag. GA collects page location, user agent, and
// timestamps automatically, so events only carry site-specific fields.

const isGAvailable = () =>
  typeof window !== 'undefined' && typeof window.gtag === 'function';

export const trackEvent = (eventName, eventData = {}) => {
  if (!isGAvailable()) return;

  try {
    window.gtag('event', eventName, eventData);
  } catch (error) {
    console.warn('GA event tracking failed:', error);
  }
};

export const trackScroll = (scrollDepth) => {
  trackEvent('scroll', {
    event_category: 'User Behavior',
    event_label: `scroll_${scrollDepth}%`,
    scroll_depth: scrollDepth,
  });
};

export const trackTimeSpent = (timeSpent, pageInfo = {}) => {
  trackEvent('time_spent', {
    event_category: 'User Behavior',
    event_label: `time_spent_${Math.round(timeSpent / 1000)}s`,
    time_spent_seconds: Math.round(timeSpent / 1000),
    ...pageInfo,
  });
};

export const trackProjectEvent = (eventName, project, additionalData = {}) => {
  if (!project) return;

  trackEvent(eventName, {
    project_id: project.id,
    project_company: project.company,
    project_type: project.projectType,
    ...additionalData,
  });
};

export const trackExternalLink = ({
  url,
  label,
  category = 'External Links',
  linkType = 'unknown',
  location = 'unknown',
  additionalData = {},
}) => {
  trackEvent('external_link_click', {
    event_category: category,
    event_label: label,
    link_url: url,
    link_type: linkType,
    link_location: location,
    ...additionalData,
  });
};

export const trackTabNavigation = (fromTab, toTab, context = '') => {
  trackEvent('tab_navigation', {
    event_category: 'Navigation',
    event_label: `${toTab}_tab`,
    previous_tab: fromTab,
    new_tab: toTab,
    tab_context: context,
  });
};

export const initEnhancedAnalytics = () => {
  if (!isGAvailable() || typeof document === 'undefined') return;

  trackEvent('session_info', {
    event_category: 'Session',
    event_label: 'session_info',
    referrer: document.referrer,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  // Scroll-depth milestones (25/50/75/95), each reported once per page load.
  let scrollTimeout;
  let lastScrollDepth = 0;

  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of [95, 75, 50, 25]) {
        if (scrollPercent >= milestone && lastScrollDepth < milestone) {
          trackScroll(milestone);
          lastScrollDepth = milestone;
          break;
        }
      }
    }, 150);
  });

  document.addEventListener('visibilitychange', () => {
    trackEvent(document.hidden ? 'page_hidden' : 'page_visible', {
      event_category: 'User Behavior',
    });
  });
};
