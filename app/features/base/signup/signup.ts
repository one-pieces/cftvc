/// <reference path="../../../app.d.ts" />
/// <amd-dependency path="css!./signup.css" />
/// <amd-dependency path="text!features/base/signup/signup.html" />

import angular = require('angular');
import config = require('config');
import signupController = require('./signup-controller');

'use strict';

export var moduleName = config.appName + '.base.signup';
export var template = window.require('text!features/base/signup/signup.html');
export var controllerName = signupController.controllerName;

angular.module(moduleName, [])
    .controller(signupController.controllerName, signupController.Controller);
