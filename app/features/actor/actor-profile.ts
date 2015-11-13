/// <reference path="../../app.d.ts" />
/// <amd-dependency path="css!./actor-profile.css" />
/// <amd-dependency path="text!features/actor/actor-profile.html" />

import angular = require('angular');
import config = require('config');
import actorProfileController = require('./actor-profile-controller');
import navbarDirective = require('../../components/directives/navbar/navbar-directive');

'use strict';

export var moduleName = config.appName + '.actorProfile';
export var template = window.require('text!features/actor/actor-profile.html');
export var controllerName = actorProfileController.controllerName;

angular.module(moduleName, [ navbarDirective.moduleName ])
    .controller(actorProfileController.controllerName, actorProfileController.Controller);
