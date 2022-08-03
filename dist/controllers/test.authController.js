"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const supertest_1 = __importDefault(require("supertest"));
// Asertion Style BDD
const expect = chai_1.default.expect;
const assert = chai_1.default.assert;
let details, passLength;
const conn = (0, supertest_1.default)('http://localhost:3600/');
describe('Authentication', () => {
    // Tests the login routes
    describe('POST /api/v1/auth/login', function () {
        this.beforeEach(function () {
            details = {
                username: 'towbee98',
                password: 'towbee98?',
            };
        });
        it('this checks the type of data supplied by the user for authentication', function (done) {
            expect(details.username).to.be.a('String');
            expect(details.password).to.be.a('String');
            expect(details).to.have.property('username');
            expect(details).to.have.property('password');
            done();
        });
        it('this should authenticate a user and allow access to resource', function (done) {
            conn
                .post('api/v1/auth/login')
                .send(details)
                .expect(200)
                .end(function (err, res) {
                if (err)
                    return done(err);
                return done();
            });
        });
    });
    // Tests the signup route
    describe('POST /api/v1/auth/signup', function () {
        this.beforeEach(function () {
            details = {
                name: 'Oladele Tobiloba',
                username: 'adeola231',
                password: 'towbee98?',
                email: 'tobiloba23@gmail.com',
                passwordConfirm: 'towbee98?',
            };
            passLength = details.password.length;
        });
        it('this checks the type of data supplied by a new user for registration', function (done) {
            expect(details.name).to.be.a('String');
            expect(details.email).to.be.a('String');
            expect(details.username).to.be.a('String');
            assert.exists(details.username, 'username is neither null nor undefined');
            assert.exists(details.email, 'email is neither null nor undefined');
            assert.exists(details.password, 'password is neither null nor undefined');
            assert.equal(details.passwordConfirm, details.password);
            assert.isAtLeast(passLength, 8, 'Length of password must be greater or equal to 8');
            assert.deepEqual(details.password, details.passwordConfirm, 'password is equal to passwordconfirm');
            done();
        });
        it('this tests the signup functionality of the appication', function (done) {
            conn
                .post('api/v1/auth/signup')
                .send(details)
                .expect(201)
                .end(function (err, res) {
                if (err)
                    return done(err);
                return done();
            });
        });
    });
});
