/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');
import userService = require('../../../components/services/user/user-service');

'use strict';

export interface IScope extends ng.IScope {
    profile?: ProfileController;
}

export var controllerName = config.appName + '.base.profile.controller';

/**
 * Controller for the profile page
 */
export class ProfileController {
    static $inject = [ '$scope',
                       models.actor.serviceName,
                       models.creator.serviceName,
                       userService.serviceName ];
    newPassword: string;
    newPassword2: string;
    oldPassword: string;
    actor: models.actor.IActor;
    creator: models.creator.ICreator;
    user: models.user.IUser;

    constructor(private $scope: IScope,
                private ActorModel: models.actor.IActorStatic,
                private CreatorModel: models.creator.ICreatorStatic,
                private userService: userService.Service) {
        $scope.profile = this;
        this.userService.me(true).then((user) => {
            this.user = user;
            switch (this.user.role.name) {
                case 'actor':
                    this.ActorModel.$find(this.user.role.id).$then((actor) => {
                        this.actor = actor;
                    });
                    break;
                case 'creator':
                    this.CreatorModel.$find(this.user.role.id).$then((creator) => {
                        this.creator = creator;
                    });
                    break;
                default:
                    // code...
                    break;
            }
        }, (reason: any) => {
            console.log(reason);
        });
    }

    save() {
        var hashPassword = this.userService.md5Hash(this.oldPassword);
        this.user.comparePassword(hashPassword).then((result) => {
            if (result) {
                if (this.newPassword2 === this.newPassword) {
                    this.user.password = this.userService.md5Hash(this.newPassword);
                    this.user.$patch().$then((user) => {
                        this.user = user;
                    });
                } else {
                    alert('两次新密码不对');
                }
            } else {
                alert('密码错误');
            }
        });
    }

    saveActor() {
        this.actor.$patch().$then((actor) => {
             this.actor = actor;
        });
    }

    saveCreator() {
        this.creator.$patch().$then((creator) => {
             this.creator = creator;
        });
    }
}

export class Controller extends ProfileController {}