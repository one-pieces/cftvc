/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');
import userService = require('../../../components/services/user/user-service');

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
                       '$state',
                       userService.serviceName ];
    userInfo: any;

    constructor(private $scope: IScope,
                private $state: ng.ui.IStateService,
                private userService: userService.Service) {
        $scope.login = this;
        this.userInfo = {
            username: '',
            password: ''
        };
    }

    submit() {
        this.userService.login(this.userInfo).then((user) => {
            this.$scope.$root.$broadcast('sign-action');
            this.$state.go('base.index');
        }, (reason: any) => {
            console.log(reason);
        });
    }
}

export class Controller extends LoginController {}