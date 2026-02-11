import express from 'express';
import userRouter from './routes/user.routes.js';
import { db } from './db/index.js';
import ApiError from './utils/ApiError.js';
import authMiddleware from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use('/api/v1/users', userRouter);

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

app.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You accessed protected route",
        user: req.user,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})