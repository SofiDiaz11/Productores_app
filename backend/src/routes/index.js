"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
// Ruta principal
router.get('/', (req, res) => {
    res.json({
        message: '🚀 Productores API v1.0',
        status: 'online',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
    });
});
// Health check con información de BD
router.get('/api/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.testConnection)();
        res.json({
            success: true,
            message: 'Productores API funcionando! 🚀',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            database: 'connected',
            version: '1.0.0',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error de conexión a base de datos',
            timestamp: new Date().toISOString(),
        });
    }
}));
exports.default = router;
