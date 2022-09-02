// @ts-nocheck

import {
  chainMatch,
  isPageRequest,
  csp,
  strictDynamic,
  strictInlineStyles,
  nextSafe,
} from '@next-safe/middleware';

const cspMiddleware = csp(async ({ req }) => {
  // your CSP base configuration with IntelliSense
  // single quotes for values like 'self' are automatic
  return {
    directives: {
      'default-src': ['self'],
      'base-uri': ['self'],
      'object-src': ['none'],
      'upgrade-insecure-requests': [],
      'img-src': ['self', 'data:'],
      'script-src': ['self', 'strict-dynamic'],
      'style-src': [
        'self',
        'https://fonts.googleapis.com',
        'https://use.fontawesome.com',
      ],
      'font-src': ['https://fonts.gstatic.com', 'https://use.fontawesome.com'],
      'connect-src': ['https://www.google-analytics.com', 'ws:', 'blob:'],
    },
    isDev: false,
    reportOnly: true,
  };
});

const securityMiddleware = [
  nextSafe({ isDev: false, disableCsp: true }),
  cspMiddleware,
  strictDynamic(),
  strictInlineStyles(),
];

export default chainMatch(isPageRequest)(...securityMiddleware);
