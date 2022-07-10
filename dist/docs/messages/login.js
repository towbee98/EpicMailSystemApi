"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ["Authentication"],
        description: "Get the JWT Bearer Token as API Key to access the locked routes",
        operationId: "login",
        paramters: [],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Login"
                    }
                }
            }
        },
        responses: {
            200: {
                description: "Successful Login",
                token: "string"
            },
            500: {
                description: "Server error"
            },
            400: {
                description: "Bad Request"
            },
            404: {
                description: "User not found"
            }
        }
    }
};
