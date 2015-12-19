/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='bootstrap' />
import $ = require('jquery');
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.popover';
export var directiveName = 'opPopover';

/**
 * Popover-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <div op-popover>
 *     </div>
 * </div>
 *
 * ```
 */
export class PopoverDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'A';

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        if ((<any>attrs).opPopover) {
            // Watching these for getting the HTML has been complied by angular.
            scope.$watchGroup(['data', () => {
                return element.find((<any>attrs).popoverContainer)[0].outerHTML.replace('hide', '');
            }], (newValue) => {
                $(element).popover({
                    trigger: 'manual',
                    container: '.base',
                    html: true,
                    content: newValue,
                    placement: (<any>attrs).popoverPlacement })
                    .on('mouseenter', () => {
                        $(element).popover('show');
                        $('.popover').on('mouseleave', () => {
                            $(element).popover('hide');
                        });
                    })
                    .on('mouseleave', () => {
                        if (!$('.popover:hover').length) {
                            $(element).popover('hide');
                        }
                    });
            });
        }
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(PopoverDirective);
    }]);