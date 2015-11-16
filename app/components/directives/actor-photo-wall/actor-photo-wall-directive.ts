/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./actor-photo-wall.css' />
/// <amd-dependency path='text!components/directives/actor-photo-wall/actor-photo-wall.html' />
import $ = require('jquery');
import actorGridDirective = require("../actor-grid/actor-grid-directive");
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.actorPhotoWall';
export var directiveName = 'opActorPhotoWall';
export var templateText = window.require('text!components/directives/actor-photo-wall/actor-photo-wall.html');

export interface IScope extends ng.IScope {
    actorPhotoWall: ActorPhotoWall;
    data: any;
}

/**
 * ActorPhotoWall class for the directive
 */
export class ActorPhotoWall {
    static $inject = ['scope'];

    constructor(private scope: IScope) {
        scope.actorPhotoWall = this;
    }
}

/**
 * ActorPhotoWall-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-actor-photo-wall data="actors">
 *     </op-actor-photo-wall>
 * </div>
 *
 * ```
 */
export class ActorPhotoWallDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        data: '=?'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.actorPhotoWall = <ActorPhotoWall>
        this.$injector.instantiate(ActorPhotoWall, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [actorGridDirective.moduleName])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(ActorPhotoWallDirective);
    }]);