"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    from: {
        type: String,
        ref: 'User',
        required: true,
    },
    to: {
        type: String,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    retracted: {
        type: Boolean,
        default: false,
        required: true,
    },
    status: {
        type: String,
        enum: ['draft', 'sent'],
        required: true,
    },
}, {
    timestamps: true,
});
const Message = mongoose_1.default.model('Message', messageSchema);
exports.default = Message;
