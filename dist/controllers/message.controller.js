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
exports.deleteDraftMessage = exports.retractMessage = exports.fetchSentMessage = exports.fetchSentMessages = exports.editDraftMessage = exports.sendDraftMessage = exports.getDraft = exports.getAllDrafts = exports.addToDrafts = exports.getInboxMessage = exports.getAllInbox = exports.sendMessage = void 0;
const message_1 = require("../repository/message");
const user_1 = require("../repository/user");
const ErrorClass_1 = require("../utils/ErrorClass");
const getAllInbox = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inboxMessages = yield (0, message_1.getAllInboxMessage)(req.user.username);
        res.status(200).json({
            status: 'success',
            inboxMessages,
            message: 'Inbox feteched successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllInbox = getAllInbox;
const sendMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield (0, user_1.FindUser)({ username: new RegExp(`\\b${req.body.to}\\b`, 'i') })))
            return next(new ErrorClass_1.CreateError('User not found', 400));
        const { to, title, content } = req.body;
        const message = {
            to,
            title,
            content,
            from: req.user.username,
            retracted: false,
            status: 'sent',
        };
        const sentMessage = yield (0, message_1.createMessage)(message);
        res.status(200).json({
            status: 'success',
            sentMessage: sentMessage,
            message: 'Message was sent successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.sendMessage = sendMessage;
const getInboxMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inboxMessage = yield (0, message_1.getInbox)({
            id: req.params.messageId,
            to: req.user.username,
        });
        res.status(200).json({
            message: 'Inbox fetched successfully',
            inboxMessage,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getInboxMessage = getInboxMessage;
const addToDrafts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to, title, content } = req.body;
        const draftMessage = yield (0, message_1.createMessage)({
            from: req.user.username,
            status: 'draft',
            retracted: false,
            to,
            title,
            content,
        });
        res.status(200).json({
            message: 'message added to draft successfully',
            draftMessage,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addToDrafts = addToDrafts;
const getAllDrafts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const draftMessages = yield (0, message_1.getAllDraftMessages)(req.user.username);
        res.status(200).json({
            message: 'Draft messages fetched successfully',
            drafts: draftMessages,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllDrafts = getAllDrafts;
const sendDraftMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield (0, user_1.FindUser)({ username: new RegExp(`\\b${req.body.to}\\b`, 'i') })))
            return next(new ErrorClass_1.CreateError('User not found', 400));
        const sentMessage = yield (0, message_1.updateDraft)(req.params.messageId, 'draft', Object.assign({ to: req.body.to, status: 'sent', retracted: false }, req.body));
        res.status(200).json({
            message: 'Draft messages sent successfully',
            sentMessage,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.sendDraftMessage = sendDraftMessage;
const getDraft = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const draftMessage = yield (0, message_1.getDraftMessage)(req.params.messageId, req.user.username);
        res.status(200).json({
            message: 'Draft message fetched successfully',
            draftMessage,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getDraft = getDraft;
const editDraftMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield (0, user_1.FindUser)({ username: new RegExp(`\\b${req.body.to}\\b`, 'i') })))
            return next(new ErrorClass_1.CreateError('User not found', 400));
        const { to, title, content } = req.body;
        const draftMessage = yield (0, message_1.updateDraft)(req.params.messageId, 'draft', {
            to,
            title,
            content,
            status: 'draft',
            retracted: false,
        });
        res.status(200).json({
            message: 'Draft message updated successfully',
            draftMessage,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.editDraftMessage = editDraftMessage;
const fetchSentMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sentMessages = yield (0, message_1.getAllSentMessages)(req.user.username);
        res.status(200).json({
            message: 'Sent messages fetched successfully',
            sentMessages,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchSentMessages = fetchSentMessages;
const fetchSentMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sentMessage = yield (0, message_1.getSentMessage)(req.params.messageId, req.user.username);
        res.status(200).json({
            message: 'Sent message fetched successfully',
            sentMessage,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchSentMessage = fetchSentMessage;
const retractMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retractedMessage = yield (0, message_1.retractSentMessage)(req.params.messageId, req.user.username);
        res.status(200).json({
            message: 'Sent message retracted successfully',
            retractedMessage,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.retractMessage = retractMessage;
const deleteDraftMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedMessage = yield (0, message_1.deleteMessage)(req.params.messageId, req.user.username);
        res.status(200).json({
            message: 'Draft message deleted successfully',
            deletedMessage,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteDraftMessage = deleteDraftMessage;
