"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        security: {
            BearerAuth: [],
        },
        tags: ['Messaging'],
        summary: 'This can only be accessed if a user is logged in .A JWT is sent along with the request.This route enables a user to fetch all draft messages',
        description: 'This is the route for fetching all draft messages ',
        operationId: 'getAlldraftMessages',
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
    post: {
        tags: ['Messaging'],
        description: 'A user adds a new message to drafts',
        summary: 'A user sends a new message to drafts',
        operationId: 'saveToDrafts',
        paramters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/sendMessage',
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Draft Message added successfully',
            },
            500: {
                description: 'Server error',
            },
            400: {
                description: 'Bad Request',
            },
            404: {
                description: 'Route not found',
            },
        },
    },
};
