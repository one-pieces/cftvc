/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='restmod' />

import angular = require('angular');
import config = require('config');
import modelNames = require('../model-names');
import modelsModule = require('../models-module');

'use strict';

export var serviceName = modelNames.WORK;

export interface ILearnWork {
    _id?: string;
    intro: string;
    meta: {
        createAt: Date;
        updateAt: Date;
    };
    title: string;
    creator: any;
    comments: string[];
    pv: string;
    type: string;
    category: string;
    poster: string;
    likers?: string[];
    videoUrl: string;
}

/**
 * Represents an instance of Work
 */
export interface IWork extends ILearnWork, ng.restmod.IModel<IWork> {

}

/**
 * Represents a collection of Work
 */
export interface IWorkCollection extends ng.restmod.IModelCollection<IWork> {
    sortWorks(): ng.restmod.IModelCollection<IWork>;
}

/**
 * The Work model type
 */
export interface IWorkStatic extends ng.restmod.IModelStatic<IWork> {

}

modelsModule
    .factory(serviceName, ['restmod', '$q', (restmod: ng.restmod.IRestmodService, $q: ng.IQService) => {
        var API_PATH = config.apiBasePath + '/v1/work';

        var WorkModel = restmod.model(API_PATH).mix({
            $extend: {
                Collection: {
                    sortWorks: function() {
                        return this.$action(function() {
                            this.sort(function(one: IWork, other: IWork) {
                                return one.meta.createAt < other.meta.createAt ? -1 : 1;
                            });
                        });
                    }
                }
            }
        });
        return WorkModel;
    }]);
