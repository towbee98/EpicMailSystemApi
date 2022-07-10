"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["Messaging"],
        security: {
            BearerToken: []
        },
        description: "This is the welcome page for an authorized user",
        operationId: "messageInbox",
        parameters: [],
        responses: {
            200: {
                description: "Welcome page",
            },
            500: {
                description: "Server error"
            },
            400: {
                description: "Bad Request"
            }
        }
    }
};
