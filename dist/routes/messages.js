"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageRouter = express_1.default.Router();
const message_controller_1 = require("../controllers/message.controller");
const protect_1 = require("../middlewares/protect");
messageRouter.use(protect_1.AuthCheck);
messageRouter.route('/inbox').get(message_controller_1.getAllInbox);
messageRouter.route('/inbox/:messageId').get(message_controller_1.getInboxMessage);
messageRouter.route('/drafts').get(message_controller_1.getAllDrafts).post(message_controller_1.addToDrafts);
messageRouter
    .route('/drafts/:messageId')
    .get(message_controller_1.getDraft)
    .post(message_controller_1.sendDraftMessage)
    .patch(message_controller_1.editDraftMessage)
    .delete(message_controller_1.deleteDraftMessage);
messageRouter.route('/sent').get(message_controller_1.fetchSentMessages);
messageRouter.route('/sent/:messageId').get(message_controller_1.fetchSentMessage);
messageRouter.route('/sent/:messageId/retract').patch(message_controller_1.retractMessage);
messageRouter.route('/').post(message_controller_1.sendMessage);
exports.default = messageRouter;
