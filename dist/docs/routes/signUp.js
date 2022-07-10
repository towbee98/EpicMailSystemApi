"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ['Authentication'],
        description: 'New user can create an account via this route',
        operationId: 'registerUser',
        paramters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/User',
                    },
                },
            },
        },
        responses: {
            201: {
                description: 'User registered successfully',
            },
            500: {
                description: 'Server error',
            },
            400: {
                description: 'Bad Request',
            },
        },
    },
};
