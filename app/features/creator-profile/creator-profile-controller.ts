/// <reference path='../../app.d.ts' />

import config = require('config');
import models = require('../../components/models');

'use strict';

export interface IScope extends ng.IScope {
    creatorProfile?: CreatorProfileController;
}

export interface IStateParams extends ng.ui.IStateParamsService {
    id: string;
}

export var controllerName = config.appName + '.creatorProfile.controller';

/**
 * Controller for the creatorProfile page
 */
export class CreatorProfileController {
    static $inject = [ '$scope',
                       '$state',
                       models.creator.serviceName ];

    creatorId: string;
    creator: models.creator.ICreator;
    navItems = [ 
        {
            label: '作品',
            link: ''
        },
        { 
            label: '文章',
            link: '',
        },
        {
            label: '照片',
            link: ''
        }, 
        {
            label: '合作伙伴',
            link: ''
        }];

    constructor(private $scope: IScope,
                private $state: ng.ui.IStateService,
                private CreatorModel: models.creator.ICreatorStatic) {
        $scope.creatorProfile = this;
        this.creatorId = (<IStateParams>$state.params).id;
        this.CreatorModel.$find(this.creatorId).$then((creator: models.creator.ICreator) => {
            this.creator = creator;
        });
    }
}

export class Controller extends CreatorProfileController {}