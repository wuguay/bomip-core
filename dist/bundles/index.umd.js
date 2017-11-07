(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global.bp = global.bp || {}, global.bp.core = {}),global.core,global.common));
}(this, (function (exports,core,common) { 'use strict';

var isBlank = function (obj) { return obj === undefined || obj === null; };
var BomipCoreModule = /** @class */ (function () {
    function BomipCoreModule() {
    }
    BomipCoreModule_1 = BomipCoreModule;
    BomipCoreModule.forRoot = function () {
        return {
            ngModule: BomipCoreModule_1,
            providers: []
        };
    };
    BomipCoreModule = BomipCoreModule_1 = __decorate([
        core.NgModule({
            declarations: [],
            exports: [],
            imports: [common.CommonModule]
        })
    ], BomipCoreModule);
    return BomipCoreModule;
    var BomipCoreModule_1;
}());

// export * from './imports/angular/index';
// export * from './imports/core/index';
// export * from './imports/nlp/index';
// export * from './imports/rx/index';
// export * from './imports/sam/index';

exports.isBlank = isBlank;
exports.BomipCoreModule = BomipCoreModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
