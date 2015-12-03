/// <reference path='../../app.d.ts' />

import config = require('config');
import models = require('../../components/models');

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
                       models.creator.serviceName,
                       models.work.serviceName ];
    
    creator: models.creator.ICreator;
    video: models.work.IWork;
    videoId: string;
    navItems = ['作品', '文章', '照片', '合作伙伴'];

    constructor(private $scope: IScope,
                private $state: ng.ui.IStateService,
                private CreatorModel: models.creator.ICreatorStatic,
                private WorkModel: models.work.IWorkStatic) {
        $scope.videoDescription = this;
        this.videoId = (<IStateParams>$state.params).id;
        this.WorkModel.$find(this.videoId).$then((video) => {
            this.video = video;
            this.creator = video.creator;
        });
    }
}

export class Controller extends VideoDescriptionController {}