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
                       models.actor.serviceName,
                       models.creator.serviceName,
                       models.user.serviceName];

    private user: models.user.IUser;
    
    constructor( private $q: ng.IQService,
                 private md5: any,
                 private $rootScope: ng.IRootScopeService,
                 private ActorModel: models.actor.IActorStatic,
                 private CreatorModel: models.creator.ICreatorStatic,
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
                switch (this.user.role.name) {
                    case 'actor':
                        this.ActorModel.$find(this.user.role.id).$then((actor) => {
                            this.user.roleInfo = actor;
                            return this.user;
                        });
                        break;
                    case 'creator':
                        this.CreatorModel.$find(this.user.role.id).$then((creator) => {
                            this.user.roleInfo = creator;
                            return this.user;
                        });
                        break;
                    default:
                        // code...
                        break;
                }
            }).$asPromise();
        } else {
            return this.$q.when(this.user);
        }
    }
}

export class Service extends UserService {}

angular.module(moduleName, ['ngFileUpload','ngMd5'])
    .service(serviceName, UserService);

