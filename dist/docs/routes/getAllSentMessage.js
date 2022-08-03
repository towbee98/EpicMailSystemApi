"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        security: {
            BearerAuth: [],
        },
        tags: ['Messaging'],
        summary: 'This can only be accessed if a user is logged in .A JWT is sent along with the request.This route enables a user to fetch all  messages sent by the logged in  user on the platform',
        description: 'This is the route for fetching all sent messages from the logged in user ',
        operationId: 'fetchSentMessages',
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
