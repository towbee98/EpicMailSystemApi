export default {
  get: {
    security: {
      BearerAuth: [],
    },
    tags: ['Messaging'],
    summary:
      'This can only be accessed if a user is logged in .A JWT is sent along with the request.This route enables a user to fetch a draft message',
    description: 'This is the route for fetching a draft message ',
    operationId: 'draftaMessage',
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
  post: {
    security: {
      BearerAuth: [],
    },
    tags: ['Messaging'],
    summary:
      'This can only be accessed if a user is logged in .A JWT is sent along with the request.This route enables a user to send a draft message to the recipient',
    description: 'This is the route for sending a draft message ',
    operationId: 'sendDraftMessage',
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
  patch: {
    security: {
      BearerAuth: [],
    },
    tags: ['Messaging'],
    summary:
      'This can only be accessed if a user is logged in .A JWT is sent along with the request.This route enables a user to edit a draft message without sending',
    description: 'This is the route for editing a draft message ',
    operationId: 'editDraftMessage',
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
  delete: {
    security: {
      BearerAuth: [],
    },
    tags: ['Messaging'],
    summary:
      'This can only be accessed if a user is logged in .A JWT is sent along with the request.This route enables a user to delete a draft message',
    description: 'This is the route for delete a draft message ',
    operationId: 'deleteDraftMessage',
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
