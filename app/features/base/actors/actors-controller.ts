/// <reference path='../../../app.d.ts' />

import actors = require('../../../static/data/actors');
import config = require('config');
import models = require('../../../components/models');

'use strict';

export interface IScope extends ng.IScope {
    actors?: ActorsController;
}

export var controllerName = config.appName + '.base.actors.controller';

/**
 * Controller for the actors page
 */
export class ActorsController {
    static $inject = [ '$scope',
                       models.user.serviceName ];
    actors = actors;
    currentUser: models.user.IUser;

    constructor(private $scope: IScope,
                private UserModel: models.user.IUserStatic) {
        $scope.actors = this;
        // this.UserModel.$find('_0_1').$then((user) => {
        //     user.ui.fullName = user.givenName + ' ' + user.familyName;
        //     this.currentUser = user;
        //     console.log('return user success, user info: ' + user.givenName);
        // });
    }
}

export class Controller extends ActorsController {}