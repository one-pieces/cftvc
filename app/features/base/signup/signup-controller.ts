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
                       models.user.serviceName,
                       userService.serviceName ];
    user: models.user.IUser;
    mobileCaptcha: string;
    captcha: string;
    password2: string;

    constructor(private $scope: IScope,
                private $state: ng.ui.IStateService,
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
            sex: ''
        });
    }

    submit() {
        this.userService.signup(this.user).then((user) => {
            this.$state.go('base.login');
        }, (reason: any) => {
            console.log(reason);
        });
    }
}

export class Controller extends SignupController {}