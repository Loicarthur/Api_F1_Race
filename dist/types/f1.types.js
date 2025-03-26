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
exports.ConstructorStanding = exports.DriverStanding = exports.RaceResult = exports.Race = exports.Constructor = exports.Driver = void 0;
const type_graphql_1 = require("type-graphql");
let Driver = class Driver {
};
exports.Driver = Driver;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Driver.prototype, "driverId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Driver.prototype, "givenName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Driver.prototype, "familyName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Driver.prototype, "dateOfBirth", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Driver.prototype, "nationality", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Driver.prototype, "permanentNumber", void 0);
exports.Driver = Driver = __decorate([
    (0, type_graphql_1.ObjectType)()
], Driver);
let Constructor = class Constructor {
};
exports.Constructor = Constructor;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Constructor.prototype, "constructorId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Constructor.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Constructor.prototype, "nationality", void 0);
exports.Constructor = Constructor = __decorate([
    (0, type_graphql_1.ObjectType)()
], Constructor);
let Race = class Race {
};
exports.Race = Race;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Race.prototype, "round", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Race.prototype, "raceName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Race.prototype, "circuit", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Race.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Race.prototype, "time", void 0);
exports.Race = Race = __decorate([
    (0, type_graphql_1.ObjectType)()
], Race);
let RaceResult = class RaceResult {
};
exports.RaceResult = RaceResult;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RaceResult.prototype, "position", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RaceResult.prototype, "points", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Driver),
    __metadata("design:type", Driver)
], RaceResult.prototype, "Driver", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Constructor),
    __metadata("design:type", Constructor)
], RaceResult.prototype, "Constructor", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RaceResult.prototype, "grid", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RaceResult.prototype, "laps", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RaceResult.prototype, "status", void 0);
exports.RaceResult = RaceResult = __decorate([
    (0, type_graphql_1.ObjectType)()
], RaceResult);
let DriverStanding = class DriverStanding {
};
exports.DriverStanding = DriverStanding;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DriverStanding.prototype, "position", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DriverStanding.prototype, "points", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], DriverStanding.prototype, "wins", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Driver),
    __metadata("design:type", Driver)
], DriverStanding.prototype, "Driver", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Constructor]),
    __metadata("design:type", Array)
], DriverStanding.prototype, "Constructors", void 0);
exports.DriverStanding = DriverStanding = __decorate([
    (0, type_graphql_1.ObjectType)()
], DriverStanding);
let ConstructorStanding = class ConstructorStanding {
};
exports.ConstructorStanding = ConstructorStanding;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ConstructorStanding.prototype, "position", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ConstructorStanding.prototype, "points", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ConstructorStanding.prototype, "wins", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Constructor),
    __metadata("design:type", Constructor)
], ConstructorStanding.prototype, "Constructor", void 0);
exports.ConstructorStanding = ConstructorStanding = __decorate([
    (0, type_graphql_1.ObjectType)()
], ConstructorStanding);
//# sourceMappingURL=f1.types.js.map