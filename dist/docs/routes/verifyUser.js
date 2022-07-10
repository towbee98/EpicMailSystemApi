"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Authentication'],
        description: 'A new user acoount becomes verified via this route. A confirmation code is sent along with the request to activate the new account',
        summary: 'A new user account is verified via this route',
        parameters: {
            name: 'confirmCode',
            in: 'path',
            required: true,
            schema: {
                type: 'string',
            },
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvYmllbW1hMjAwQGdtYWlsLmNvbSIsImlhdCI6MTY1NzQ1NTExNSwiZXhwIjoxNjU3NDY5NTE1fQ.oQEXFpiZIZWY1JPjUfNgR1qW9Y5chIDGPDKr-sP4B9k',
            description: 'confirmation code of the user',
        },
        responses: {
            200: {
                description: 'User verification successful, Please login to gain full access',
            },
            500: {
                description: 'Server error',
            },
            422: {
                description: 'Confirmation Code not found',
            },
            400: {
                description: 'User not found or invalid confirmation code',
            },
            404: {
                description: 'User not found',
            },
        },
    },
};
