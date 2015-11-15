/// <reference path='../../../app.d.ts' />

import actors = require('../../../static/data/actors');
import config = require('config');
import creators = require('../../../static/data/creators');
import videos = require('../../../static/data/videos');

'use strict';

export interface IScope extends ng.IScope {
    index?: IndexController;
}

export var controllerName = config.appName + '.base.index.controller';

/**
 * Controller for the index page
 */
export class IndexController {
    static $inject = [ '$scope' ];
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

    constructor(private $scope: IScope) {
        $scope.index = this;
    }
}

export class Controller extends IndexController {}