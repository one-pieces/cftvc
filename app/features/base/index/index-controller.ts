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
    actors = actors;
    creators = creators;
    videos = videos;

    constructor(private $scope: IScope) {
        $scope.index = this;
    }
}

export class Controller extends IndexController {}