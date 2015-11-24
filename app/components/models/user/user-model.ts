/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='restmod' />

import angular = require('angular');
import config = require('config');
import modelNames = require('../model-names');
import modelsModule = require('../models-module');

'use strict';

export var serviceName = modelNames.USER;

export interface ILearnUser {
    _id?: string;
    password?: string;
    username: string;
    givenName: string;
    familyName: string;
    mobile: string;
    email: string;
    brithday: string;
    nickname: string;
    location: string;
    sex: string;
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
    login(user: IUser): ng.IPromise<IUser>; 
}

modelsModule
    .factory(serviceName, ['restmod', '$q', (restmod: ng.restmod.IRestmodService, $q: ng.IQService) => {
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
            $extend: {
                Collection: {
                    sortUsers: function() {
                        return this.$action(function() {
                            this.sort(function(one: IUser, other: IUser) {
                                return one.username < other.username ? -1 : 1;
                            });
                        });
                    }
                }
            }
        });

        (<any>UserModel).login = function(user: IUser) {
            var deferred = $q.defer<IUser>();
            // Attention!!! The common api is not accesible as static methods anymore, 
            // this is because the common api is not stateless and static methods should be stateless.
            // So you need to new a instance.
            this.$new().$send({
                method: 'POST',
                url: this.$url() + '/login',
                data: user
            }, (response: any) => {
                // For mock server db we must have an id, delete the id here
                if(response.data.id) {
                  delete response.data.id;
                }
                deferred.resolve(response.data);
            }, (error: any) => {
                deferred.reject(error.data);
            });
            return deferred.promise;
        };
        return UserModel;
    }]);