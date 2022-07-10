export default {
  post: {
    tags: ['Authentication'],
    description:
      'A user drops the registered email here via this route to get a password reset token',
    summary: 'A user get a password reset token to get',
    paramters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ForgetPassword',
          },
        },
      },
    },
    responses: {
      200: {
        description:
          'Password reset link has been sent to your email.Please check',
      },
      500: {
        description: 'Server error',
      },
      400: {
        description: 'Bad Request',
      },
      404: {
        description: 'Email not found',
      },
    },
  },
};
