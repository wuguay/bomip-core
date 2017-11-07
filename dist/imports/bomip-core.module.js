import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export var isBlank = function (obj) { return obj === undefined || obj === null; };
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
        NgModule({
            declarations: [],
            exports: [],
            imports: [CommonModule]
        })
    ], BomipCoreModule);
    return BomipCoreModule;
    var BomipCoreModule_1;
}());
export { BomipCoreModule };
//# sourceMappingURL=bomip-core.module.js.map