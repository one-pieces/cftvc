/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='restmod' />

import angular = require('angular');
import config = require('config');
import modelNames = require('../model-names');
import modelsModule = require('../models-module');

'use strict';

export var serviceName = modelNames.CREATOR;

export interface ILearnCreator {
    _id?: string;
    intro: string;
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
    label?: string;
    avatarUrl: string;
}

/**
 * Represents an instance of Creator
 */
export interface ICreator extends ILearnCreator, ng.restmod.IModel<ICreator> {

}

/**
 * Represents a collection of Creator
 */
export interface ICreatorCollection extends ng.restmod.IModelCollection<ICreator> {
    sortCreators(): ng.restmod.IModelCollection<ICreator>;
}

/**
 * The Creator model type
 */
export interface ICreatorStatic extends ng.restmod.IModelStatic<ICreator> {

}

modelsModule
    .factory(serviceName, ['restmod', '$q', (restmod: ng.restmod.IRestmodService, $q: ng.IQService) => {
        var API_PATH = config.apiBasePath + '/v1/creator';

        var CreatorModel = restmod.model(API_PATH).mix({
            $extend: {
                Collection: {
                    sortCreators: function() {
                        return this.$action(function() {
                            this.sort(function(one: ICreator, other: ICreator) {
                                return one.meta.createAt < other.meta.createAt ? -1 : 1;
                            });
                        });
                    }
                }
            }
        });
        return CreatorModel;
    }]);
