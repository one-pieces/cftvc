/// <reference path="../../../app.d.ts" />
/// <amd-dependency path="css!./publish-work.css" />
/// <amd-dependency path="text!features/base/publish-work/publish-work.html" />

import angular = require('angular');
import config = require('config');
import publishWorkController = require('./publish-work-controller');

'use strict';

export var moduleName = config.appName + '.base.publishWork';
export var template = window.require('text!features/base/publish-work/publish-work.html');
export var controllerName = publishWorkController.controllerName;

angular.module(moduleName, [])
    .controller(publishWorkController.controllerName, publishWorkController.Controller);
