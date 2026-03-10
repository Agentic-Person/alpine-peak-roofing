/**
 * Google Analytics 4 Event Tracking
 * Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
 */

const GA4_MEASUREMENT_ID = 'G-4KQXFSY1DH';

// Initialize GA4 tracking
export function initializeGA4() {
  if (typeof window === 'undefined') return;

  // Check if GA4 is already loaded
  if ((window as any).gtag) return;

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(arguments);
  }
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

// Track page views
export function trackPageView(pagePath: string, pageTitle: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

// Track service page views
export function trackServiceView(serviceName: string, serviceCategory: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'view_service', {
    service_name: serviceName,
    service_category: serviceCategory,
    event_category: 'service',
    event_label: `${serviceCategory} - ${serviceName}`,
  });
}

// Track location page views
export function trackLocationView(locationName: string, elevation: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'view_location', {
    location_name: locationName,
    elevation: elevation,
    event_category: 'location',
    event_label: locationName,
  });
}

// Track estimate request clicks
export function trackEstimateRequest(source: string, serviceType?: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'estimate_request', {
    source: source,
    service_type: serviceType || 'general',
    event_category: 'conversion',
    event_label: `Estimate Request from ${source}`,
  });
}

// Track contact form submissions
export function trackContactSubmission(formType: string, serviceType?: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'contact_submission', {
    form_type: formType,
    service_type: serviceType || 'general',
    event_category: 'conversion',
    event_label: `Contact Form: ${formType}`,
  });
}

// Track phone call clicks
export function trackPhoneCall(source: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'phone_call', {
    source: source,
    event_category: 'conversion',
    event_label: `Phone Call from ${source}`,
  });
}

// Track blog post views
export function trackBlogView(postTitle: string, category: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'view_blog', {
    blog_title: postTitle,
    blog_category: category,
    event_category: 'engagement',
    event_label: postTitle,
  });
}

// Track portfolio project views
export function trackPortfolioView(projectName: string, projectType: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'view_portfolio', {
    project_name: projectName,
    project_type: projectType,
    event_category: 'engagement',
    event_label: projectName,
  });
}

// Track scroll depth
export function trackScrollDepth(percentage: number, pageName: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'scroll_depth', {
    scroll_percentage: percentage,
    page_name: pageName,
    event_category: 'engagement',
    event_label: `${percentage}% on ${pageName}`,
  });
}

// Track time on page
export function trackTimeOnPage(pageName: string, timeInSeconds: number) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'time_on_page', {
    page_name: pageName,
    time_seconds: timeInSeconds,
    event_category: 'engagement',
    event_label: pageName,
  });
}

// Track external link clicks
export function trackExternalLink(url: string, linkText: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'external_link', {
    url: url,
    link_text: linkText,
    event_category: 'engagement',
    event_label: url,
  });
}
