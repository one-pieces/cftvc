/// <reference path="../../../app.d.ts" />
/// <amd-dependency path="css!./profile.css" />
/// <amd-dependency path="text!features/base/profile/profile.html" />

import angular = require('angular');
import config = require('config');
import profileController = require('./profile-controller');
import userService = require('../../../components/services/user/user-service');
import uploadImgPageDirective = require('../../../components/directives/upload-img-page/upload-img-page-directive');

'use strict';

export var moduleName = config.appName + '.base.profile';
export var template = window.require('text!features/base/profile/profile.html');
export var controllerName = profileController.controllerName;

angular.module(moduleName, [
    'ui.bootstrap', 
    userService.moduleName,
    uploadImgPageDirective.moduleName ])
    .controller(profileController.controllerName, profileController.Controller);
