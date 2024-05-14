import express from 'express';
import { Application } from 'express';
import dotenv from 'dotenv';
import { routes } from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Application = express();
app.use(cors());

// body-parser
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

dotenv.config();

// routes
app.use('/', routes);

// start the server
app.listen(process.env.BACK_PORT, () => {
    console.log(
        `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
    );
});
