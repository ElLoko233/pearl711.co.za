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

/***/ "./src/ts/custom/navbarui.ts":
/*!***********************************!*\
  !*** ./src/ts/custom/navbarui.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NavigationBarUI)\n/* harmony export */ });\nclass NavigationBarUI {\n    _navTogglerClose;\n    _navTogglerOpen;\n    _navLinksContainer;\n    _navHiddenClass = \"hidden\";\n    constructor() {\n        this._navTogglerClose = document.querySelector('nav #nav-toggler-close');\n        this._navTogglerOpen = document.querySelector('nav #nav-toggler-open');\n        this._navLinksContainer = document.querySelector('nav #nav-links-container');\n    }\n    set navTogglerClose(cssPath) {\n        const selector = document.querySelector(cssPath);\n        if (selector) {\n            this._navTogglerClose = selector;\n        }\n        else {\n            throw new Error('The css path provided for the close navigation button is invalid');\n        }\n    }\n    get navTogglerClose() {\n        return this._navTogglerClose;\n    }\n    set navTogglerOpen(cssPath) {\n        const selector = document.querySelector(cssPath);\n        if (selector) {\n            this._navTogglerOpen = selector;\n        }\n        else {\n            throw new Error('The css path provided for the open navigation button is invalid');\n        }\n    }\n    get navTogglerOpen() {\n        return this._navTogglerOpen;\n    }\n    set navLinksContainer(cssPath) {\n        const selector = document.querySelector(cssPath);\n        if (selector) {\n            this._navLinksContainer = selector;\n        }\n        else {\n            throw new Error('The css path provided for the navigation links container is invalid');\n        }\n    }\n    get navLinksContainer() {\n        return this._navLinksContainer;\n    }\n    get navHiddenClass() {\n        return this._navHiddenClass;\n    }\n    set navHiddenClass(cssClass) {\n        this._navHiddenClass = cssClass;\n    }\n    initialize = () => {\n        this.getNavigationOpenButton().addEventListener('click', event => {\n            event.preventDefault();\n            this.openNavigation();\n        });\n        this.getNavigationCloseButton().addEventListener('click', event => {\n            event.preventDefault();\n            this.closeNavigation();\n        });\n        window.addEventListener('resize', event => {\n            event.preventDefault();\n            if (!this.getNavigationLinksContainer().classList.contains(this.navHiddenClass)) {\n                this.closeNavigation();\n            }\n        });\n    };\n    getNavigationCloseButton = () => {\n        return this.navTogglerClose;\n    };\n    getNavigationOpenButton = () => {\n        return this.navTogglerOpen;\n    };\n    getNavigationLinksContainer = () => {\n        return this.navLinksContainer;\n    };\n    getSignUpButton = () => {\n        return document.querySelector('nav #popup-signup');\n    };\n    getLoginButton = () => {\n        return document.querySelector('nav #popup-login');\n    };\n    getCreateAdminButton = () => {\n        return document.querySelector('nav #popup-createadmin');\n    };\n    getLogOutButton = () => {\n        return document.querySelector('nav #logout');\n    };\n    closeNavigation = () => {\n        this.getNavigationCloseButton().classList.add(this.navHiddenClass);\n        this.getNavigationOpenButton().classList.remove(this.navHiddenClass);\n        this.getNavigationLinksContainer().classList.add(this.navHiddenClass);\n    };\n    openNavigation = () => {\n        this.getNavigationOpenButton().classList.add(this.navHiddenClass);\n        this.getNavigationCloseButton().classList.remove(this.navHiddenClass);\n        this.getNavigationLinksContainer().classList.remove(this.navHiddenClass);\n    };\n}\n;\n\n\n//# sourceURL=webpack://pearl711.co.za/./src/ts/custom/navbarui.ts?");

/***/ }),

/***/ "./src/ts/products.ts":
/*!****************************!*\
  !*** ./src/ts/products.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _custom_navbarui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom/navbarui */ \"./src/ts/custom/navbarui.ts\");\n\nconst navbar = new _custom_navbarui__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nnavbar.initialize();\n\n\n//# sourceURL=webpack://pearl711.co.za/./src/ts/products.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/products.ts");
/******/ 	
/******/ })()
;