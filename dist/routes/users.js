"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const protect_1 = require("../middlewares/protect");
userRouter.use(protect_1.AuthCheck);
userRouter.route('/updatePassword').post(userController_1.UpdatePassword);
userRouter.route('/').get(userController_1.getAllUsers);
exports.default = userRouter;
