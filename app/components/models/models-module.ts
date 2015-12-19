/// <reference path='../../app.d.ts' />
/// <amd-dependency path='restmod' />

import angular = require('angular');
import config = require('config');
import utilities = require('./utilities/utilities');

'use strict';

var mod = angular.module(config.appName + '.models', [ 'restmod', utilities.moduleName]);
export = mod;