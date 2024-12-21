// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  

  //API
   production: false,
   serverPath: 'https://localhost:8091/',  //local

  // production: true,
 //  serverPath: 'https://nutemapi.skywardcloud.com/',

    production: true,
  // serverPath: 'https://localhost:8001/',
  //  serverPath: 'http://52.242.34.91:8002/',
   serverPath: 'http://44.223.178.13:8091/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
