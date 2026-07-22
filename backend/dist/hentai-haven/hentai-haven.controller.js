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
exports.HentaiHavenController = void 0;
const common_1 = require("@nestjs/common");
const hentai_haven_service_1 = require("./hentai-haven.service");
let HentaiHavenController = class HentaiHavenController {
    hentaiHavenService;
    constructor(hentaiHavenService) {
        this.hentaiHavenService = hentaiHavenService;
    }
    search(query) {
        return this.hentaiHavenService.search(query);
    }
    getSources(id) {
        return this.hentaiHavenService.getSources(id);
    }
    getById(id) {
        return this.hentaiHavenService.getById(id);
    }
};
exports.HentaiHavenController = HentaiHavenController;
__decorate([
    (0, common_1.Get)('search/:query'),
    __param(0, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HentaiHavenController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('sources/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HentaiHavenController.prototype, "getSources", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HentaiHavenController.prototype, "getById", null);
exports.HentaiHavenController = HentaiHavenController = __decorate([
    (0, common_1.Controller)('api/hh'),
    __metadata("design:paramtypes", [hentai_haven_service_1.HentaiHavenService])
], HentaiHavenController);
//# sourceMappingURL=hentai-haven.controller.js.map