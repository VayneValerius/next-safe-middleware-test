// @ts-nocheck

import {
  chainMatch,
  isPageRequest,
  csp,
  strictDynamic,
  strictInlineStyles,
  nextSafe,
} from '@next-safe/middleware';

// This is an async function that in the actual codebase changes directives based on host and path.
const cspMiddleware = csp(async ({ req }) => {
  return {
    directives: {
      'default-src': ['self', 'http://localhost:3000'],
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
      'connect-src': [
        'https://www.google-analytics.com',
        'ws:',
        'blob:',
        'http://localhost:3000',
      ],
    },
    // Don't want directives we haven't set.  Want to test csp and use csp as it would be in production
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
