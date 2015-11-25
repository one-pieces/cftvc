/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='md5' />

import angular = require('angular');
import config = require('config');
import models = require('../../models');
'use strict';

export var moduleName = config.appName + '.components.services.user';
export var serviceName = 'user';

/**
 * User service
 */
export class UserService {
    static $inject = [ '$q',
                       'md5',
                       '$rootScope',
                       models.user.serviceName];

    private user: models.user.IUser;
    
    constructor( private $q: ng.IQService,
                 private md5: any,
                 private $rootScope: ng.IRootScopeService,
                 private UserModel: models.user.IUserStatic) {

    }

    /**
     *  
     */
    login(userInfo: any): ng.IPromise<string> {
        var deferred = this.$q.defer();
        userInfo.password = this.md5.createHash(userInfo.password || '');
        this.UserModel.login(userInfo).then((token) => {
            (<any>window.sessionStorage).token = token;
            this.$rootScope.$broadcast('sign-action');
            deferred.resolve(token);
        }, (reason: any) => {
            deferred.reject(reason);
        });
        return deferred.promise;
    }

    signup(userInfo: models.user.IUser): ng.IPromise<models.user.IUser> {
        var deferred = this.$q.defer();
        userInfo.password = this.md5.createHash(userInfo.password || '');
        userInfo.$save().$then((user: models.user.IUser) => {
            deferred.resolve(user);
        }, (reason: any) => {
            deferred.reject(reason);
        });
        return deferred.promise;
    }

    signout() {
        this.user = null;
        delete (<any>window.sessionStorage).token;
        this.$rootScope.$broadcast('sign-action');
    }

    me(): ng.IPromise<models.user.IUser> {
        var token = (<any>window.sessionStorage).token;
        if (!this.user && token) {
            return this.UserModel.$find('me').$then((user) => {
                this.user = user;
                return this.user;
            }).$asPromise();
        } else {
            return this.$q.when(this.user);
        }
    }
}

export class Service extends UserService {}

angular.module(moduleName, ['ngMd5'])
    .service(serviceName, UserService);

