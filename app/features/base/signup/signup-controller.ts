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
                       'Upload',
                       models.actor.serviceName,
                       models.creator.serviceName,
                       models.user.serviceName,
                       userService.serviceName ];
    actor: models.actor.IActor;
    creator: models.creator.ICreator;
    user: models.user.IUser;
    password2 = '';
    type: string;

    constructor(private $scope: IScope,
                private $state: ng.ui.IStateService,
                private $upload: ng.angularFileUpload.IUploadService,
                private ActorModel: models.actor.IActorStatic,
                private CreatorModel: models.creator.ICreatorStatic,
                private UserModel: models.user.IUserStatic,
                private userService: userService.Service) {
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

    submit(avatarUrl: string, viewFile: File) {
        var fileName: string;
        switch (this.user.role.name) {
            case 'actor':
                fileName = this.actor.nickname;
                break;
            case 'creator':
                fileName = this.creator.nickname;
                break;
            default:
                fileName = 'nickname';
                break;
        }
        fileName = fileName + '_' + this.user.username;
        this.$upload.upload({
            url: config.apiBasePath + '/v1/user/uploadAvatar',
            method: 'POST',
            file: (<any>this.$upload).dataUrltoBlob(avatarUrl, fileName)
        }).success((response: any) => {
            switch (this.user.role.name) {
                case 'actor':
                    this.actor.avatarUrl = response.data;
                    this.$upload.upload({
                        url: config.apiBasePath + '/v1/user/uploadView',
                        method: 'POST',
                        file: (<any>this.$upload).rename(viewFile, fileName)
                    }).success((response: any) => {
                        this.actor.viewUrl = response.data;
                        this.actor.$save().$then((actor) => {
                            this.user.role.id = actor._id;
                            this.userService.signup(this.user).then((user) => {
                                this.$state.go('base.login');
                            }, (reason: any) => {
                                console.log(reason);
                            });
                        });
                    });
                    break;
                case 'creator':
                    this.creator.avatarUrl = response.data;
                    this.creator.$save().$then((creator) => {
                        this.user.role.id = creator._id;
                        this.userService.signup(this.user).then((user) => {
                            this.$state.go('base.login');
                        }, (reason: any) => {
                            console.log(reason);
                        });
                    });
                    break;
                default:
                    // code...
                    break;
            }
        });
    }
}

export class Controller extends SignupController {}