/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./actor-grid.css' />
/// <amd-dependency path='text!components/directives/actor-grid/actor-grid.html' />
import $ = require('jquery');
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.actorGrid';
export var directiveName = 'opActorGrid';
export var templateText = window.require('text!components/directives/actor-grid/actor-grid.html');

export interface IScope extends ng.IScope {
    actorGrid: ActorGrid;
    data: any;
}

/**
 * ActorGrid class for the directive
 */
export class ActorGrid {
    static $inject = ['scope'];

    constructor(private scope: IScope) {
    }
}

/**
 * ActorGrid-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-actor-grid data="actor">
 *     </op-actor-grid>
 * </div>
 *
 * ```
 */
export class ActorGridDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        data: '=?'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        element.hover(() => {
            element.find('.art-cover').css('display', 'block');
        }, () => {
            element.find('.art-cover').css('display', 'none');
        });
        scope.actorGrid = <ActorGrid>
        this.$injector.instantiate(ActorGrid, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(ActorGridDirective);
    }]);