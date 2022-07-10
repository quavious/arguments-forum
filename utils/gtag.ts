export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const GA_URL = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;

export const pageView = (url: string) => {
  if ('gtag' in window) {
    (<any>window).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};
