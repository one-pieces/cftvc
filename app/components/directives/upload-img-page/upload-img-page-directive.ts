/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./upload-img-page.css' />
/// <amd-dependency path='text!components/directives/upload-img-page/upload-img-page.html' />
/// <amd-dependency path="ng-file-upload" />
/// <amd-dependency path="ngImgCrop" />
/// <amd-dependency path="css!/vendor/ngImgCrop/ng-img-crop.css" />

import angular = require('angular');
import config = require('config');
import models = require('../../../components/models');
import userService = require('../../../components/services/user/user-service');

'use strict';

export var moduleName = config.appName + '.components.diretcives.uploadImgPage';
export var directiveName = 'opUploadImgPage';
export var templateText = window.require('text!components/directives/upload-img-page/upload-img-page.html');

export interface IScope extends ng.IScope {
    uploadImgPage: UploadImgPage;
    actor: models.actor.IActor;
    creator: models.creator.ICreator;
    user: models.user.IUser;
    method: string;
}

/**
 * UploadImgPage class for the directive
 */
export class UploadImgPage {
    static $inject = [ 'scope',
                       '$state', 
                       'Upload', 
                       userService.serviceName ];

    radius: number;
    constructor(private scope: IScope,
                private $state: ng.ui.IStateService, 
                private $upload: ng.angularFileUpload.IUploadService,
                private userService: userService.Service) {
        
    }

    submit(avatarUrl: string, viewFile: File) {
        var fileName: string;
        switch (this.scope.user.role.name) {
            case 'actor':
                fileName = this.scope.actor.nickname;
                break;
            case 'creator':
                fileName = this.scope.creator.nickname;
                break;
            default:
                fileName = 'nickname';
                break;
        }
        fileName = fileName + '_' + this.scope.user.username;
        this.$upload.upload({
            url: config.apiBasePath + '/v1/user/uploadAvatar',
            method: 'POST',
            file: (<any>this.$upload).dataUrltoBlob(avatarUrl, fileName)
        }).success((response: any) => {
            switch (this.scope.user.role.name) {
                case 'actor':
                this.scope.actor.avatarUrl = response.data;
                    this.$upload.upload({
                         url: config.apiBasePath + '/v1/user/uploadView',
                        method: 'POST',
                        file: (<any>this.$upload).rename(viewFile, fileName)
                    }).success((response: any) => {
                        this.scope.actor.viewUrl = response.data;
                        if (this.scope.method === 'post') {
                            this.scope.actor.$save().$then((actor) => {
                                this.scope.user.role.id = actor._id;
                                this.userService.signup(this.scope.user).then((user) => {
                                this.$state.go('base.login');
                                }, (reason: any) => {
                                    console.log(reason);
                                });
                            });
                        } else if (this.scope.method === 'patch') {
                            this.scope.actor.$patch().$then((actor) => {
                                alert('保存成功');
                            });
                        }
                    });
                    break;
                case 'creator':
                    this.scope.creator.avatarUrl = response.data;
                    if (this.scope.method === 'post') {
                        this.scope.creator.$save().$then((creator) => {
                            this.scope.user.role.id = creator._id;
                            this.userService.signup(this.scope.user).then((user) => {
                                this.$state.go('base.login');
                            }, (reason: any) => {
                                console.log(reason);
                            });
                        });
                    } else if (this.scope.method === 'patch') {
                        this.scope.creator.$patch().$then((creator) => {
                                alert('保存成功');
                        });
                    }
                        break;
                default:
                    // code...
                    break;
            }
        });
    }
}

/**
 * UploadImgPage-Directive
 * 
 *
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-upload-img-page user="User" actor="Actor" creator="Creator">
 *     </op-upload-img-page>
 * </div>
 *
 * ```
 */
export class UploadImgPageDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        actor: '=',
        creator: '=',
        user: '=',
        method: '@'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.uploadImgPage = <UploadImgPage>
        this.$injector.instantiate(UploadImgPage, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [
    'ngFileUpload',
    'ngImgCrop'])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(UploadImgPageDirective);
    }]);