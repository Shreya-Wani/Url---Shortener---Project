import { usersTable } from "../models/user.model.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { signupPostRequestBodySchema, loginPostRequestBodySchema } from "../validation/request.validation.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

//signup 
const signUp = asyncHandler(async (req, res) => {
    const result = signupPostRequestBodySchema.safeParse(req.body);

    if (!result.success) {
        throw new ApiError(400, "Invalid input data", result.error.format());
    }

    const { email, password, firstname, lastname } = result.data;

    const [existingUser] = await db
        .select({
            id: usersTable.id,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email));

    if (existingUser) {
        return res
            .status(409)
            .json({ message: "User already exists" });
    }

    const { salt, hashedPassword } = hashPassword(password);

    const [user] = await db.insert(usersTable).values({
        email,
        firstname,
        lastname,
        salt,
        password: hashedPassword,
    }).returning({ id: usersTable.id });

    return res.status(201).json({
        message: "User registered successfully",
        data: { userId: user.id }
    });
});

export { signUp };