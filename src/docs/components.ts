export default {
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      // ChangePassword Model
      changePassword: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
            description: 'Password of the authorized user',
            example: 'towbee98?',
          },
          newPassword: {
            type: 'string',
            description: 'New password user wants to change to ',
            example: 'adeola12?',
          },
        },
      },
      // ResetPassword Model
      resetPassword: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
            description: 'new Password of the  user.',
            example: 'towbee98?',
          },
        },
      },
      // Login Model
      Login: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            description:
              'username of an existing user ,The username must contain only alphabet and end with some digits',
            example: 'Towbee98',
          },
          password: {
            type: 'string',
            dewscription: 'password of an exsiting user',
            example: 'towbee98?'
          },
        },
      },
      // SignUp Model
      User: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of user',
            example: 'Oladele Tobiloba',
          },
          username: {
            type: 'string',
            description:
              'A unique username that contains only alphabets and digits at the end.It must have at least 7 characters',
            example: 'Towbee98',
          },
          password: {
            type: 'string',
            description:
              'The password must conatain only alphabets and numbers at the end with a single special character',
            example: 'towbee98?',
          },
          email: {
            type: 'string',
            description: 'A unique email that belongs to the user ',
            example: 'tobiemma200@gmail.com',
          },
          passwordConfirm: {
            type: 'string',
            description: 'Must contains the same value as the password',
            example: 'towbee98?',
          },
        },
      },
      // ForgetPassword Payload
      ForgetPassword: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'The users account email',
            example: 'abc@example.com',
          },
        },
      },
      // Message Payload
      sendMessage: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'The title of the message ',
            example: 'Application for O.T Job Vacancy',
          },
          content: {
            type: 'string',
            description: 'The content of the message',
            example:
              'I am applying to the job vacancy of your company posted on twitter. I am a qualified candidate and i see myself as the new employee of your country',
          },
          to: {
            type: 'string',
            description:
              'This is the username of the recipient.The recipient must be an existing user of the platform',
            example: 'oladtobi97',
          },
        },
        required: ['to'],
      },
      Error: {
        type: 'object', // data type
        properties: {
          message: {
            type: 'string', // data type
            description: 'Error message', // desc
            example: 'Not found', // example of an error message
          },
          // eslint-disable-next-line camelcase
          internal_code: {
            type: 'string', // data type
            description: 'Error internal code', // desc
            example: 'Invalid parameters',
          },
        },
      },
    },
  },
};
