/// <reference path="../../../app.d.ts" />
/// <amd-dependency path="css!./signup.css" />
/// <amd-dependency path="text!features/base/signup/signup.html" />
/// <amd-dependency path="ng-file-upload" />
/// <amd-dependency path="ngImgCrop" />
/// <amd-dependency path="css!/vendor/ngImgCrop/ng-img-crop.css" />

import angular = require('angular');
import config = require('config');
import signupController = require('./signup-controller');

'use strict';

export var moduleName = config.appName + '.base.signup';
export var template = window.require('text!features/base/signup/signup.html');
export var controllerName = signupController.controllerName;

angular.module(moduleName, [ 
    'ngFileUpload',
    'ngImgCrop' ])
    .controller(signupController.controllerName, signupController.Controller);
