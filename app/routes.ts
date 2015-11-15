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
            .state('actorProfile', {
                url: config.basePath + '/actor/:id',
                template: actorProfile.template,
                controller: actorProfile.controllerName
            })
            .state('creatorProfile', {
                url: config.basePath + '/creator/:id',
                template: creatorProfile.template,
                controller: creatorProfile.controllerName
            })
            .state('videoDescription', {
                url: config.basePath + '/video/:id',
                template: videoDescription.template,
                controller: videoDescription.controllerName
            });
    }]);