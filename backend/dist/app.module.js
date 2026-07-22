"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const hentai_api_client_module_1 = require("./common/hentai-api-client/hentai-api-client.module");
const hanime_module_1 = require("./hanime/hanime.module");
const hentai_haven_module_1 = require("./hentai-haven/hentai-haven.module");
const rule34_module_1 = require("./rule34/rule34.module");
const frontend_controller_1 = require("./frontend.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            hentai_api_client_module_1.HentaiApiClientModule,
            hanime_module_1.HanimeModule,
            hentai_haven_module_1.HentaiHavenModule,
            rule34_module_1.Rule34Module,
        ],
        controllers: [frontend_controller_1.FrontendController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map