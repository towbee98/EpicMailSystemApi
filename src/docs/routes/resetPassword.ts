export default {
  post: {
    tags: ['Authentication'],
    description:
      'A user who has forgotten his/her password can change password via this route but the requirement is a user id and resetToken sent to the email',
    parameters: {
      name: 'confirmCode',
      in: 'path',
      required: true,
    },
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
        description: ['Bad Request', 'User not found or Token has expired.'],
      },
      401: {
        description: 'Invalid token',
      },
    },
  },
};
