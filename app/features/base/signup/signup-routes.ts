/// <reference path='../../../app.d.ts' />
/// <amd-dependency path="text!features/base/signup/forms/actor-info.html" />
/// <amd-dependency path="text!features/base/signup/forms/creator-info.html" />
/// <amd-dependency path="text!features/base/signup/forms/upload-avatar.html" />
/// <amd-dependency path="text!features/base/signup/forms/user-info.html" />

import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.base.signup.userInfo';
var actorInfoTemplate = window.require('text!features/base/signup/forms/actor-info.html');
var creatorInfoTemplate = window.require('text!features/base/signup/forms/creator-info.html');
var uploadAvatarTemplate = window.require('text!features/base/signup/forms/upload-avatar.html');
var userInfoTemplate = window.require('text!features/base/signup/forms/user-info.html');

angular.module(moduleName, [])
    .config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
        $stateProvider
            .state('base.signup.userInfo', {
                url: '/1',
                template: userInfoTemplate
            })
            .state('base.signup.rolerInfo', {
                url: '/2?role',
                // templateUrl: ($stateParams: ng.ui.IStateParamsService) => {
                //     var templateUrl: string;
                //     switch ((<any>$stateParams).role) {
                //         case 'actor': 
                //             templateUrl = 'features/base/signup/forms/actor-info.html';
                //             break;    
                //         case 'creator': 
                //             templateUrl = 'features/base/signup/forms/creator-info.html';
                //             break;     
                //         default:
                //             templateUrl = 'features/base/signup/forms/actor-info.html';
                //             break;
                //     }
                //     return templateUrl;
                // }
                templateProvider: ['$stateParams', ($stateParams: ng.ui.IStateParamsService) => {
                    var template: string;
                    switch ((<any>$stateParams).role) {
                        case 'actor':
                            template = actorInfoTemplate;
                            break;
                        case 'creator':
                            template = creatorInfoTemplate;
                            break;
                        default:
                            template = actorInfoTemplate;
                            break;
                    }
                    return template;
                }]
            })
            .state('base.signup.uploadAvatar', {
                url: '/3',
                template: uploadAvatarTemplate
            });
    }]);
