"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuth = ({ context }, next) => {
    const authHeader = context.req.headers['authorization'];
    if (!authHeader) {
        throw new Error('Not authenticated');
    }
    try {
        const token = authHeader.split(' ')[1];
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || 'your-secret-key');
        context.payload = payload;
    }
    catch (err) {
        throw new Error('Not authenticated');
    }
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=auth.js.map