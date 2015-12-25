/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='css!./navbar.css' />
/// <amd-dependency path='text!components/directives/navbar/navbar.html' />
import angular = require('angular');
import config = require('config');
import models = require('../../models');
import avatarDirective = require('../avatar/avatar-directive');
import userService = require('../../services/user/user-service');

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
                       '$state',
                       userService.serviceName,
                       models.user.serviceName ];

    user: models.user.IUser;
    constructor(private scope: IScope,
                private $state: ng.ui.IStateService,
                private userService: userService.Service,
                private UserModel: models.user.IUserStatic) {
        this.getUser();
        scope.$on('sign-action', () => {
            this.getUser();
        });
    }

    logout() {
        this.userService.logout().then((result) => {
            if (result) {
                this.$state.go('base.index');
            }
        });
    }

    getUser() {
        this.userService.me().then((user) => {
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

angular.module(moduleName, [userService.moduleName, avatarDirective.moduleName])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(NavbarDirective);
    }]);