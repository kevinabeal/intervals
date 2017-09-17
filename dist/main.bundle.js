webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <button\n    *ngIf=\" ! timerOn\"\n    class=\"btn btn-default btn-lg play\"\n    (click)=\"startTimer()\">\n\n    <i class=\"fa fa-play\"></i>\n  </button>\n\n  <button\n    *ngIf=\"timerOn\"\n    class=\"btn btn-default btn-lg pause\"\n    (click)=\"pauseTimer()\">\n\n    <i class=\"fa fa-pause\"></i>\n  </button>\n\n  <button\n    class=\"btn btn-default btn-lg reset pull-right\"\n    (click)=\"resetTimer()\">\n\n    Reset\n  </button>\n\n  <div class=\"timer total-timer\">\n    <div class=\"timer-title\">Total Time Remaining</div>\n    <div\n      class=\"timer-color\"\n      [class.near]=\"totalRemaining.percent < 25\"\n      [class.imminent]=\"totalRemaining.percent < 10\"\n      [style.width]=\"totalRemaining.percent + '%'\">\n      &nbsp;\n    </div>\n\n    <div class=\"timer-text\">\n      {{totalRemaining.minutes}}:{{totalRemaining.seconds}}\n    </div>\n  </div>\n\n  <div class=\"timer interval-timer\">\n    <div class=\"timer-title\">Time Remaining in Interval</div>\n    <div\n      class=\"timer-color\"\n      [class.near]=\"intervalRemaining.percent < 25\"\n      [class.imminent]=\"intervalRemaining.percent < 10\"\n      [style.width]=\"intervalRemaining.percent + '%'\">\n      &nbsp;\n    </div>\n\n    <div class=\"timer-text\">\n      {{intervalRemaining.minutes}}:{{intervalRemaining.seconds}}\n    </div>\n  </div>\n\n  <h1>{{activeInterval.message}}</h1>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  padding: 24px;\n}\nh1 {\n  margin: 24px 0;\n  font-size: 100px;\n}\n.btn {\n  cursor: pointer;\n  font-size: 40px;\n  line-height: 68px;\n  padding-left: 40px;\n  padding-right: 40px;\n}\n.btn.play {\n  background: #B9F6CA;\n  border-color: #00E676;\n}\n.btn.pause {\n  background: #FFE57F;\n  border-color: #FFC400;\n}\n.btn.reset {\n  background: #FF9E80;\n  border-color: #FF3D00;\n}\n.timer {\n  position: relative;\n  line-height: 100px;\n  text-align: right;\n  border: 1px solid #dddddd;\n  border-radius: 2px;\n  margin: 40px 0;\n}\n.timer-title {\n  position: absolute;\n  right: 0;\n  bottom: 100%;\n  font-size: 12px;\n  line-height: 20px;\n  text-transform: uppercase;\n}\n.timer-text {\n  font-size: 56px;\n  font-weight: 500;\n  position: relative;\n  padding-right: 24px;\n}\n.timer-color {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  border-radius: 2px;\n  background: #B3E5FC;\n  transition: width 1s ease-in, background 0.5s ease-in;\n}\n.timer-color.near {\n  background: #FFE0B2;\n}\n.timer-color.imminent {\n  background: #ffcdd2;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nosleep_js__ = __webpack_require__("../../../../nosleep.js/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nosleep_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nosleep_js__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
///////////////////////////////////////////////////////////]
// IMPORTS ------------------------------------------------]
///////////////////////////////////////////////////////////]


