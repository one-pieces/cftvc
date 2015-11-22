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
                       models.user.serviceName ];
    user: models.user.IUser;
    mobileCaptcha: string;
    captcha: string;
    password2: string;

    constructor(private $scope: IScope,
                private UserModel: models.user.IUserStatic) {
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
        // this.UserModel.$find('_0_1').$then((user) => {
        //     user.ui.fullName = user.givenName + ' ' + user.familyName;
        //     this.currentUser = user;
        //     console.log('return user success, user info: ' + user.givenName);
        // });
    }

    submit() {
        this.user.$save().$then((user) => {
            this.user = user;
        });
    }
}

export class Controller extends SignupController {}