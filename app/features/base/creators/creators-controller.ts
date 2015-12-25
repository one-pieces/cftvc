/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');

'use strict';

export interface IScope extends ng.IScope {
    creatorsPage?: CreatorsController;
}

export var controllerName = config.appName + '.base.creators.controller';

/**
 * Controller for the creators page
 */
export class CreatorsController {
    static $inject = [ '$scope',
                       models.creator.serviceName ];
    creators: models.creator.ICreatorCollection;

    constructor(private $scope: IScope,
                private CreatorModel: models.creator.ICreatorStatic) {
        $scope.creatorsPage = this;
        this.CreatorModel.$collection().$fetch().$then((creators) => {
            this.creators = <models.creator.ICreatorCollection>creators;
        });
    }
}

export class Controller extends CreatorsController  {}