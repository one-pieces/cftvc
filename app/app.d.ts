/// <reference path='../node_modules/node-shared-typescript-defs/angularjs/angular.d.ts' />
/// <reference path='../node_modules/node-shared-typescript-defs/angular-restmod/angular-restmod.d.ts' />
/// <reference path='../node_modules/node-shared-typescript-defs/angular-ui-router/angular-ui-router.d.ts' />
/// <reference path='../node_modules/node-shared-typescript-defs/jquery/jquery.d.ts' />

//Add type defs for the __initialContext property provided by the index.tmpl file
interface Window {
  // sessionStorage: {
  //   xsrf: string;
    // user: any;
  //   systemInfo: any;
  //   brand: any;
  //   uiVersion: string;
  // };

  // Modernizr: any;
  // Foundation: any;
  require: any;
  // define: any;
}