export default {
  post: {
    security: [
      {
        BearerAuth: [],
      },
    ],
    tags: ['Messaging'],
    summary:
      'This can only be accessed if a user is logged in .A JWT is sent along with the request.This route enables a user to send  message to an existing user on the platform',
    description: 'This is the route for sending messages to another user ',
    operationId: 'sendMessage',
    parameters: [],
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
      201: {
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
