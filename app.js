import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';
import usersRouter from './routes/api/user.js';
import waterRouter from './routes/api/water.js';
import swaggerDocument from './swagger.json' assert { type: 'json' };

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/users', usersRouter);
app.use('/api/water', waterRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Service not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
