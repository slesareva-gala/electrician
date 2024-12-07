/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_placeArrowUp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/placeArrowUp */ \"./modules/placeArrowUp.js\");\n/* harmony import */ var _modules_navigateDocument__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/navigateDocument */ \"./modules/navigateDocument.js\");\n\r\n\r\n\r\n(0,_modules_navigateDocument__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(767)\r\n;(0,_modules_placeArrowUp__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\r\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./modules/helpers.js":
/*!****************************!*\
  !*** ./modules/helpers.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   animate: () => (/* binding */ animate),\n/* harmony export */   dbload: () => (/* binding */ dbload),\n/* harmony export */   modal: () => (/* binding */ modal),\n/* harmony export */   smoothScroll: () => (/* binding */ smoothScroll)\n/* harmony export */ });\n\r\n\r\nconst dbload = (url) => fetch(url)\r\n  .then(response => {\r\n    if (!response.ok) throw new Error(response.statusText)\r\n    return response.json()\r\n  })\r\n\r\nconst animate = ({ draw = () => { }, duration = 1000, timingplane = 'linear', timeframe = 16.7, execute = () => true }) => {\r\n\r\n  const timing = {\r\n    linear: (x) => x,\r\n\r\n    easeOutCubic: (x) => 1 - Math.pow(1 - x, 3),\r\n    easeInOutCubic: (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,\r\n    easeOutQuart: (x) => 1 - Math.pow(1 - x, 5),\r\n    easeOutExpo: (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x),\r\n    easeInExpo: (x) => x === 0 ? 0 : Math.pow(2, 10 * x - 10),\r\n\r\n  };\r\n  if (!(timingplane in timing)) { timingplane = 'linear'; }\r\n\r\n  const maxCountAnimation = Math.max(Math.round(duration / timeframe), 1);\r\n  let countAnimation = 0;\r\n\r\n  requestAnimationFrame(function animation() {\r\n    let progress = countAnimation === 0 ? 0 :\r\n      countAnimation > maxCountAnimation - 1 ? 1 :\r\n        timing[timingplane](countAnimation / maxCountAnimation);\r\n\r\n    if (!execute()) return\r\n\r\n    draw(progress);\r\n\r\n    if (countAnimation < maxCountAnimation) {\r\n      countAnimation++;\r\n      requestAnimationFrame(animation);\r\n    }\r\n  });\r\n};\r\n\r\nconst smoothScroll = (selectors, shift = 0, duration = 1000) => {\r\n  const targetElement = document.querySelector(selectors)\r\n\r\n  if (!targetElement) return\r\n\r\n  const scrollY = window.scrollY;\r\n  const transitionHeight = targetElement.getBoundingClientRect().top + shift;\r\n\r\n  animate({\r\n    duration: duration,\r\n    timingplane: 'easeOutCubic',\r\n    draw(progress) {\r\n      window.scrollTo(0, scrollY + transitionHeight * progress);\r\n    }\r\n  });\r\n};\r\n\r\nconst modal = ({ modal, modalContent, states = 'show', time = undefined }) => {\r\n\r\n  const actions = {\r\n\r\n    show: (time = 1000) => {\r\n\r\n      modal.style.transform = 'translateX(0)'\r\n\r\n      if (time === 0) {\r\n        modalContent.style.left = `50%`;\r\n        modalContent.style.transform = `translateX(-50% )`;\r\n\r\n      } else {\r\n        animate({\r\n          timingplane: 'easeOutExpo',\r\n          draw(progress) {\r\n            modalContent.style.left = `${100 - progress * 50}%`;\r\n            modalContent.style.transform = `translateX( ${-50 * progress}% )`;\r\n          },\r\n          duration: time\r\n        });\r\n      }\r\n    },\r\n\r\n    hide: (time = 300) => {\r\n\r\n      if (time === 0) {\r\n        modalContent.style.left = ``;\r\n        modalContent.style.transform = ``;\r\n        modal.style.transform = '';\r\n      } else {\r\n        animate({\r\n          draw(progress) {\r\n            if (progress === 1) {\r\n              modal.style.opacity = '';\r\n              modalContent.style.left = ``;\r\n              modalContent.style.transform = ``;\r\n              modal.style.transform = ''\r\n            } else modal.style.opacity = `${1 - progress}`;\r\n          },\r\n          duration: time\r\n        });\r\n      }\r\n    }\r\n  }\r\n  if (modal && modalContent) actions[states](time)\r\n}\r\n\n\n//# sourceURL=webpack:///./modules/helpers.js?");

/***/ }),

