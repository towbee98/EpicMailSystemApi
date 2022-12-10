export default {
  get: {
    security:[{
      BearerAuth: [],
    }],
    tags: ['Messaging'],
    summary:
      'This can only be accessed if a user is logged in .A JWT is sent along with the request.This route enables a user to fetch all inbox messages sent from any existing user on the platform',
    description:
      'This is the route for fetching all inbox messages from another user ',
    operationId: 'recieveMessages',
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
};
