import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongodb/connect.js";
import postRoutes from './Routes/postRoutes.js'
import neoRoutes from './Routes/neoRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/neo', neoRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({message : 'Hello from neo'});
    // res.send('Hello from Neo!')
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8000, () => console.log('Server has started on port http://localhost:8000'));

    } catch (error) {
        console.log(error);
    }

}

startServer();