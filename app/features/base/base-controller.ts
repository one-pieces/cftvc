/// <reference path='../../app.d.ts' />

import actors = require('../../static/data/actors');
import config = require('config');
import models = require('../../components/models');
import creators = require('../../static/data/creators');
import works = require('../../static/data/works');

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
    /**
    * The slick actor carousel needs to be manually configured with breakpoint settings.
    * We pass along values derived from the breakpoint widths specified in the stylesheets.
    */
    actorCarouselResponsiveSettings = [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ];
    slidesToShow = 4;
    actors = actors;
    creators = creators;
    works = works;
    currentUser: models.user.IUser;

    constructor(private $scope: IScope,
                private UserModel: models.user.IUserStatic) {
        $scope.base = this;
        this.UserModel.$find('_0_1').$then((user) => {
            user.ui.fullName = user.givenName + ' ' + user.familyName;
            this.currentUser = user;
            console.log('return user success, user info: ' + user.givenName);
        });
    }
}

export class Controller extends BaseController {}