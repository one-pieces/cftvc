/// <reference path="../../app.d.ts" />
/// <amd-dependency path="css!./video-description.css" />
/// <amd-dependency path="text!features/video/video-description.html" />

import angular = require('angular');
import config = require('config');
import videoDescriptionController = require('./video-description-controller');
import navbarDirective = require('../../components/directives/navbar/navbar-directive');

'use strict';

export var moduleName = config.appName + '.videoDescription';
export var template = window.require('text!features/video/video-description.html');
export var controllerName = videoDescriptionController.controllerName;

angular.module(moduleName, [navbarDirective.moduleName])
    .controller(videoDescriptionController.controllerName, videoDescriptionController.Controller);
