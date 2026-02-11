import express from 'express';
import userRouter from './routes/user.routes.js';
import {db} from './db/index.js';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})