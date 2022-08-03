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
exports.deleteMessage = exports.retractSentMessage = exports.getAllSentMessages = exports.getSentMessage = exports.getAllDraftMessages = exports.getDraftMessage = exports.updateDraft = exports.retractMessage = exports.getAllInboxMessage = exports.getInbox = exports.createMessage = void 0;
/* eslint-disable no-useless-catch */
const message_1 = __importDefault(require("../models/message"));
const createMessage = (messagePayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_1.default.create(messagePayload);
    }
    catch (err) {
        throw err;
    }
});
exports.createMessage = createMessage;
const getInbox = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_1.default.findOne(Object.assign(Object.assign({ _id: query.id }, query), { status: 'sent', retracted: false }));
    }
    catch (error) {
        throw error;
    }
});
exports.getInbox = getInbox;
const getAllInboxMessage = (to) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_1.default
            .find({ to, status: 'sent', retracted: false })
            .sort({ createdAt: 'desc' });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllInboxMessage = getAllInboxMessage;
const retractMessage = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_1.default.findOneAndUpdate({ _id: query.id, from: query.from }, { retracted: true, status: 'draft', to: null }, {
            runValidators: true,
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.retractMessage = retractMessage;
const updateDraft = (id, status, update) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_1.default.findOneAndUpdate({ _id: id, status }, update, {
            runValidators: true,
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateDraft = updateDraft;
const getDraftMessage = (id, from) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_1.default.findOne({ _id: id, from, status: 'draft' });
    }
    catch (error) {
        throw error;
    }
});
exports.getDraftMessage = getDraftMessage;
const getAllDraftMessages = (from) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_1.default
            .find({ from, status: 'draft' })
            .sort({ createdAt: 'desc' });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllDraftMessages = getAllDraftMessages;
const getAllSentMessages = (from) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_1.default
            .find({ from, status: 'sent' })
            .sort({ createdAt: 'desc' });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllSentMessages = getAllSentMessages;
const getSentMessage = (id, from) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_1.default.findOne({ _id: id, from, status: 'sent' });
    }
    catch (error) {
        throw error;
    }
});
exports.getSentMessage = getSentMessage;
const retractSentMessage = (id, from) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_1.default.findOneAndUpdate({ _id: id, from, status: 'sent', retracted: false }, { retracted: true, to: null, status: 'draft' }, {
            runValidators: true,
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.retractSentMessage = retractSentMessage;
const deleteMessage = (id, from) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield message_1.default.findOneAndDelete({ _id: id, from, status: 'draft' });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteMessage = deleteMessage;
