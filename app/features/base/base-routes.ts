/// <reference path='../../app.d.ts' />

import actors = require('./actors/actors');
import angular = require('angular');
import base = require('./features/base/base');
import config = require('config');
import index = require('./index/index');
import login = require('./login/login');
import signup = require('./signup/signup');

'use strict';

export var moduleName = config.appName + '.base.routes';

angular.module(moduleName, [
    actors.moduleName,
    index.moduleName,
    login.moduleName,
    signup.moduleName ])
    .config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
        $stateProvider
            .state('base.index', {
                url: '',
                template: index.template,
                controller: index.controllerName
            })
            .state('base.actors', {
                url: '/actors',
                template: actors.template,
                controller: actors.controllerName
            })
            .state('base.login', {
                url: '/login',
                template: login.template,
                controller: login.controllerName
            })
            .state('base.signup', {
                url: '/signup',
                template: signup.template,
                controller: signup.controllerName
            });
    }]);