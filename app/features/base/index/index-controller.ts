/// <reference path='../../../app.d.ts' />

import config = require('config');
import creators = require('../../../static/data/creators');
import models = require('../../../components/models');
import videos = require('../../../static/data/videos');

'use strict';

export interface IScope extends ng.IScope {
    index?: IndexController;
}

export var controllerName = config.appName + '.base.index.controller';

/**
 * Controller for the index page
 */
export class IndexController {
    static $inject = [ '$scope',
                       models.actor.serviceName ];
    actors: models.actor.IActorCollection;
    creators = creators;
    videos = videos;

    constructor(private $scope: IScope,
                private ActorModel: models.actor.IActorStatic) {
        $scope.index = this;
        this.ActorModel.$collection().$fetch().$then((actors) => {
            this.actors = <models.actor.IActorCollection>actors;
        });
    }
}

export class Controller extends IndexController {}