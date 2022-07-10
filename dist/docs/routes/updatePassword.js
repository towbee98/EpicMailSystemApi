"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ['User'],
        description: 'Authorized user can change password via this route',
        operationId: 'changePassword',
        security: {
            bearerAuth: [],
        },
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/changePassword',
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Password Changed successfully',
            },
            500: {
                description: 'Server error',
            },
            400: {
                description: 'Bad Request',
            },
            401: {
                description: 'Authentication Error',
            },
        },
    },
};
