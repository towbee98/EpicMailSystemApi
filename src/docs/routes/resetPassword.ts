export default {
  post: {
    tags: ['Authentication'],
    description:
      'A user who has forgotten his/her password can change password via this route but the requirement is a user id and resetToken sent to the email',
    parameters: [
      {
        name: 'userId',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
        example: '62c9d59e67dbd413eae8e80d',
        description: 'The Id of the user',
      },
      {
        name: 'resetToken',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
        example:
          '9d7bf31e9ad3ab84d9f165b3a0e1998826694fb89c23de1e80bc70758729b115',
        description:
          'This is the  reset token gotten from the email of the user ',
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/resetPassword',
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
        description: 'Bad Request, User not found or Token has expired.',
      },
      401: {
        description: 'Invalid token',
      },
    },
  },
};
