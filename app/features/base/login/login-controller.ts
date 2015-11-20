/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');

'use strict';

export interface IScope extends ng.IScope {
    login?: LoginController;
}

export var controllerName = config.appName + '.base.login.controller';

/**
 * Controller for the login page
 */
export class LoginController {
    static $inject = [ '$scope',
                       models.user.serviceName ];
    user: models.user.IUser;

    constructor(private $scope: IScope,
                private UserModel: models.user.IUserStatic) {
        $scope.login = this;
        this.user = this.UserModel.$build({
            username: '',
            password: '',
            email: '',
            givenName: '',
            familyName: ''
        });
        // this.UserModel.$find('_0_1').$then((user) => {
        //     user.ui.fullName = user.givenName + ' ' + user.familyName;
        //     this.user = user;
        //     console.log('return user success, user info: ' + user.givenName);
        // });
    }

    submit() {
        this.UserModel.login(this.user).then((user: models.user.IUser) => {
            this.user = user;
        });
    }
}

export class Controller extends LoginController {}