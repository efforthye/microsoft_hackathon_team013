import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { logger } from './utils/logger';
import { router } from './routes';

dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

const port = 8080;

app.listen(port, async () => {
    logger.info(`The server is running on port ${port}.`);
});
