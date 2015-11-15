/// <reference path='../../app.d.ts' />

import config = require('config');
import models = require('../../components/models');
import actors = require('../../static/data/actors');

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
                       models.user.serviceName ];
    
    actors = actors;
    actor: any;
    actorId: string;
    currentUser: models.user.IUser;
    navItems = ['作品', '文章', '照片', '合作伙伴'];

    constructor(private $scope: IScope,
                private $state: ng.ui.IStateService,
                private UserModel: models.user.IUserStatic) {
        $scope.actorProfile = this;
        this.actorId = (<IStateParams>$state.params).id;
        this.actor = this.actors[parseInt(this.actorId, 10)];
        this.UserModel.$find('_0_1').$then((user) => {
            user.ui.fullName = user.givenName + ' ' + user.familyName;
            this.currentUser = user;
            console.log('return user success, user info: ' + user.givenName);
        });
    }
}

export class Controller extends ActorProfileController {}