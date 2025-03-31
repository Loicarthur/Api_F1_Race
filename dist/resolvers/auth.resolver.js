"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
const handleError = (error) => {
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error('Une erreur inattendue est survenue');
};
const register = async (_, args) => {
    try {
        const { username, email, password } = args.input;
        const existingUser = await User_1.UserModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const user = await User_1.UserModel.create({
            username,
            email,
            password: hashedPassword
        });
        const token = generateToken(user.id);
        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };
    }
    catch (error) {
        return handleError(error);
    }
};
exports.register = register;
const login = async (_, args) => {
    try {
        const { email, password } = args.input;
        const user = await User_1.UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
        const token = generateToken(user.id);
        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };
    }
    catch (error) {
        return handleError(error);
    }
};
exports.login = login;
//# sourceMappingURL=auth.resolver.js.map