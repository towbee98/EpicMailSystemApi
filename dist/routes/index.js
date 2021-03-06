"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const protect_1 = require("../middlewares/protect");
const auth_1 = __importDefault(require("./auth"));
const users_1 = __importDefault(require("./users"));
const messages_1 = __importDefault(require("./messages"));
router.use('/auth', auth_1.default);
router.use('/messages', [protect_1.AuthCheck], messages_1.default);
router.use('/users', [protect_1.AuthCheck], users_1.default);
exports.default = router;
