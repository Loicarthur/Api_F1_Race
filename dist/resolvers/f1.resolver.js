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
exports.F1Resolver = void 0;
const type_graphql_1 = require("type-graphql");
const f1_service_1 = require("../services/f1.service");
const f1_types_1 = require("../types/f1.types");
const auth_1 = require("../middleware/auth");
let F1Resolver = class F1Resolver {
    constructor() {
        this.f1Service = new f1_service_1.F1Service();
    }
    async driverStandings(season) {
        return this.f1Service.getDriverStandings(season);
    }
    async raceResults(season, round) {
        return this.f1Service.getRaceResults(season, round);
    }
    async driverInfo(driverId) {
        return this.f1Service.getDriverInfo(driverId);
    }
    async raceSchedule(season) {
        return this.f1Service.getRaceSchedule(season);
    }
    async constructorStandings(season) {
        return this.f1Service.getConstructorStandings(season);
    }
};
exports.F1Resolver = F1Resolver;
__decorate([
    (0, type_graphql_1.Query)(() => [f1_types_1.DriverStanding]),
    (0, type_graphql_1.UseMiddleware)(auth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('season', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], F1Resolver.prototype, "driverStandings", null);
__decorate([
    (0, type_graphql_1.Query)(() => [f1_types_1.RaceResult]),
    (0, type_graphql_1.UseMiddleware)(auth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('season')),
    __param(1, (0, type_graphql_1.Arg)('round')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], F1Resolver.prototype, "raceResults", null);
__decorate([
    (0, type_graphql_1.Query)(() => f1_types_1.Driver),
    (0, type_graphql_1.UseMiddleware)(auth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('driverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], F1Resolver.prototype, "driverInfo", null);
__decorate([
    (0, type_graphql_1.Query)(() => [f1_types_1.Race]),
    (0, type_graphql_1.UseMiddleware)(auth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('season', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], F1Resolver.prototype, "raceSchedule", null);
__decorate([
    (0, type_graphql_1.Query)(() => [f1_types_1.ConstructorStanding]),
    (0, type_graphql_1.UseMiddleware)(auth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('season', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], F1Resolver.prototype, "constructorStandings", null);
exports.F1Resolver = F1Resolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [])
], F1Resolver);
//# sourceMappingURL=f1.resolver.js.map