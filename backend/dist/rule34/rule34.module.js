"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule34Module = void 0;
const common_1 = require("@nestjs/common");
const rule34_controller_1 = require("./rule34.controller");
const rule34_service_1 = require("./rule34.service");
let Rule34Module = class Rule34Module {
};
exports.Rule34Module = Rule34Module;
exports.Rule34Module = Rule34Module = __decorate([
    (0, common_1.Module)({
        controllers: [rule34_controller_1.Rule34Controller],
        providers: [rule34_service_1.Rule34Service],
    })
], Rule34Module);
//# sourceMappingURL=rule34.module.js.map