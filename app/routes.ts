/// <reference path='./app.d.ts' />
/// <amd-dependency path='ui.router' />

import angular = require('angular');
import base = require('./features/base/base');
import baseRoutes = require('./features/base/base-routes');
import config = require('config');
import actorProfile = require('./features/actor-profile/actor-profile');
import creatorProfile = require('./features/creator-profile/creator-profile');
import videoDescription = require('./features/video-description/video-description');

'use strict';

export var moduleName = config.appName + '.routes';

angular.module(moduleName, [
    'ui.router', 
    base.moduleName,
    baseRoutes.moduleName,
    actorProfile.moduleName,
    creatorProfile.moduleName,
    videoDescription.moduleName])
    .config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
        $stateProvider
            .state('base', {
                abstract: true,
                url: config.basePath,
                template: base.template,
                controller: base.controllerName
            })
            .state('show', {
                url: config.basePath + '/show/:id?role',
                templateProvider: ['$stateParams', ($stateParams: ng.ui.IStateParamsService) => {
                    var template: string;
                    switch ((<any>$stateParams).role) {
                        case 'actor':
                            template = actorProfile.template;
                            break;
                        case 'creator':
                            template = creatorProfile.template;
                            break;
                        default:
                            template = actorProfile.template;
                            break;
                    }
                    return template;
                }],
                controllerProvider: <any>['$stateParams', ($stateParams: ng.ui.IStateParamsService) => {
                    var controller: string;
                    switch ((<any>$stateParams).role) {
                        case 'actor':
                            controller = actorProfile.controllerName;
                            break;
                        case 'creator':
                            controller = creatorProfile.controllerName;
                            break;
                        default:
                            controller = actorProfile.controllerName;
                            break;
                    }
                    return controller;
                }]
            })
            .state('videoDescription', {
                url: config.basePath + '/video/:id',
                template: videoDescription.template,
                controller: videoDescription.controllerName
            });
    }]);