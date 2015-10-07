/// <reference path='../../app.d.ts' />

'use strict';

export interface IScope extends ng.IScope {
    home?: HomeController;
}

export var controllerName = 'framework.home.controller';

/**
 * Controller for the home page
 */
export class HomeController {
    static $inject = [ '$scope'];

    title = 'test';

    constructor(private $scope: IScope) {
        $scope.home = this;
    }
}

export class Controller extends HomeController {}