export default {
  post: {
    tags: ['Authentication'],
    description:
      'Get the JWT Bearer Token as API Key to access the locked routes',
    summary:
      'A user logins  via this route to get a token back as a response which is used as a key to access every secured route .The username is at least 7 characters and can only contains letter and digits at the end of it. The password can contain either alphabets or number but must end with a single special character.',
    operationId: 'login',
    paramters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Login',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Successful Login',
        token: 'string',
        headers: {
          'X-Rate-Limit': {
            type: 'integer',
            format: 'int32',
            description: 'calls per hour allowed by the user',
          },
          'X-Expires-After': {
            type: 'string',
            format: 'date-time',
            description: 'date in UTC when token expires',
          },
        },
      },
      500: {
        description: 'Server error',
      },
      400: {
        description: 'Bad Request',
      },
      404: {
        description: 'User not found',
      },
    },
  },
};
