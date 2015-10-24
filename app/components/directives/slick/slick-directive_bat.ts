// /// < r eference path='../../../app.d.ts' />
// /// <amd-dependency path='slick-carousel' />
// /// <amd-dependency path='css!./slick.css' />
// /// <amd-dependency path='css!../../../vendor/slick-carousel/slick.css' />
// import cssEventUtility = require('../../../utility/css_event_utility');
// import timeoutService = require('../../../components/services/timeout/timeout-service');
// 'use strict';

// /*
// The MIT License (MIT)

// Copyright (c) 2014 Vasyl Stanislavchuk

// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//  */

// //A message from Chris Scribner (current / former Blackboard employee):
// //I started with code from https://github.com/vasyabigi/angular-slick, but decided to copy it here because I need to make a few
// //changes, the author is not responding to issues / pull requests, and it's a small amount of code

// /// <amd-dependency path='slick-carousel' />
// import $ = require('jquery');
// import angular = require('angular');
// import breakpoint = require('../../../utility/breakpoint');
// 'use strict';
// declare var Slick: any;

// export var moduleName = 'bbSlick';

// /**
//  * An angular directive for the slick carousel (http://kenwheeler.github.io/slick/).
//  * See http://kenwheeler.github.io/slick/ and https://github.com/vasyabigi/angular-slick for info on other settings
//  *
//  * @attribute {boolean=} manualInit Indicates that the slick carousel should not be automatically initialized
//  * @attribute {object=} slickHandle If specified, the JQuery element will be stored in this location such to allow direct access to the
//  *                             underlying component. For instance, to initialize it or go to a different page.
//  *
//  * ### Sample usage:
//  *
//  * ```html
//  *
//  *  <div bb-slick>
//  *  </div>
//  *
//  * ```
//  */
// export class SlickDirective implements ng.IDirective {
//   static $inject = [timeoutService.serviceName];

//   constructor(private timeout: timeoutService.Service) {

//   }

//   restrict = 'AE';

//   scope = {
//     initOnload: '@',
//     data: '=',
//     currentIndex: '=?',
//     accessibility: '@',
//     arrows: '@',
//     asNavFor: '@',
//     autoplay: '@',
//     autoplaySpeed: '@',
//     centerMode: '@',
//     centerPadding: '@',
//     cssEase: '@',
//     dots: '@',
//     draggable: '@',
//     easing: '@',
//     fade: '@',
//     focusOnSelect: '@',
//     infinite: '@',
//     init: '&',
//     initialSlide: '=?',
//     lazyLoad: '@',
//     manualInit: '=',
//     nextArrow: '@',
//     onBeforeChange: '&',
//     onAfterChange: '&',
//     onInit: '&',
//     onReInit: '&',
//     onUpdate: '&',
//     pauseOnHover: '@',
//     prevArrow: '@',
//     responsive: '=',
//     slickHandle: '=',
//     slide: '@',
//     slidesToShow: '=?',
//     slidesToScroll: '@',
//     speed: '@',
//     swipe: '@',
//     touchMove: '@',
//     touchThreshold: '@',
//     toUpdateSlide: '=',
//     vertical: '@',
//     useCss: '@'
//   };

//   link = (scope: any, element: JQuery, attrs: any) => {
//     var isInitialized = false;
//     var isInit = false;
//     var slider: any = $(element);

//     scope.$on('$destroy', () => {
//       if (isInit) {
//         // Slick takes a list of elements and applies styles to turn it into a carousel. Calling unslick too early might cause flashes of
//         // unstyled content to appear to the user. This "unslick" method will typically be called when closing a panel. The longest
//         // "panel closing" animation in at the top of _offcanvas-panels.scss is 500ms long, so I'm adding a 500ms delay here to make sure
//         // to only unslick after the panel has been closed and prevent those flashes of unstyled content. See screenshots at LRN-101644 to
//         // get an idea of what this looks like to the user without this fix.
//         this.timeout(() => {
//           slider.slick('unslick');
//         }, scope, 500);
//       }
//     });

