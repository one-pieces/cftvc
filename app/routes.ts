/// <reference path='./app.d.ts' />
/// <amd-dependency path='ui.router' />

import angular = require('angular');
import base = require('./features/base/base');
import config = require('config');
import creatorProfile = require('./features/creator/creator-profile');

'use strict';

export var moduleName = config.appName + '.routes';

angular.module(moduleName, [
    'ui.router', 
    base.moduleName, 
    creatorProfile.moduleName])
    .config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
        $stateProvider
            .state('base', {
                url: config.basePath,
                template: base.template,
                controller: base.controllerName
            })
            .state('creatorProfile', {
                url: config.basePath + '/creator/:id',
                template: creatorProfile.template,
                controller: creatorProfile.controllerName
            });
    }]);