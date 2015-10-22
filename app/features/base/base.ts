/// <reference path='../../app.d.ts' />
/// <amd-dependency path='css!./base.css' />
/// <amd-dependency path='text!features/base/base.html' />

import angular = require('angular');
import baseController = require("./base-controller");
import config = require('config');
import creatorSquareDirective = require("../../components/directives/creator-square/creator-square-directive");
import models = require('../../components/models');
import scrollToFixedTopDirective = require("../../components/directives/scroll-to-fixed-top/scroll-to-fixed-top-directive");


'use strict';

export var moduleName = config.appName + '.base';
export var template = window.require('text!features/base/base.html');
export var controllerName = baseController.controllerName;

angular.module(moduleName, [
    creatorSquareDirective.moduleName,
    models.moduleName,
    scrollToFixedTopDirective.moduleName])
    .controller(baseController.controllerName, baseController.Controller);