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
exports.findAllUsers = exports.ChangePassword = exports.FindAUser = exports.FindUser = exports.LoginUser = exports.CreateUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const password_1 = require("../utils/password");
const CreateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-useless-catch
    try {
        data.password = yield (0, password_1.generatePasswordHash)(data.password);
        const newUser = yield user_1.default.create(data);
        return newUser;
    }
    catch (error) {
        throw error;
    }
});
exports.CreateUser = CreateUser;
const LoginUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        username: new RegExp(username, 'i'),
    }).select('+password');
    return user;
});
exports.LoginUser = LoginUser;
// eslint-disable-next-line @typescript-eslint/ban-types
const FindUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne(query);
    return user;
});
exports.FindUser = FindUser;
const FindAUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(id);
    return user;
});
exports.FindAUser = FindAUser;
// export const FindAndUpdateUser = async (confirmCode: string) => {
//   const user = await User.findOneAndUpdate(
//     { confirmCode },
//     { status: 'Active' },
//     { runValidators: true, new: true },
//   );
//   return user;
// };
const ChangePassword = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    password = yield (0, password_1.generatePasswordHash)(password);
    user.password = password;
    user.passwordChangedAt = new Date(Date.now() - 1000);
    yield user.save();
    return user.toJSON();
});
exports.ChangePassword = ChangePassword;
const findAllUsers = (filter = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.find(filter);
});
exports.findAllUsers = findAllUsers;
