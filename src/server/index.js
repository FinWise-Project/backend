import 'dotenv/config';
import express from 'express';
import routes from '../routes/index.js';
import ErrorHandler from '../middlewares/error.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/documents', express.static('src/services/documents/files/documents'))
app.use(routes);
app.use(ErrorHandler);

export default app;