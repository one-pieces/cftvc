/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');

'use strict';

export interface IScope extends ng.IScope {
    actorsPage?: ActorsController;
}

export var controllerName = config.appName + '.base.actors.controller';

/**
 * Controller for the actors page
 */
export class ActorsController {
    static $inject = [ '$scope',
                       models.actor.serviceName ];
    actors: models.actor.IActorCollection;

    constructor(private $scope: IScope,
                private ActorModel: models.actor.IActorStatic) {
        $scope.actorsPage = this;
        this.ActorModel.$collection().$fetch().$then((actors) => {
            this.actors = <models.actor.IActorCollection>actors;
        });
    }
}

export class Controller extends ActorsController {}