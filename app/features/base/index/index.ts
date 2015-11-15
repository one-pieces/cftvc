/// <reference path="../../../app.d.ts" />
/// <amd-dependency path="css!./index.css" />
/// <amd-dependency path="text!features/base/index/index.html" />

import actorGridDirective = require("../../../components/directives/actor-grid/actor-grid-directive");
import angular = require('angular');
import config = require('config');
import creatorSquareDirective = require("../../../components/directives/creator-square/creator-square-directive");
import indexController = require('./index-controller');
import slickDirective = require("../../../components/directives/slick/slick-directive");
import workGridDirective = require("../../../components/directives/work-grid/work-grid-directive");

'use strict';

export var moduleName = config.appName + '.base.index';
export var template = window.require('text!features/base/index/index.html');
export var controllerName = indexController.controllerName;

angular.module(moduleName, [
    actorGridDirective.moduleName,
    creatorSquareDirective.moduleName,
    slickDirective.moduleName,
    workGridDirective.moduleName])
    .controller(indexController.controllerName, indexController.Controller);