//     var prevArrow = $(scope.prevArrow);
//     var nextArrow = $(scope.nextArrow);

//     function updateArrowState() {
//       if (prevArrow.hasClass('slick-disabled')) {
//         prevArrow.attr('disabled', 'disabled');
//       } else {
//         prevArrow.removeAttr('disabled');
//       }

//       if (nextArrow.hasClass('slick-disabled')) {
//         nextArrow.attr('disabled', 'disabled');
//       } else {
//         nextArrow.removeAttr('disabled');
//       }
//     }

//     function initializeSlick() {
//       // setup the event listeners (which replace the callback methods starting with slick.js 1.4)
//       element.on('beforeChange', function(event: JQueryEventObject, sl: any, oldIndex: number, newIndex: number) {
//         if (scope.onBeforeChange) {
//           scope.onBeforeChange({$event: event, $sl: sl, $oldIndex: oldIndex, $newIndex: newIndex});
//         }
//         //remove aria-hidden attribute to make screen reader work
//         element.find('.slick-slide').removeAttr('aria-hidden');
//       });

//       element.on('afterChange', function (event: JQueryEventObject, sl: any, newIndex: number) {
//         updateArrowState();

//         if (scope.onAfterChange) {
//           scope.onAfterChange({$event: event, $sl: sl, $newIndex: newIndex});
//         }

//         element.find('.slick-slide').removeAttr('aria-hidden');

//         if (scope.$$phase || scope.$root.$$phase) {
//           scope.currentIndex = newIndex;
//         } else {
//           return scope.$apply(function () {
//             return scope.currentIndex = newIndex;
//           });
//         }
//       });

//       element.on('init', function (event: JQueryEventObject, sl: any) {
//         if (sl.slideCount <= sl.options.slidesToShow) {
//           prevArrow.addClass('slick-disabled');
//           nextArrow.addClass('slick-disabled');
//         }

//         if (scope.onInit) {
//           scope.onInit();
//         }

//         element.find('.slick-slide').removeAttr('aria-hidden');

//         updateArrowState();

//         // Sometimes, when the page loads, a scrollbar is added, then removed once the panel is fully loaded, which results in wrong widths,
//         // so we need to manually fire a resize event here.
//         $(window).trigger('resize');

//         isInit = true;

//         if (scope.toUpdateSlide) {
//           scope.toUpdateSlide = false;
//           return sl.slideHandler(scope.currentIndex, false, true);
//         }
//       });

//       if (scope.onReInit) {
//         element.on('reInit', function (event: JQueryEventObject, sl: any) {
//           scope.onReInit();
//         });
//       }

//       slider.slick({
//         accessibility: scope.accessibility !== 'false',
//         arrows: scope.arrows !== 'false',
//         asNavFor: scope.asNavFor,
//         autoplay: scope.autoplay === 'true',
//         autoplaySpeed: scope.autoplaySpeed != null ? parseInt(scope.autoplaySpeed, 10) : 3000,
//         centerMode: scope.centerMode === 'true',
//         centerPadding: scope.centerPadding || '50px',
//         cssEase: scope.cssEase || 'ease',
//         dots: scope.dots === 'true',
//         draggable: scope.draggable === 'true',
//         easing: scope.easing || 'linear',
//         fade: scope.fade === 'true',
//         focusOnSelect: scope.focusOnSelect === 'true',
//         infinite: scope.infinite !== 'false',
//         initialSlide: scope.initialSlide != null ? parseInt(scope.initialSlide, 10) : 0,
//         lazyLoad: scope.lazyLoad || 'ondemand',
//         //This needs to select the DOM node instead of be a string to prevent arrow from getting removed when switching breakpoints
//         nextArrow: $(scope.nextArrow),
//         pauseOnHover: scope.pauseOnHover !== 'false',
//         //This needs to select the DOM node instead of be a string to prevent arrow from getting removed when switching breakpoints
//         prevArrow: $(scope.prevArrow),
//         responsive: scope.responsive,
//         slide: scope.slide || 'div',
//         slidesToShow: scope.slidesToShow,
//         slidesToScroll: scope.slidesToScroll != null ? parseInt(scope.slidesToScroll, 10) : 1,
//         speed: scope.speed != null ? parseInt(scope.speed, 10) : 300,
//         swipe: scope.swipe !== 'false',
//         touchMove: scope.touchMove !== 'false',
//         touchThreshold: scope.touchThreshold ? parseInt(scope.touchThreshold, 10) : 5,
//         useCSS: scope.useCss !== 'false',
//         vertical: scope.vertical === 'true'
//       });

