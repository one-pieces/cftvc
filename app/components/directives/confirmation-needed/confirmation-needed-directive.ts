/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./confirmation-needed.css' />
/// <amd-dependency path='text!components/directives/confirmation-needed/confirmation-needed.html' />
import $ = require('jquery');
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.confirmationNeeded';
export var directiveName = 'opConfirmationNeeded';
export var templateText = window.require('text!components/directives/confirmation-needed/confirmation-needed.html');

export interface IScope extends ng.IScope {
    confirmationNeeded: ConfirmationNeeded;
}

/**
 * ConfirmationNeeded class for the directive
 */
export class ConfirmationNeeded {
    static $inject = ['scope', 'element', 'attrs', '$uibModal'];

    constructor(private scope: IScope,
                private element: ng.IAugmentedJQuery,
                private attrs: any,
                private $uibModal: any) {
        this.scope.confirmationNeeded = this;

        element.on('click', (event) => {
            this.handleClick(event);
        });
    }

    handleClick(event?: Event) {
        var modalInstance = this.$uibModal.open({
            animation: true,
            template: templateText
        });

        modalInstance.result.then(() => {
            console.log('open');
        });
    }
}

/**
 * ConfirmationNeeded-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-confirmation-needed>
 *     </op-confirmation-needed>
 * </div>
 *
 * ```
 */
export class ConfirmationNeededDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'A';
    // template = templateText;
    // transclude = true;
    scope = {
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.confirmationNeeded = <ConfirmationNeeded>
        this.$injector.instantiate(ConfirmationNeeded, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, ['ui.bootstrap'])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(ConfirmationNeededDirective);
    }]);