"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const auth = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new Error('Authentication token missing');
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await User_1.UserModel.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        req.context = {
            req,
            res,
            user,
            token
        };
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};
exports.auth = auth;
const isAdmin = (req, res, next) => {
    const context = req.context;
    if (!context || !context.user || context.user.role !== 'admin') {
        res.status(403).json({ message: 'Access denied. Admin role required.' });
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=auth.js.map