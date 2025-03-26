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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../models/User");
const auth_input_1 = require("../schemas/auth.input");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let AuthResolver = class AuthResolver {
    async register(input) {
        try {
            const existingUser = await User_1.UserModel.findOne({ email: input.email });
            if (existingUser) {
                throw new Error('User already exists');
            }
            const hashedPassword = await bcryptjs_1.default.hash(input.password, 12);
            const user = new User_1.UserModel({
                username: input.username,
                email: input.email,
                password: hashedPassword,
            });
            await user.save();
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1d' });
            return token;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('An unexpected error occurred');
        }
    }
    async login(input) {
        try {
            const user = await User_1.UserModel.findOne({ email: input.email });
            if (!user) {
                throw new Error('User not found');
            }
            const isValidPassword = await bcryptjs_1.default.compare(input.password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1d' });
            return token;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('An unexpected error occurred');
        }
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_input_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map