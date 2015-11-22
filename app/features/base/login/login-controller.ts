/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');
import contextService = require('../../../components/services/context/context-service');

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
                       contextService.serviceName ];
    userInfo: any;

    constructor(private $scope: IScope,
                private $state: ng.ui.IStateService,
                private context: contextService.Service) {
        $scope.login = this;
        this.userInfo = {
            username: '',
            password: ''
        };
    }

    submit() {
        this.context.login(this.userInfo).then((user) => {
            console.log(user);
            this.$scope.$root.$broadcast('login-success');
            this.$state.go('base.index');
        }, (reason: any) => {
            console.log(reason);
        });
    }
}

export class Controller extends LoginController {}