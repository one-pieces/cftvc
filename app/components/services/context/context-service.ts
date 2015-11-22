/// <reference path='../../../app.d.ts' />

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
    static $inject = ['$q', models.user.serviceName];

    private user: models.user.IUser;
    
    constructor( private $q: ng.IQService,
                 private UserModel: models.user.IUserStatic) {

    }

    /**
     *  
     */
    login(userInfo: any): ng.IPromise<models.user.IUser> {
        var deferred = this.$q.defer();
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
        if (!this.user) {
            return this.UserModel.$find((<any>window.sessionStorage).userId).$then((user) => {
                this.user = user;
                return this.user;
            }).$asPromise();
        } else {
            return this.$q.when(this.user);
        }
    }
}

export class Service extends ContextService {}

angular.module(moduleName, [])
    .service(serviceName, ContextService);

