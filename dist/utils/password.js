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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePasswordResetToken = exports.generateResetTokenHash = exports.compareFields = exports.generatePasswordHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const generatePasswordHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 12);
});
exports.generatePasswordHash = generatePasswordHash;
const compareFields = (normalField, hashedField) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(normalField, hashedField);
});
exports.compareFields = compareFields;
const generateResetTokenHash = (resetToken) => {
    return crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
};
exports.generateResetTokenHash = generateResetTokenHash;
const generatePasswordResetToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    const hashedResetToken = yield (0, exports.generateResetTokenHash)(resetToken);
    return { resetToken, hashedResetToken };
});
exports.generatePasswordResetToken = generatePasswordResetToken;
