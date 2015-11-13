/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./avatar.css' />
/// <amd-dependency path='text!components/directives/avatar/avatar.html' />
import angular = require('angular');
import config = require('config');

'use strict';

export var moduleName = config.appName + '.components.diretcives.Avatar';
export var directiveName = 'opAvatar';
export var templateText = window.require('text!components/directives/avatar/avatar.html');

export interface IScope extends ng.IScope {
    avatar: Avatar;
    data: any;
    radius?: string;
}

/**
 * Avatar class for the directive
 */
export class Avatar {
    static $inject = ['scope'];

    radius: number;
    constructor(private scope: IScope) {
        console.log(scope.radius);
        switch (scope.radius) {
            case 'small':
                this.radius = 36;
                break;
            case 'middle':
                this.radius = 90;
                break;
            case 'large':
                this.radius = 146;
                break;
            default:
                if (scope.radius) {
                    this.radius = parseInt(scope.radius);
                } else {
                    this.radius = 60;
                }
                break;
        }
    }
}

/**
 * Avatar-Directive
 * 
 * @attribute __data__ Who want to be shwon
 * @attribute __radius__ Optional. 
 *  small/middel/large and you can set px yourself, default to 60px. The radius of circle avatar
 *
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-avatar data="User" radius="small">
 *     </op-avatar>
 * </div>
 *
 * ```
 */
export class AvatarDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        data: '=',
        radius: '@?'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.avatar = <Avatar>
        this.$injector.instantiate(Avatar, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(AvatarDirective);
    }]);