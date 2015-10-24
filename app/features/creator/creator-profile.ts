/// <reference path="../../app.d.ts" />
/// <amd-dependency path="css!./creator-profile.css" />
/// <amd-dependency path="text!features/creator/creator-profile.html" />

import angular = require('angular');
import config = require('config');
import creatorProfileController = require('./creator-profile-controller');

'use strict';

export var moduleName = config.appName + '.creatorProfile';
export var template = window.require('text!features/creator/creator-profile.html');
export var controllerName = creatorProfileController.controllerName;

angular.module(moduleName, [])
    .controller(creatorProfileController.controllerName, creatorProfileController.Controller);
