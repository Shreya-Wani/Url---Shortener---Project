import { usersTable } from "../models/user.model.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { signupPostRequestBodySchema } from "../validation/request.validation.js";
import { hashPassword } from "../utils/hash.js";

//signup 
const signUp = async (req, res) => {
    try {
        const result = signupPostRequestBodySchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: result.error.format(),
            });
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


    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { signUp };