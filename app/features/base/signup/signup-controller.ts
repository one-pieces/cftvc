/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');
import userService = require('../../../components/services/user/user-service');

'use strict';

export interface IScope extends ng.IScope {
    signup?: SignupController;
}

export var controllerName = config.appName + '.base.signup.controller';

/**
 * Controller for the signup page
 */
export class SignupController {
    static $inject = [ '$scope',
                       '$state',
                       models.actor.serviceName,
                       models.user.serviceName,
                       userService.serviceName ];
    actor: models.actor.IActor;
    user: models.user.IUser;
    password2 = '';

    constructor(private $scope: IScope,
                private $state: ng.ui.IStateService,
                private ActorModel: models.actor.IActorStatic,
                private UserModel: models.user.IUserStatic,
                private userService: userService.Service) {
        $scope.signup = this;
        this.user = this.UserModel.$build({
            username: '',
            mobile: '',
            email: '',
            brithday: '',
            nickname: '',
            location: '',
            gender: '',
            role: ''
        });
    }

    continue() {
        switch (this.user.role) {
            case 'actor':
                this.actor = this.ActorModel.$build({
                    nickname: this.user.nickname,
                    height: '',
                    weight: '',
                    chest: '',
                    waist: '',
                    hip: '',
                    shoseSize: '',
                    hairColor: '',
                    eyeColor: ''
                });
                break;
            case 'creator':
                // code...
                break;
            default:
                // code...
                break;
        }
    }

    submit() {
        this.userService.signup(this.user).then((user) => {
            switch (this.user.role) {
                case 'actor':
                    this.actor.$save().$then((actor) => {
                        this.$state.go('base.login');
                    });
                    break;
                case 'creator':
                    // this.creator.$save().$then((creator) => {
                    //     this.$state.go('base.login');
                    // });
                    break;
                default:
                    // code...
                    break;
            }
        }, (reason: any) => {
            console.log(reason);
        });
    }
}

export class Controller extends SignupController {}