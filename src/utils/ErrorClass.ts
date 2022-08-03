interface AppErrorArgs {
  name?: string;
  status: number;
  message: string;
  code?: number;
  stack?: string;
}

class CreateError {
  status: number;
  message: string;
  constructor(message: string, statusCode: number) {
    this.message = message;
    this.status = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { CreateError, AppErrorArgs };
