/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./actor-slick.css' />
/// <amd-dependency path='text!components/directives/actor-slick/actor-slick.html' />
import $ = require('jquery');
import actorGridDirective = require("../actor-grid/actor-grid-directive");
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.actorSlick';
export var directiveName = 'opActorSlick';
export var templateText = window.require('text!components/directives/actor-slick/actor-slick.html');

export interface IScope extends ng.IScope {
    actorSlick: ActorSlick;
    data: any;
}

/**
 * ActorSlick class for the directive
 */
export class ActorSlick {
    static $inject = ['scope'];
    /**
        arouse needs to be manually configured with breakpoint settings.
        ues derived from the brakpoint widths specified in the stylesheets.
    */
    actorCarouselResponsiveSettings = [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
        settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ];
    slidesToShow = 4;

    constructor(private scope: IScope) {
        scope.actorSlick = this;
    }
}

/**
 * ActorSlick-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-actor-slick data="actors">
 *     </op-actor-slick>
 * </div>
 *
 * ```
 */
export class ActorSlickDirective implements ng.IDirective {
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
            element.find('.slide-arrow').css('display', 'block');
        }, () => {
            element.find('.slide-arrow').css('display', 'none');
        });
        scope.actorSlick = <ActorSlick>
        this.$injector.instantiate(ActorSlick, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [actorGridDirective.moduleName])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(ActorSlickDirective);
    }]);