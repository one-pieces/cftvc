/// <reference path="../../../app.d.ts" />
/// <amd-dependency path="css!./works.css" />
/// <amd-dependency path="text!features/base/works/works.html" />

import angular = require('angular');
import config = require('config');
import worksController = require('./works-controller');

'use strict';

export var moduleName = config.appName + '.base.works';
export var template = window.require('text!features/base/works/works.html');
export var controllerName = worksController.controllerName;

angular.module(moduleName, [])
    .controller(worksController.controllerName, worksController.Controller);
