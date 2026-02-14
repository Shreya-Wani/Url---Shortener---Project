import express from 'express';
import userRouter from './routes/user.routes.js';
import urlRouter from "./routes/urls.routes.js";
import { db } from './db/index.js';
import ApiError from './utils/ApiError.js';
import authMiddleware from "./middlewares/auth.middleware.js";
import { redirectToOriginalUrl } from "./controllers/url.controllers.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://your-frontend-domain.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.set("trust proxy", 1);

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use("/api/v1/urls", urlRouter);

app.get("/", (req, res) => {
    res.send("Backend is working! Ready to shorten URLs.");
});

app.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You accessed protected route",
        user: req.user,
    });
});

app.get("/:shortCode", redirectToOriginalUrl);

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})