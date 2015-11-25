/// <reference path='./app.d.ts' />
/// <amd-dependency path='angular-bootstrap' />
/// <amd-dependency path='bootstrap-css' />
/// <amd-dependency path='css!/vendor/bootstrap-css/bootstrap.min.css' />
/// <amd-dependency path='css!/styles/default.css' />

import $ = require('jquery');
import angular = require('angular');
import config = require('config');
import routes = require('./routes');
import avatarDirective = require('./components/directives/avatar/avatar-directive');
import confirmationNeededDirective = require('./components/directives/confirmation-needed/confirmation-needed-directive');

'use strict';

var moduleName = config.appName;

var app = angular.module(moduleName, [
    routes.moduleName, 
    avatarDirective.moduleName,
    confirmationNeededDirective.moduleName]);

app.config(['$urlRouterProvider', 
            '$stateProvider', 
            '$locationProvider', 
            '$httpProvider',
    function($urlRouterProvider: ng.ui.IUrlRouterProvider, 
        $stateProvider: ng.ui.IStateProvider, 
        $locationProvider: ng.ILocationProvider,
        $httpProvider: ng.IHttpProvider) {
        $urlRouterProvider
            .when('/', config.basePath)
            .otherwise(config.basePath);

        $locationProvider.html5Mode(true);

        // All requests will be intercepted to put the authorization into the request header
        $httpProvider.interceptors.push(['$q', '$injector', function($q, $injector) {
            return {
                'request': function(config) {
                    config.headers = config.headers || {};
                    var token = (<any>window.sessionStorage).token;
                    if (token) {
                        (<any>config.headers).Authorization = 'Bearer ' + token;
                    }
                    return config;
                },
                'responseError': function(rejection) {
                    if (rejection.status === 401 || rejection.status === 403) {
                        var stateService = $injector.get('$state');
                        stateService.go('base.login');
                    }
                    return $q.reject(rejection);
                }
            }
        }]);
    }]);

export function init() {   
    $(document).ready(() => {
        angular.bootstrap(document.documentElement, [moduleName], {strictDi: true});
    });
}