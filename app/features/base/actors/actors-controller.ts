/// <reference path='../../../app.d.ts' />

import actors = require('../../../static/data/actors');
import config = require('config');
import models = require('../../../components/models');
import creators = require('../../../static/data/creators');
import videos = require('../../../static/data/videos');

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
    /**
        arouse needs to be manually configured with breakpoint settings.
        ues derived from the brakpoint widths specified in the stylesheets.
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
    videos = videos;
    currentUser: models.user.IUser;
    navItems = ['通告', '艺人', '创作人', '作品', '梦工场'];

    constructor(private $scope: IScope,
                private UserModel: models.user.IUserStatic) {
        $scope.actors = this;
        this.UserModel.$find('_0_1').$then((user) => {
            user.ui.fullName = user.givenName + ' ' + user.familyName;
            this.currentUser = user;
            console.log('return user success, user info: ' + user.givenName);
        });
    }
}

export class Controller extends ActorsController {}