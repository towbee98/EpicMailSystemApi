"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// 2.Schema
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be empty'],
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'username cannot be empty'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'phone number is required'],
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
        select: false,
    },
    group: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Group',
    },
    confirmCode: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    status: {
        type: String,
        enum: ['Active', 'Pending'],
        default: 'Pending',
    },
});
userSchema.methods.toJSON = function toJSON() {
    return {
        name: this.name,
        username: this.username,
        email: this.email,
        group: this.group,
        passwordChangedAt: this.passwordChangedAt,
        status: this.status,
    };
};
// 3. Create the model
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
