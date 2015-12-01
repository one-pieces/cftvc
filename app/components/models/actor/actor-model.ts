/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='restmod' />

import angular = require('angular');
import config = require('config');
import modelNames = require('../model-names');
import modelsModule = require('../models-module');

'use strict';

export var serviceName = modelNames.ACTOR;

export interface ILearnRange {
    category: string;
    subdivision: string;
    remark: string;
}

export interface ILearnActor {
    _id?: string;
    height: string;
    weight: string;
    chest: string;
    waist: string;
    hip: string;
    shoesSize: string;
    hairColor: string;
    eyeColor: string;
    // experience: string;
    // style: string;
    // range: ILearnRange[];
    // portraits: string[];
    meta: {
        createAt: Date;
        updateAt: Date;
    };
    givenName: string;
    familyName: string;
    mobile: string;
    nickname: string;
    location: string;
    gender: string;
    role: string;
    type: string;
    label: string;
    avatarUrl: string;
    viewUrl: string;
}

/**
 * Represents an instance of Actor
 */
export interface IActor extends ILearnActor, ng.restmod.IModel<IActor> {

}

/**
 * Represents a collection of Actor
 */
export interface IActorCollection extends ng.restmod.IModelCollection<IActor> {
    sortActors(): ng.restmod.IModelCollection<IActor>;
}

/**
 * The Actor model type
 */
export interface IActorStatic extends ng.restmod.IModelStatic<IActor> {

}

modelsModule
    .factory(serviceName, ['restmod', '$q', (restmod: ng.restmod.IRestmodService, $q: ng.IQService) => {
        var API_PATH = config.apiBasePath + '/v1/actor';

        var ActorModel = restmod.model(API_PATH).mix({
            $extend: {
                Collection: {
                    sortActors: function() {
                        return this.$action(function() {
                            this.sort(function(one: IActor, other: IActor) {
                                return one.meta.createAt < other.meta.createAt ? -1 : 1;
                            });
                        });
                    }
                }
            }
        });
        return ActorModel;
    }]);
