/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./creator-square.css' />
/// <amd-dependency path='text!components/directives/creator-square/creator-square.html' />
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.creatorSquare';
export var directiveName = 'opCreatorSquare';
export var templateText = window.require('text!components/directives/creator-square/creator-square.html');

export interface IScope extends ng.IScope {
    creatorSquare: CreatorSquare;
    data: any;
}

/**
 * CreatorSquare class for the directive
 */
export class CreatorSquare {
    static $inject = ['scope'];

    constructor(private scope: IScope) {
    }
}

/**
 * CreatorSquare-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-creator-square data="Creator">
 *     </op-creator-square>
 * </div>
 *
 * ```
 */
export class CreatorSquareDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        data: '=?'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.creatorSquare = <CreatorSquare>
        this.$injector.instantiate(CreatorSquare, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(CreatorSquareDirective);
    }]);