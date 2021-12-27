import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import { swaggerOptions } from './swaggerOptions';

// Routes
import tasksRoutes from './routes/task.routes';

// Initializations
export const app = express();

//middlewares
// comunications with other servers
app.use(cors());

// sms servers develops
app.use(morgan('dev'));

// format json to object
app.use(json());

// Data format form
app.use(express.urlencoded({ extended: false }));

//
const specs = swaggerJsDoc(swaggerOptions);

// routes
app.use('/api', tasksRoutes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
