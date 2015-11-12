/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./work-grid.css' />
/// <amd-dependency path='text!components/directives/work-grid/work-grid.html' />
import $ = require('jquery');
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.workGrid';
export var directiveName = 'opWorkGrid';
export var templateText = window.require('text!components/directives/work-grid/work-grid.html');

export interface IScope extends ng.IScope {
    workGrid: WorkGrid;
    data: any;
    canBeHovered: boolean;
}

/**
 * WorkGrid class for the directive
 */
export class WorkGrid {
    static $inject = ['scope'];

    constructor(private scope: IScope) {
    }
}

/**
 * WorkGrid-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-work-grid data="work">
 *     </op-work-grid>
 * </div>
 *
 * ```
 */
export class WorkGridDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        data: '=?',
        canBeHovered: '=?'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        if (scope.canBeHovered) {
            element.hover(() => {
                element.find('.art-cover').css('display', 'block');
                }, () => {
                element.find('.art-cover').css('display', 'none');
            });
        }
        scope.workGrid = <WorkGrid>
            this.$injector.instantiate(WorkGrid, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(WorkGridDirective);
    }]);