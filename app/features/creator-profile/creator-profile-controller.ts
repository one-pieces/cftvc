/// <reference path='../../app.d.ts' />

import config = require('config');
import models = require('../../components/models');
import creators = require('../../static/data/creators');

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
                       models.user.serviceName ];
    
    creators = creators;
    creator: any;
    creatorId: string;
    currentUser: models.user.IUser;
    navItems = [ 
        {
            label: '作品'
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
                private UserModel: models.user.IUserStatic) {
        $scope.creatorProfile = this;
        this.creatorId = (<IStateParams>$state.params).id;
        this.creator = this.creators[parseInt(this.creatorId, 10)];
        this.UserModel.$find('_0_1').$then((user) => {
            user.ui.fullName = user.givenName + ' ' + user.familyName;
            this.currentUser = user;
            console.log('return user success, user info: ' + user.givenName);
        });
    }
}

export class Controller extends CreatorProfileController {}