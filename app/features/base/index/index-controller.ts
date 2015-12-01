/// <reference path='../../../app.d.ts' />

import config = require('config');
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
                       models.actor.serviceName,
                       models.creator.serviceName ];
    actors: models.actor.IActorCollection;
    creators: models.creator.ICreatorCollection;
    videos = videos;

    constructor(private $scope: IScope,
                private ActorModel: models.actor.IActorStatic,
                private CreatorModel: models.creator.ICreatorStatic) {
        $scope.index = this;
        this.ActorModel.$collection().$fetch().$then((actors) => {
            this.actors = <models.actor.IActorCollection>actors;
        });
        this.CreatorModel.$collection().$fetch().$then((creators) => {
            this.creators = <models.creator.ICreatorCollection>creators;
        });
    }
}

export class Controller extends IndexController {}