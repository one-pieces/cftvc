/// <reference path='./app.d.ts' />
/// <amd-dependency path='bootstrap-css' />
/// <amd-dependency path='css!/vendor/bootstrap-css/bootstrap.min.css' />
/// <amd-dependency path='css!/styles/default.css' />

import $ = require('jquery');
import angular = require('angular');
import config = require('config');
import routes = require('./routes');
import avatarDirective = require('./components/directives/avatar/avatar-directive');

'use strict';

var moduleName = config.appName;

var app = angular.module(moduleName, [routes.moduleName, avatarDirective.moduleName]);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', 
    function($urlRouterProvider: ng.ui.IUrlRouterProvider, 
        $stateProvider: ng.ui.IStateProvider, 
        $locationProvider: ng.ILocationProvider) {
        $urlRouterProvider
            .when('/', config.basePath)
            .otherwise(config.basePath);

        $locationProvider.html5Mode(true);
    }]);

export function init() {   
    $(document).ready(() => {
        angular.bootstrap(document.documentElement, [moduleName], {strictDi: true});
    });
}