/***/ "./modules/navigateDocument.js":
/*!*************************************!*\
  !*** ./modules/navigateDocument.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./modules/helpers.js\");\n\r\n\r\nconst navigateDocument = (maxMediaMobile) => {\r\n    const mobileMenu = document.querySelector('.mobile-menu')\r\n    const orderCallback = document.querySelector('.modal-overlay');\r\n    const orderCallbackContent = orderCallback ? orderCallback.querySelector('.modal-callback') : null;\r\n    const headerWrapper = document.querySelector('.header-wrapper')\r\n\r\n    const clickList = {\r\n        name: 'click',\r\n        '.up': () => {\r\n            ;(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.smoothScroll)('.main-wrapper')\r\n        }\r\n    }\r\n    const mousedownList = { name: 'mousedown' }\r\n\r\n    if (orderCallbackContent) {\r\n        clickList['.order-call'] = (t) => {\r\n            if (t.closest('.mobile-menu')) mobileMenu.classList.remove('open')\r\n            ;(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.modal)({\r\n                modal: orderCallback,\r\n                modalContent: orderCallbackContent,\r\n                states: 'show',\r\n                time: window.innerWidth < maxMediaMobile + 1 ? 0 : 1000,\r\n            })\r\n        }\r\n        mousedownList['.modal-overlay'] = (t, p) => {\r\n            if (t === p || t.closest('.modal-close')) {\r\n                (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.modal)({\r\n                    modal: orderCallback,\r\n                    modalContent: orderCallbackContent,\r\n                    states: 'hide',\r\n                    time: window.innerWidth < maxMediaMobile + 1 ? 0 : 300,\r\n                })\r\n            }\r\n        }\r\n    }\r\n    if (headerWrapper) {\r\n        clickList['.smooth-scroll'] = (t) => {\r\n            if (t.closest('.mobile-menu')) mobileMenu.classList.remove('open')\r\n            ;(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.smoothScroll)(t.getAttribute('href'), 1 - headerWrapper.offsetHeight)\r\n        }\r\n    }\r\n    if (mobileMenu) {\r\n        clickList['.mob-menu-btn'] = () => { mobileMenu.classList.add('open') }\r\n        clickList['.mobile-menu-close'] = () => { mobileMenu.classList.remove('open') }\r\n        clickList['.overlay'] = () => { mobileMenu.classList.remove('open') }\r\n    }\r\n\r\n    [clickList, mousedownList].forEach(o => {\r\n        document.addEventListener(o.name, (e) => {\r\n            let elParent\r\n            for (let key in o) {\r\n                if (key === 'name') continue\r\n                if ((elParent = e.target.closest(key))) {\r\n                    o[key](e.target, elParent)\r\n                    break\r\n                }\r\n            }\r\n        })\r\n    });\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (navigateDocument);\n\n//# sourceURL=webpack:///./modules/navigateDocument.js?");

/***/ }),

/***/ "./modules/placeArrowUp.js":
/*!*********************************!*\
  !*** ./modules/placeArrowUp.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst placeArrowUp = () => {\r\n    const services = document.getElementById('services')\r\n    const headerWrapper = document.querySelector('.header-wrapper')\r\n    const arrowUp = document.querySelector('.up')\r\n\r\n    if (!services || !headerWrapper || !arrowUp) return\r\n\r\n    const arrowTopWidth = arrowUp.offsetWidth\r\n\r\n    const visibilityArrowTop = () => {\r\n        const right = (window.innerWidth - arrowUp.parentNode.offsetWidth) / 2 - arrowTopWidth\r\n\r\n        arrowUp.hidden = services.offsetTop > window.pageYOffset + headerWrapper.offsetHeight\r\n        arrowUp.style.right = right > 0 ? `${right}px` : ''\r\n    }\r\n\r\n    window.addEventListener('scroll', () => {\r\n        visibilityArrowTop()\r\n    });\r\n\r\n    window.addEventListener('resize', () => {\r\n        visibilityArrowTop()\r\n    })\r\n\r\n    visibilityArrowTop()\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (placeArrowUp);\n\n//# sourceURL=webpack:///./modules/placeArrowUp.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;