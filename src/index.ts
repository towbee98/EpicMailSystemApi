import express, { Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import docs from './docs';
import ConnectToDB from './engines/database';
import indexRouter from './routes/index';
import errorHandler from './middlewares/errors';

const app = express();

app.use(express.json());

app.use('/api/v1', indexRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

app.use('/*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found',
  });
});

app.use(errorHandler);

ConnectToDB((PORT: number) => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});
