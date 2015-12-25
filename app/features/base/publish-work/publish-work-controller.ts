/// <reference path='../../../app.d.ts' />

import config = require('config');
import models = require('../../../components/models');
import userService = require('../../../components/services/user/user-service');

'use strict';

export interface IScope extends ng.IScope {
    publishWork?: PublishWorkController;
}

export var controllerName = config.appName + '.base.publishWork.controller';

/**
 * Controller for the publishWork page
 */
export class PublishWorkController {
    static $inject = [ '$scope',
                       '$state',
                       models.work.serviceName,
                       userService.serviceName ];

    work: models.work.IWork;            
    constructor(private $scope: IScope,
                private $state: ng.ui.IStateService,
                private WorkModel: models.work.IWorkStatic,
                private userService: userService.Service) {
        $scope.publishWork = this;
        this.work = this.WorkModel.$build({
            intro: '',
            title: '',
            creator: '',
            // type: '',
            category: '',
            poster: 'default/w11.jpg',
            videoUrl: ''
        });
        this.userService.me().then((currentUser) => {
            if (currentUser) {
                this.work.creator = currentUser.role.id;
            } else {
                this.work.creator = '001000000000000000000001';
            }
        });
    }

    submit() {
        this.work.$save().$then((work) => {
            this.work = work;
            this.$state.go('base.index');
        });
    }
}

export class Controller extends PublishWorkController {}