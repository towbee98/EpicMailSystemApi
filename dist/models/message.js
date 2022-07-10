"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    from: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['draft', 'sent', 'retracted'],
        required: true,
    },
});
const Message = mongoose_1.default.model('Message', messageSchema);
exports.default = Message;
