// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   //  baseAPIURL: "http://tredoapi.azurewebsites.net/api",
   // baseAPIURL:"https://tredo.awan-is.com/api",
baseAPIURL: "https://api.tredo.biz/api",
  mapbox: {
    accessToken: 'pk.eyJ1IjoiZXNsYW1tb2hhbWVkNDEiLCJhIjoiY2t0OXJ0ZGR5MWY2eTJwanB4MXM2aW5yNSJ9.d5ptPfxXSbC2fynF04D2ZQ'
  },
  moyser:{
    publishable_test_api_key:'pk_test_JoANs5SCVhbcWSEcoANX9Ho4UFt4SF5SSmWqv6UU',
    publishable_live_api_key:'pk_live_jX8fpQD6JrJMYdftKc83Y9TvEdrv9uJWamvPRyBc'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
