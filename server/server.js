import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { authRouter } from './routers/auth.js';
import { todoRouter } from './routers/todos.js';
import authMiddleware from './middlewares/auth-middleware.js';

const port = process.env.PORT || 5008;

const app = express();

app.use(cors({
    origin: process.env.CLIENT_API,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/todos', authMiddleware, todoRouter);


const start = () => {
    try {
        mongoose.connect(process.env.DB_URI)
        .then(() => console.log('MongoDb connected successfuly!'))
        .catch((err) => console.log(err.message));
        app.listen(port, () => console.log(`Server started on ${port} port`));
    } catch (error) {
        console.log(error);
    };
};

start();