// import * as R from 'ramda';
var nosleep = new __WEBPACK_IMPORTED_MODULE_1_nosleep_js__();
///////////////////////////////////////////////////////////]
// COMPONENT ----------------------------------------------]
///////////////////////////////////////////////////////////]
var AppComponent = (function () {
    function AppComponent() {
        /////////////////////////////////////////////////////////]
        // PUBLIC PROPERTIES ------------------------------------]
        this.totalTime = 20 * 60 * 1000;
        this.intervals = getFullIntervalList(intervals);
        this.activeInterval = this.intervals[0];
        /////////////////////////////////////////////////////////]
        // PRIVATE PROPERTIES -----------------------------------]
        this._totalTimer = this._createTotalTimer();
        this._intervalTimer = this._createIntervalTimer();
        this._timerOn = false;
    }
    Object.defineProperty(AppComponent.prototype, "totalTimeRemaining", {
        /////////////////////////////////////////////////////////]
        // PUBLIC GETTERS & SETTERS -----------------------------]
        get: function () {
            return this._totalRemaining || this.totalTime;
        },
        set: function (mil) {
            this._totalRemaining = mil;
            this.totalRemaining.minutes = padNum(Math.floor((mil / 1000) / 60));
            this.totalRemaining.seconds = padNum((mil / 1000) % 60);
            this.totalRemaining.percent = (mil / this.totalTime) * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "intervalTimeRemaining", {
        get: function () {
            return this._intervalRemaining || this.totalTime;
        },
        set: function (mil) {
            this._intervalRemaining = mil;
            this.intervalRemaining.minutes = padNum(Math.floor((mil / 1000) / 60));
            this.intervalRemaining.seconds = padNum((mil / 1000) % 60);
            this.intervalRemaining.percent = (mil / this.activeInterval.length) * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "timerOn", {
        get: function () {
            return this._timerOn;
        },
        set: function (v) {
            this._timerOn = v;
            nosleep[v ? 'enable' : 'disable']();
        },
        enumerable: true,
        configurable: true
    });
    /////////////////////////////////////////////////////////]
    // PUBLIC METHODS ---------------------------------------]
    // PUBLIC METHOD ----------------------------------------]
    AppComponent.prototype.startTimer = function () {
        if (this.totalTime === this.totalTimeRemaining) {
            playExplosionSound();
        }
        this._totalTimer.start();
        this._intervalTimer.start();
        this.timerOn = true;
    };
    // PUBLIC METHOD ----------------------------------------]
    AppComponent.prototype.pauseTimer = function () {
        this._totalTimer.stop();
        this._intervalTimer.stop();
        this.timerOn = false;
    };
    // PUBLIC METHOD ----------------------------------------]
    AppComponent.prototype.resetTimer = function () {
        this.pauseTimer();
        this._setupTimers();
    };
    // PUBLIC METHOD ----------------------------------------]
    AppComponent.prototype.ngOnInit = function () {
        this._setupTimers();
    };
    /////////////////////////////////////////////////////////]
    // PRIVATE METHODS --------------------------------------]
    // PRIVATE METHOD ---------------------------------------]
    AppComponent.prototype._setupTimers = function () {
        this.totalRemaining = this._blankRemaining();
        this.intervalRemaining = this._blankRemaining();
        this.totalTimeRemaining = this.totalTime;
        this._totalTimer = this._createTotalTimer();
        this._intervalTimer = this._createIntervalTimer();
        this.intervals = getFullIntervalList(intervals);
        this.activeInterval = this.intervals[0];
    };
    // PRIVATE METHOD ---------------------------------------]
    AppComponent.prototype._createTotalTimer = function () {
        var _this = this;
        return createTimer(this.totalTime, function (mil) {
            _this.totalTimeRemaining = mil;
        }).onEnd(function () {
            _this.timerOn = false;
            playAlarmSound(3);
        });
    };
    // PRIVATE METHOD ---------------------------------------]
    AppComponent.prototype._createIntervalTimer = function () {
        var _this = this;
        return createTimer(this.activeInterval.length, function (mil) {
            _this.intervalTimeRemaining = mil;
        }).onEnd(function () {
            _this.intervals.shift();
            if (_this.intervals.length === 0) {
                return;
            }
            _this.activeInterval = _this.intervals[0];
            _this._intervalTimer = _this._createIntervalTimer();
            _this._intervalTimer.start();
            playAlarmSound(3);
        });
    };
    // PRIVATE METHOD ---------------------------------------]
    AppComponent.prototype._blankRemaining = function () {
        return {
            minutes: '0',
            seconds: '00',
            percent: 0,
        };
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.less")]
    })
], AppComponent);

///////////////////////////////////////////////////////////]
// CONFIG -------------------------------------------------]
///////////////////////////////////////////////////////////]
var intervals = [{
        message: 'Warm Up & Stretch 🏃🏻',
        // length: .25 * 60 * 1000,
        length: 2.5 * 60 * 1000,
    }, {
        message: 'Push to 70% of Your Max 💪🏻',
        length: .5 * 60 * 1000,
    }, {
        message: 'Slow It Down 👌🏻',
        length: 2 * 60 * 1000,
    }, {
        message: 'Push to 75% of Your Max 💪🏻',
        length: .5 * 60 * 1000,
    }, {
        message: 'Slow It Down 👌🏻',
        length: 2 * 60 * 1000,
    }, {
        message: 'Push to 80% of Your Max 💪🏻',
        length: .5 * 60 * 1000,
    }, {
        message: 'Slow It Down 👌🏻',
        length: 2 * 60 * 1000,
    }, {
        message: 'Push to 85% of Your Max 💪🏻',
        length: .5 * 60 * 1000,
    }, {
        message: 'Slow It Down 👌🏻',
        length: 2 * 60 * 1000,
    }, {
        message: 'Push to 90% of Your Max 💪🏻',
        length: .5 * 60 * 1000,
    }, {
        message: 'Slow It Down 👌🏻',
        length: 2 * 60 * 1000,
    }, {
        message: 'Push to 100% of Your Max 💪🏻',
        length: .5 * 60 * 1000,
    }, {
        message: 'Slow It Down 👌🏻',
        length: 2 * 60 * 1000,
    }, {
        message: 'Cool Down & Stretch 🏃🏻',
        length: 2.5 * 60 * 1000,
    }];
///////////////////////////////////////////////////////////]
// PURE FUNCTIONS -----------------------------------------]
///////////////////////////////////////////////////////////]
// PURE FUNCTION ------------------------------------------]
function getFullIntervalList(arr) {
    var elapsed = 0;
    return arr.map(function (_a, i) {
        var message = _a.message, length = _a.length;
        var begin = elapsed;
        var end = (elapsed += length);
        return {
            message: message,
            length: length,
            begin: begin,
            end: end,
        };
    });
}
// PURE FUNCTION ------------------------------------------]
function createTimer(mil, fn) {
    var interval;
    var ending;
    var timer = {
        start: function () {
            interval = setInterval(function () {
                mil -= 1000;
                if (mil <= 0) {
                    clearInterval(interval);
                    ending();
                }
                else {
                    fn(mil);
                }
            }, 1000);
            return timer;
        },
        stop: function () {
            clearInterval(interval);
            return timer;
        },
        onEnd: function (endFn) {
            ending = endFn;
            return timer;
        },
    };
    return timer;
}
// PURE FUNCTION ------------------------------------------]
function padNum(num) {
    return padStart(String(num), 2, '0');
}
// PURE FUNCTION ------------------------------------------]
function padStart(str, targetLength, padString) {
    // tslint:disable-next-line:no-bitwise
    targetLength = targetLength >> 0;
    padString = String(padString || ' ');
    if (str.length > targetLength) {
        return String(str);
    }
    else {
        targetLength = targetLength - str.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(str);
    }
}
// PURE FUNCTION ------------------------------------------]
function playExplosionSound() {
    playSound('assets/explosion.mp3').volume = 0.25;
}
// PURE FUNCTION ------------------------------------------]
function playAlarmSound(beeps) {
    if (beeps === void 0) { beeps = 3; }
    var audio = playSound('assets/stopwatch-alarm.mp3');
    setTimeout(function () { return audio.pause(); }, beeps * 900);
}
// PURE FUNCTION ------------------------------------------]
function playSound(src) {
    var audio = new Audio(src);
    audio.play();
    return audio;
}
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map