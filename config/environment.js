/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'megaphone-app',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    serverHost: "http://localhost:3000",
    gcmSandbox: "true",
    gcmSenderID: "<gcmSenderID>",
    stripePublishableKey: "<stripePublishableKey>",
    googleAnalyticsID: "<googleAnalyticsID>",
    appTitleShort: "Street Sense",
    appTitleFull: "Street Sense Vendor Payments",
    
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' https://www.google-analytics.com https://js.stripe.com  https://api.stripe.com",
      'font-src': "'self'",
      'connect-src': "'self'",
      'img-src': "'self' https://www.google-analytics.com",
      'style-src': "'self'",
      'media-src': "'self'"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.serverHost = "<serverHost>";
    ENV.gcmSandbox = "false";
    ENV.stripePublishableKey = "<stripePublishableKey>";
  }

  return ENV;
};
