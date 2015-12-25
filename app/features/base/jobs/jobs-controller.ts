/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');

'use strict';

export interface IScope extends ng.IScope {
    jobsPage?: JobsController;
}

export var controllerName = config.appName + '.base.jobs.controller';

/**
 * Controller for the jobs page
 */
export class JobsController {
    static $inject = [ '$scope' ];

    constructor(private $scope: IScope) {
        $scope.jobsPage = this;
    }
}

export class Controller extends JobsController  {}