import { CreateError } from './ErrorClass';
type createUser = {
  name: string;
  username: string;
  password: string;
  email: string;
};

type loginUser = {
  username: string;
  password: string;
};

export const validateCreateUserSchema = ({
  name,
  username,
  password,
  email,
}: createUser) => {
  const Errors: string[] = [];
  if (!name || !username || !password || !email)
    Errors.push(
      'A field is missing, Required fields are name,username,password and email',
    );
  if (name.length > 20 || name.length < 2)
    Errors.push(
      'name must be at least 2 characters and at most 20 characters.',
    );
  if (!/[a-zA-Z]+/g.test(name)) Errors.push('Name can only contain aplhabets.');
  if (!/^[a-zA-Z]+\d+$/g.test(username))
    Errors.push('username can only contain alphabets and digit at the end.');
  if (username.length < 7 || username.length > 15)
    Errors.push(
      'username must be at least 7 characters and at most 15 characters.',
    );
  if (password.length < 7)
    Errors.push('password is too short,It must have at least 7 characters.');
  if (password.length > 15)
    Errors.push('Password too long , Password cannot exceed 15 characters.');
  if (!/^[a-zA-Z]+\d+[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/g.test(password))
    Errors.push(
      'password must contain at least a digit  and a single special character at the end of it.',
    );
  if (typeof password != 'string') Errors.push('${password} must be a string.');
  if (!/^[a-zA-Z]+\d+@[a-zA-Z]+\.[a-zA-Z]+$/g.test(email))
    Errors.push('Please enter a valid email.');
  return Errors;
};

export const validateLoginUser = ({ username, password }: loginUser) => {
  if (!/^[a-zA-Z]+\d+$/g.test(username))
    throw new CreateError(
      '${username} can only contain alphabets and digit at the end',
      400,
    );
  if (username.length < 7)
    throw new CreateError('${username} must be at least 7 characters', 400);
  if (username.length > 15)
    throw new CreateError(
      '${username}cannot be longer than 15 characters',
      400,
    );

  if (password.length < 7)
    throw new CreateError(
      'password is too short.It must have at least 7 characters',
      400,
    );
  if (password.length > 15)
    throw new CreateError(
      'Password too long , Password cannot exceed 15 characters',
      400,
    );
  if (!/^[a-zA-Z]+\d+[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/g.test(password))
    throw new CreateError(
      'password must contain at least a digit  and a single special character at the end of it',
      400,
    );
  if (typeof password != 'string')
    throw new CreateError('${password} must be a string', 400);
  return { username, password };
};

export const validatePassword = (password: string) => {
  if (password.length < 7)
    throw new CreateError(
      'New password is too short.It must have at least 7 characters',
      400,
    );
  if (password.length > 15)
    throw new CreateError(
      'New Password too long , Password cannot exceed 15 characters',
      400,
    );
  if (!/^[a-zA-Z]+\d+[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/g.test(password))
    throw new CreateError(
      'New password must contain at least a digit  and a single special character at the end of it',
      400,
    );
  if (typeof password != 'string')
    throw new CreateError('${password} must be a string', 400);
  return password;
};

export const validateEmail = (payload: { email: string }) => {
  const Errors: string[] = [];
  if (!/^[a-zA-Z]+\d+@[a-zA-Z]+\.[a-zA-Z]+$/g.test(payload.email))
    Errors.push('Please enter a valid email.');
  return Errors;
};

export const validateResetPwPayload = (payload: {
  resetToken: string;
  userId: string;
  password: string;
}) => {
  const Errors: string[] = [];
  if (
    payload.userId.trim().length <= 10 &&
    payload.resetToken.trim().length <= 10
  )
    Errors.push('Invalid Token or User Id.');
  if (payload.password.length < 7)
    Errors.push('password is too short,It must have at least 7 characters.');
  if (payload.password.length > 15)
    Errors.push('Password too long , Password cannot exceed 15 characters.');
  if (
    !/^[a-zA-Z]+\d+[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/g.test(
      payload.password,
    )
  )
    Errors.push(
      'password must contain at least a digit  and a single special character at the end of it.',
    );
  if (typeof payload.password != 'string')
    Errors.push('${password} must be a string.');
  return Errors;
};
