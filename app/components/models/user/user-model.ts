/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='restmod' />

import angular = require('angular');
import config = require('config');
import modelNames = require('../model-names');
import modelsModule = require('../models-module');
import utilities = require('../utilities/utilities');

'use strict';

export var serviceName = modelNames.USER;

export interface ILearnUser {
    _id?: string;
    password?: string;
    username: string;
    role: {
        name: string,
        id: string
    };
    meta: {
        createAt: Date;
        updateAt: Date;
    };
}

/**
 * Represents an instance of User
 */
export interface IUser extends ILearnUser, ng.restmod.IModel<IUser> {
    /** relationship
     * For example, the user has a relationship of a book, 
     * then you should declare a book model in here.
     */
    ui?: {
        // for ui temp
        fullName?: string;
    };
    roleInfo?: any;
    isActor(): boolean;
    isCreator(): boolean;
    comparePassword(oldPassword: string): ng.IPromise<boolean>;
}

/**
 * Represents a collection of User
 */
export interface IUserCollection extends ng.restmod.IModelCollection<IUser> {
    sortUsers(): ng.restmod.IModelCollection<IUser>;
}

/**
 * The User model type
 */
export interface IUserStatic extends ng.restmod.IModelStatic<IUser> {
    login(user: IUser): ng.IPromise<string>;
    logout(): ng.IPromise<boolean>;
}

modelsModule
    .factory(serviceName, ['restmod', '$q', utilities.factoryName, 
            (restmod: ng.restmod.IRestmodService, $q: ng.IQService, utilities: utilities.IUtilities) => {
        var API_PATH = config.apiBasePath + '/v1/user';

        var UserModel = restmod.model(API_PATH).mix({
            ui: { mask: true, init: () => { 
                    // var fullName = this.familyName + this.givnName;
                    // console.log(this.familyName);
                    // return {
                    //     fullName: fullName
                    // }; 
                    return {}; 
                }
            },
            roleInfo: { hasOne: modelNames.CREATOR },
            isActor: function() {
                return this.role.name === 'actor';
            },
            isCreator: function() {
                return this.role.name === 'creator';
            },
            $extend: {
                Collection: {
                    sortUsers: function() {
                        return this.$action(function() {
                            this.sort(function(one: IUser, other: IUser) {
                                return one.meta.createAt < other.meta.createAt ? -1 : 1;
                            });
                        });
                    }
                },
                Record: {
                    comparePassword: function(oldPassword: string) {
                        var deferred = $q.defer<boolean>();
                        this.$send({
                            method: 'POST',
                            url: this.$url() + '/comparePassword',
                            data: { password: oldPassword }
                        }, (response: any) => {
                            deferred.resolve(response.data);
                        }, (error: any) => {
                            deferred.reject(error.data);
                        });
                        return deferred.promise;
                    }
                }
            }
        });

        // Return a token
        (<any>UserModel).login = function(user: IUser) {
            var deferred = $q.defer<string>();
            // Attention!!! The common api is not accesible as static methods anymore, 
            // this is because the common api is not stateless and static methods should be stateless.
            // So you need to new a instance.
            this.$new().$send({
                method: 'POST',
                url: this.$url() + '/login',
                data: user
            }, (response: any) => {
                deferred.resolve(response.data);
            }, (error: any) => {
                deferred.reject(error.data);
            });
            return deferred.promise;
        };

        (<any>UserModel).logout = function() {
                var deferred = $q.defer<boolean>();
            // Attention!!! The common api is not accesible as static methods anymore, 
            // this is because the common api is not stateless and static methods should be stateless.
            // So you need to new a instance.
            this.$new().$send({
                method: 'DELETE',
                url: this.$url() + '/logout'
            }, (response: any) => {
                deferred.resolve(response.data);
            }, (error: any) => {
                deferred.reject(error.data);
            });
            return deferred.promise;
        };
        return UserModel;
    }]);