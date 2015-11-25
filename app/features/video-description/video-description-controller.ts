/// <reference path='../../app.d.ts' />

import config = require('config');
import creators = require('../../static/data/creators');
import models = require('../../components/models');
import videos = require('../../static/data/videos');

'use strict';

export interface IScope extends ng.IScope {
    videoDescription?: VideoDescriptionController;
}

export interface IStateParams extends ng.ui.IStateParamsService {
    id: string;
}

export var controllerName = config.appName + '.videoDescription.controller';

/**
 * Controller for the videoDescription page
 */
export class VideoDescriptionController {
    static $inject = [ '$scope',
                       '$state',
                       models.user.serviceName ];
    
    creator: any;
    videos = videos;
    video: any;
    videoId: string;
    currentUser: models.user.IUser;
    navItems = ['作品', '文章', '照片', '合作伙伴'];

    constructor(private $scope: IScope,
                private $state: ng.ui.IStateService,
                private UserModel: models.user.IUserStatic) {
        $scope.videoDescription = this;
        this.videoId = (<IStateParams>$state.params).id;
        this.video = this.videos[parseInt(this.videoId, 10)];
        this.creator = creators[this.video.creatorId];
    }
}

export class Controller extends VideoDescriptionController {}