//       // See LRN-101426 for more info
//       $(window).on('resize', () => {
//         // slick.js already recalculates widths and positions when resizing the browser window horizontally.
//         // For some reason, there's code there to prevent it from recalculating when resizing vertically, so we need to force it here.
//         // This happens especially when resizing shows/hides the vertical scrollbar.
//         if (slider.get(0).slick && $(window).width() === slider.get(0).slick.windowWidth) {
//           slider.get(0).slick.setPosition();
//         }
//       });
//     }

//     function destroySlick() {
//       slider.slick('unslick');
//       slider.find('.slick-list').remove();
//     }

//     if (scope.slickHandle) {
//       scope.slickHandle = slider;
//     }

//     if (scope.manualInit) {
//       slider.init = initializeSlick;
//     } else if (scope.initOnload) {
//       isInitialized = false;
//       scope.$watch('data', (newVal: any[], oldVal: any[]) => {
//         if (newVal != null) {
//           if (isInitialized) {
//             if (newVal.length !== oldVal.length) {
//               scope.onUpdate();
//             }
//             //when delete the term from the slick, because the ng-repeat will refresh dom later,
//             //so we'd better to re-construct the slick in next digest loop.
//             if (newVal.length < oldVal.length) {
//               this.timeout(() => {
//                 destroySlick();
//                 initializeSlick();
//                 scope.$emit('update-slick-refresh');
//               }, scope, 0, false);
//             } else {
//               destroySlick();
//               initializeSlick();
//               scope.$emit('update-slick-refresh');
//             }
//           } else {
//             initializeSlick();
//             isInitialized = true;
//           }
//         }
//       });
//     } else {
//       return initializeSlick();
//     }

//     // Force slick.js (using the `setPosition` method) to recalculate panel positions after the browser window is resized and the panels
//     // go from small/medium format to large format. Without this, slick.js calculates new widths immediately after the browser window is
//     // resized. This is an issue because there's an animation that happens when going from small/medium to large format where the panel
//     // width is shrunk a little over time instead of having their final width set immediately. slick.js then calculates positions and widths
//     // based on a larger panel width than what it will eventually be, resulting in some content being on the right side overflowing and
//     // being cropped. See LRN-93911.
//     $(window).on('bb-offcanvas-breakpoint-large bb-offcanvas-breakpoint-small', () => {
//       cssEventUtility.onTransitionEnd($(window), (event: JQueryEventObject) => {
//         if (!event.data.noTransitions && (<any>event.target).className.indexOf('bb-offcanvas-panel') === -1) {
//           return false;
//         }

//         if (slider.get(0).slick) {
//           // Calling the setPosition method forces it to recalculate widths and positions (see http://stackoverflow.com/a/26680322/3023040).
//           slider.get(0).slick.setPosition();
//         }
//       });
//     });
//   };
// }

// angular.module(moduleName, [timeoutService.moduleName])
//   .directive('bbSlick', ['$injector', ($injector: ng.auto.IInjectorService) => {
//     return $injector.instantiate(SlickDirective);
//   }]);