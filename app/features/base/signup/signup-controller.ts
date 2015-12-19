/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');

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
                       models.actor.serviceName,
                       models.creator.serviceName,
                       models.user.serviceName ];
    actor: models.actor.IActor;
    creator: models.creator.ICreator;
    user: models.user.IUser;
    password2 = '';
    type: string;

    constructor(private $scope: IScope,
                private ActorModel: models.actor.IActorStatic,
                private CreatorModel: models.creator.ICreatorStatic,
                private UserModel: models.user.IUserStatic) {
        $scope.signup = this;
        this.user = this.UserModel.$build({
            username: '',
            password: '',
            role: {
                name: '',
                id: ''
            }
        });
        $scope.$watch('signup.type', (newValue) => {
            switch (newValue) {
                case '模特':
                case '演员':
                    this.user.role.name = 'actor';
                    break;
                case '导演':
                case '摄影师':
                case '剪辑师':
                    this.user.role.name = 'creator';
                default:
                    // code...
                    break;
            }
        });
    }

    continue() {
        switch (this.user.role.name) {
            case 'actor':
                this.actor = this.ActorModel.$build({
                    nickname: '',
                    height: '',
                    weight: '',
                    chest: '',
                    waist: '',
                    hip: '',
                    shoesSize: '',
                    hairColor: '',
                    eyeColor: '',
                    givenName: '',
                    familyName: '',
                    mobile: '',
                    location: '',
                    gender: '',
                    role: 'actor',
                    type: this.type,
                    avatarUrl: '',
                    viewUrl: ''
                });
                break;
            case 'creator':
                this.creator = this.CreatorModel.$build({
                    nickname: '',
                    intro: '',
                    givenName: '',
                    familyName: '',
                    mobile: '',
                    location: '',
                    gender: '',
                    role: 'creator',
                    type: this.type,
                    avatarUrl: ''
                });
                break;
            default:
                // TODO
                break;
        }
    }
}

export class Controller extends SignupController {}