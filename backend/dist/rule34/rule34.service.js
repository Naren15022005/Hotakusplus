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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule34Service = void 0;
const common_1 = require("@nestjs/common");
const hentai_api_client_service_1 = require("../common/hentai-api-client/hentai-api-client.service");
let Rule34Service = class Rule34Service {
    apiClient;
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    async autocomplete(query) {
        return this.apiClient.get(`/api/r34/autocomplete/${encodeURIComponent(query)}`);
    }
    async search(query) {
        return this.apiClient.get(`/api/r34/search/${encodeURIComponent(query)}`);
    }
    async getById(id) {
        return this.apiClient.get(`/api/r34/${encodeURIComponent(id)}`);
    }
};
exports.Rule34Service = Rule34Service;
exports.Rule34Service = Rule34Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hentai_api_client_service_1.HentaiApiClientService])
], Rule34Service);
//# sourceMappingURL=rule34.service.js.map