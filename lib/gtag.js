export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
export const AW_TRACKING_ID = process.env.NEXT_PUBLIC_AW_TRACKING_ID;
export const AW_SEND_TO = process.env.NEXT_PUBLIC_AW_SEND_TO;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
  if (
    url === '/' &&
    typeof window !== 'undefined' &&
    window.location.hostname === 'risor.io'
  ) {
    window.gtag('event', 'conversion', { send_to: AW_SEND_TO });
    console.log('conversion');
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
