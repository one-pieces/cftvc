/// <reference path="../../../app.d.ts" />
/// <amd-dependency path="css!./actors.css" />
/// <amd-dependency path="text!features/base/actors/actors.html" />

import actorSlickDirective = require("../../../components/directives/actor-slick/actor-slick-directive");
import angular = require('angular');
import config = require('config');
import actorsController = require('./actors-controller');

'use strict';

export var moduleName = config.appName + '.base.actors';
export var template = window.require('text!features/base/actors/actors.html');
export var controllerName = actorsController.controllerName;

angular.module(moduleName, [
    actorSlickDirective.moduleName])
    .controller(actorsController.controllerName, actorsController.Controller);
