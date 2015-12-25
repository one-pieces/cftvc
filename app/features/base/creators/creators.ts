/// <reference path="../../../app.d.ts" />
/// <amd-dependency path="css!./creators.css" />
/// <amd-dependency path="text!features/base/creators/creators.html" />

import angular = require('angular');
import config = require('config');
import creatorsController = require('./creators-controller');

'use strict';

export var moduleName = config.appName + '.base.creators';
export var template = window.require('text!features/base/creators/creators.html');
export var controllerName = creatorsController.controllerName;

angular.module(moduleName, [])
    .controller(creatorsController.controllerName, creatorsController.Controller);
