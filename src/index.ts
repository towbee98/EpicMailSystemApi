import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import docs from './docs';
import ConnectToDB from './engines/database';
import indexRouter from './routes/index';

const app = express();

app.use(express.json());
// app.set('view-engine', 'pug');

app.use('/api/v1/', indexRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

app.use('/*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found',
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  if (err.name === 'TokenExpiredError') {
    err.message = 'Token expired , Login again';
    //@ts-ignore
    err.status = 401;
  }

  //@ts-ignore
  const statusCode: number = err.status || 500;
  res.status(statusCode).json({
    status: 'fail',
    message: err.message,
  });
});

ConnectToDB((PORT: Number) => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});
