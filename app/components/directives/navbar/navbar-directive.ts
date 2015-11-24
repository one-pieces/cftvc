/// <r e ference path='../../../app.d.ts' />
/// <amd-dependency path='css!./navbar.css' />
/// <amd-dependency path='text!components/directives/navbar/navbar.html' />
import angular = require('angular');
import config = require('config');
import userService = require('../../services/user/user-service');
import models = require('../../models');

'use strict';

export var moduleName = config.appName + '.components.diretcives.navbar';
export var directiveName = 'opNavbar';
export var templateText = window.require('text!components/directives/navbar/navbar.html');

export interface IScope extends ng.IScope {
    navbar: Navbar;
    navItems: any[];
    isBrandShown?: boolean;
    isLoginShown?: boolean;
}

/**
 * Navbar class for the directive
 */
export class Navbar {
    static $inject = [ 'scope', 
                       userService.serviceName,
                       models.user.serviceName ];

    user: models.user.IUser;
    constructor(private scope: IScope,
                private userService: userService.Service,
                private UserModel: models.user.IUserStatic) {
        userService.getUser().then((user) => {
            this.user = user;
            console.log(this.user);
        });
        scope.$on('sign-action', () => {
            userService.getUser().then((user) => {
                this.user = user;
            });
        });
    }

    signout() {
        this.userService.signout();
        this.userService.getUser().then((user) => {
            this.user = user;
        });
    }
}

/**
 * Navbar-Directive
 * 
 * ### Sample usage:
 *
 * ```html
 *
 * <div>
 *     <op-navbar>
 *     </op-navbar>
 * </div>
 *
 * ```
 */
export class NavbarDirective implements ng.IDirective {
    static $inject = ['$injector'];
    
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'E';
    template = templateText;
    // transclude = true;
    scope = {
        navItems: '=',
        isBrandShown: '=?',
        isLoginShown: '=?'
    };

    link = (scope: IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        scope.navbar = <Navbar>
        this.$injector.instantiate(Navbar, { scope: scope, element: element, attrs: attrs });
    }
}

angular.module(moduleName, [userService.moduleName])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(NavbarDirective);
    }]);