/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='slick-carousel' />
/// <amd-dependency path='css!../../../vendor/slick-carousel/slick.css' />
/// <amd-dependency path='css!./slick.css' />

/*
The MIT License (MIT)

Copyright (c) 2014 Vasyl Stanislavchuk

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

//A message from Xiaolong Lin:
//I started with code from https://github.com/vasyabigi/angular-slick, but decided to copy it here because I need to make a few
//changes, the author is not responding to issues / pull requests, and it's a small amount of code

import $ = require("jquery");
import angular = require("angular");
import config = require('config');

'use strict';

declare var Slick: any;

export var moduleName = config.appName + '.components.diretcives.Slick';
export var directiveName = 'opSlick';

/**
 * An angular directive for the slick carousel (http://kenwheeler.github.io/slick/).
 * See http://kenwheeler.github.io/slick/ and https://github.com/vasyabigi/angular-slick for info on other settings
 *
 * @attribute {boolean=} manualInit Indicates that the slick carousel should not be automatically initialized
 * @attribute {object=} slickHandle If specified, the JQuery element will be stored in this location such to allow direct access to the
 *                             underlying component. For instance, to initialize it or go to a different page.
 *
 * ### Sample usage:
 *
 * ```html
 *
 *  <div bb-slick>
 *  </div>
 *
 * ```
 */

export class SlickDirective implements ng.IDirective {
    static $inject = ['$injector'];
    constructor(private $injector: ng.auto.IInjectorService) {}

    restrict = 'AE';
    scope = {
        initOnload: '@',
        data: '=',
        currentIndex: '=?',
        accessibility: '@',
        arrows: '@',
        asNavFor: '@',
        autoplay: '@',
        autoplaySpeed: '@',
        centerMode: '@',
        centerPadding: '@',
        cssEase: '@',
        dots: '@',
        draggable: '@',
        easing: '@',
        fade: '@',
        focusOnSelect: '@',
        infinite: '@',
        init: '&',
        initialSlide: '=?',
        lazyLoad: '@',
        manualInit: '=',
        nextArrow: '@',
        onBeforeChange: '&',
        onAfterChange: '&',
        onInit: '&',
        onReInit: '&',
        onUpdate: '&',
        pauseOnHover: '@',
        prevArrow: '@',
        responsive: '=',
        slickHandle: '=',
        slide: '@',
        slidesToShow: '=?',
        slidesToScroll: '@',
        speed: '@',
        swipe: '@',
        touchMove: '@',
        touchThreshold: '@',
        toUpdateSlide: '=',
        vertical: '@',
        useCss: '@'
    };

    link = (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        // var isInitialized = false;
        var slider: any = $(element);

        function initializeSlick() {
            slider.slick({
                accessibility: scope.accessibility !== 'false',
                arrows: scope.arrows !== 'false',
                asNavFor: scope.asNavFor,
                autoplay: scope.autoplay === 'true',
                autoplaySpeed: scope.autoplaySpeed != null ? parseInt(scope.autoplaySpeed, 10) : 3000,
                centerMode: scope.centerMode === 'true',
                centerPadding: scope.centerPadding || '50px',
                cssEase: scope.cssEase || 'ease',
                dots: scope.dots === 'true',
                draggable: scope.draggable === 'true',
                easing: scope.easing || 'linear',
                fade: scope.fade === 'true',
                focusOnSelect: scope.focusOnSelect === 'true',
                infinite: scope.infinite !== 'false',
                initialSlide: scope.initialSlide != null ? parseInt(scope.initialSlide, 10) : 0,
                lazyLoad: scope.lazyLoad || 'ondemand',
                //This needs to select the DOM node instead of be a string to prevent arrow from getting removed when switching breakpoints
                nextArrow: $(scope.nextArrow),
                pauseOnHover: scope.pauseOnHover !== 'false',
                //This needs to select the DOM node instead of be a string to prevent arrow from getting removed when switching breakpoints
                prevArrow: $(scope.prevArrow),
                responsive: scope.responsive,
                slide: scope.slide || 'div',
                slidesToShow: scope.slidesToShow,
                slidesToScroll: scope.slidesToScroll != null ? parseInt(scope.slidesToScroll, 10) : 1,
                speed: scope.speed != null ? parseInt(scope.speed, 10) : 300,
                swipe: scope.swipe !== 'false',
                touchMove: scope.touchMove !== 'false',
                touchThreshold: scope.touchThreshold ? parseInt(scope.touchThreshold, 10) : 5,
                useCSS: scope.useCss !== 'false',
                vertical: scope.vertical === 'true'
            });
        }

        if (scope.initOnload) {
            // isInitialized = false;
            scope.$watch('data', (newVal: any[], oldVal: any[]) => {
                if (newVal != null) {
                    // if (isInitialized) {
                    initializeSlick();
                    // }
                }
            });
        } else {
            initializeSlick();
        }
    }
}

angular.module(moduleName, [])
    .directive(directiveName, ['$injector', ($injector: ng.auto.IInjectorService) => {
        return $injector.instantiate(SlickDirective);
    }]);