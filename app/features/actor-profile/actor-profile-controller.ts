/// <reference path='../../app.d.ts' />

import config = require('config');
import models = require('../../components/models');

'use strict';

export interface IScope extends ng.IScope {
    actorProfile?: ActorProfileController;
}

export interface IStateParams extends ng.ui.IStateParamsService {
    id: string;
}

export var controllerName = config.appName + '.actorProfile.controller';

/**
 * Controller for the actorProfile page
 */
export class ActorProfileController {
    static $inject = [ '$scope',
                       '$state',
                       models.actor.serviceName ];

    actorId: string;
    actor: models.actor.IActor;
    navItems = ['作品', '文章', '照片', '合作伙伴'];

    constructor(private $scope: IScope,
                private $state: ng.ui.IStateService,
                private ActorModel: models.actor.IActorStatic) {
        $scope.actorProfile = this;
        this.actorId = (<IStateParams>$state.params).id;
        this.ActorModel.$find(this.actorId).$then((actor: models.actor.IActor) => {
            this.actor = actor;
        });
    }
}

export class Controller extends ActorProfileController {}