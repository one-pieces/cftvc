/// <reference path="../../app.d.ts" />
/// <amd-dependency path="css!./creator-profile.css" />
/// <amd-dependency path="text!features/creator/creator-profile.html" />

import angular = require('angular');
import config = require('config');
import creatorProfileController = require('./creator-profile-controller');
import navbarDirective = require('../../components/directives/navbar/navbar-directive');

'use strict';

export var moduleName = config.appName + '.creatorProfile';
export var template = window.require('text!features/creator/creator-profile.html');
export var controllerName = creatorProfileController.controllerName;

angular.module(moduleName, [ navbarDirective.moduleName ])
    .controller(creatorProfileController.controllerName, creatorProfileController.Controller);
