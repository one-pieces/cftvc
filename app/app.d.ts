/// <reference path='../node_modules/node-shared-typescript-defs/angularjs/angular.d.ts' />
/// <reference path='../node_modules/node-shared-typescript-defs/angular-restmod/angular-restmod.d.ts' />
/// <reference path='../node_modules/node-shared-typescript-defs/angular-ui-router/angular-ui-router.d.ts' />
/// <reference path='../node_modules/node-shared-typescript-defs/jquery/jquery.d.ts' />
/// <reference path='../node_modules/node-shared-typescript-defs/ng-file-upload/ng-file-upload.d.ts' />

//Add type defs for the __initialContext property provided by the index.tmpl file
interface Window {
  require: any;
}

interface JQuery {
  popover: any;
}

declare module angular.restmod {
  export interface IModel<T> {
    $snapshot(): string;
    $revert(snapshot?: any): IModel<T>;
    $patch(params?: any[]): IModel<T>;
  }
}