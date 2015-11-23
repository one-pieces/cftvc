/// <reference path='../../app.d.ts' />

import config = require('config');
import models = require('../../components/models');

'use strict';

export interface IScope extends ng.IScope {
    base?: BaseController;
}

export var controllerName = config.appName + '.base.controller';

/**
 * Controller for the base page
 */
export class BaseController {
    static $inject = [ '$scope',
                       models.user.serviceName ];
    currentUser: models.user.IUser;
    navItems = [
        {
            label: '通告',
            link: ''
        },
        { 
            label: '艺人',
            link: 'base.actors'
        },
        {
            label: '创作人',
            link: ''
        },
        {
            label: '作品',
            link: ''
        },
        {
            label: '梦工场',
            link: ''
        }];

    constructor(private $scope: IScope,
                private UserModel: models.user.IUserStatic) {
        $scope.base = this;
    }
}

export class Controller extends BaseController {}