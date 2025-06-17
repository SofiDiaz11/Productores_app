"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
}
const generateToken = (userId) => {
    const options = {
        expiresIn: JWT_EXPIRES_IN
    };
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, options);
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is required for verification');
    }
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyToken = verifyToken;
