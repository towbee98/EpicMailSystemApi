"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Messaging'],
        security: {
            BearerAuth: [],
            // JWT:[]
        },
        summary: 'This can only be accessed if a user is logged in .A JWT is sent along with the request.It returns a welcome message for an authorized user and a request to login message for an unauthorized user',
        description: 'This is the welcome page for an authorized user',
        operationId: 'messageInbox',
        parameters: [],
        responses: {
            200: {
                description: 'Success',
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
