export default {
  patch: {
    security: [{
      BearerAuth: [],
    }],
    tags: ['Messaging'],
    summary:
      'This can only be accessed if a user is logged in .A JWT is sent along with the request.This route enables a user to retract a sent message sent by the logged in  user on the platform',
    description:
      'This is the route for retracting a sent message from the logged in user ',
    operationId: 'retractSentMessage',
    parameters: [
      {
        name: 'messageId',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
        example: '62ea7bded2e47efbc11a6256',
        description: 'id of the inbox message to fetch',
      },
    ],
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
