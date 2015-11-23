/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='md5' />

import angular = require('angular');
import config = require('config');
import models = require('../../models');
'use strict';

export var moduleName = config.appName + '.components.services.context';
export var serviceName = 'context';

/**
 * Angular service used by XXXX(service name) as utility functions.
 */
export class ContextService {
    static $inject = [ '$q',
                       'md5',
                       models.user.serviceName];

    private user: models.user.IUser;
    
    constructor( private $q: ng.IQService,
                 private md5: any,
                 private UserModel: models.user.IUserStatic) {

    }

    /**
     *  
     */
    login(userInfo: any): ng.IPromise<models.user.IUser> {
        var deferred = this.$q.defer();
        userInfo.password = this.md5.createHash(userInfo.password || '');
        this.UserModel.login(userInfo).then((user: models.user.IUser) => {
            this.user = user;
            (<any>window.sessionStorage).userId = user._id;
            deferred.resolve(user);
        }, (reason: any) => {
            deferred.reject(reason);
        });
        return deferred.promise;
    }

    getUser(): ng.IPromise<models.user.IUser> {
        var userId = (<any>window.sessionStorage).userId;
        if (!this.user && userId) {
            return this.UserModel.$find(userId).$then((user) => {
                this.user = user;
                return this.user;
            }).$asPromise();
        } else {
            return this.$q.when(this.user);
        }
    }
}

export class Service extends ContextService {}

angular.module(moduleName, ['ngMd5'])
    .service(serviceName, ContextService);

