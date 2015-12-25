/// <reference path="../../../app.d.ts" />
/// <amd-dependency path="css!./jobs.css" />
/// <amd-dependency path="text!features/base/jobs/jobs.html" />

import angular = require('angular');
import config = require('config');
import jobsController = require('./jobs-controller');

'use strict';

export var moduleName = config.appName + '.base.jobs';
export var template = window.require('text!features/base/jobs/jobs.html');
export var controllerName = jobsController.controllerName;

angular.module(moduleName, [])
    .controller(jobsController.controllerName, jobsController.Controller);
