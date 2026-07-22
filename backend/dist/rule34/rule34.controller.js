"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule34Controller = void 0;
const common_1 = require("@nestjs/common");
const rule34_service_1 = require("./rule34.service");
let Rule34Controller = class Rule34Controller {
    rule34Service;
    constructor(rule34Service) {
        this.rule34Service = rule34Service;
    }
    autocomplete(query) {
        return this.rule34Service.autocomplete(query);
    }
    search(query) {
        return this.rule34Service.search(query);
    }
    getById(id) {
        return this.rule34Service.getById(id);
    }
};
exports.Rule34Controller = Rule34Controller;
__decorate([
    (0, common_1.Get)('autocomplete/:query'),
    __param(0, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Rule34Controller.prototype, "autocomplete", null);
__decorate([
    (0, common_1.Get)('search/:query'),
    __param(0, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Rule34Controller.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Rule34Controller.prototype, "getById", null);
exports.Rule34Controller = Rule34Controller = __decorate([
    (0, common_1.Controller)('api/r34'),
    __metadata("design:paramtypes", [rule34_service_1.Rule34Service])
], Rule34Controller);
//# sourceMappingURL=rule34.controller.js.map