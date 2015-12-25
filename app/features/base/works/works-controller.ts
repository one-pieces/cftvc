/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');

'use strict';

export interface IScope extends ng.IScope {
    worksPage?: WorksController;
}

export var controllerName = config.appName + '.base.works.controller';

/**
 * Controller for the works page
 */
export class WorksController {
    static $inject = [ '$scope',
                       models.work.serviceName ];
    works: models.work.IWorkCollection;

    constructor(private $scope: IScope,
                private workModel: models.work.IWorkStatic) {
        $scope.worksPage = this;
        this.workModel.$collection().$fetch().$then((works) => {
            this.works = <models.work.IWorkCollection>works;
        });
    }
}

export class Controller extends WorksController  {}