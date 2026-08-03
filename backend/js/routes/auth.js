import { executeQuery } from "../db.js";
import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email e senha obrigatórios."
        });
    }

    const user = await executeQuery(
        `
            SELECT
                id 
            FROM 
                users 
            WHERE 
                email = ?
        `,
        [email]
    )

    if (user.length > 0) {
        return res.status(409).json({
            success: false,
            message: `Usuário já cadastrado.`,
        });
    }

    const hash = await bcrypt.hash(password, 10);

    await executeQuery(
        `
        INSERT INTO users(
            email, 
            password
        ) VALUES (
            ?,
            ?
        )`,
        [email, hash],
    );

    return res.status(201).json({
        success: true,
        message: `Usuário cadastrado.`,
    });
});

export default router;
