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
exports.HanimeController = void 0;
const common_1 = require("@nestjs/common");
const hanime_service_1 = require("./hanime.service");
let HanimeController = class HanimeController {
    hanimeService;
    constructor(hanimeService) {
        this.hanimeService = hanimeService;
    }
    search(query) {
        return this.hanimeService.search(query);
    }
    getStreams(slug) {
        return this.hanimeService.getStreams(slug);
    }
    getBySlug(slug) {
        return this.hanimeService.getBySlug(slug);
    }
};
exports.HanimeController = HanimeController;
__decorate([
    (0, common_1.Get)('search/:query'),
    __param(0, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HanimeController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('streams/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HanimeController.prototype, "getStreams", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HanimeController.prototype, "getBySlug", null);
exports.HanimeController = HanimeController = __decorate([
    (0, common_1.Controller)('api/hanime'),
    __metadata("design:paramtypes", [hanime_service_1.HanimeService])
], HanimeController);
//# sourceMappingURL=hanime.controller.js.map