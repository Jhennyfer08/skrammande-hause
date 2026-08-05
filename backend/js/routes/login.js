import { generateToken } from "../auth.js";
import { executeQuery, executeQueryFile } from "../db.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email e senha obrigatórios.",
        });
    }

    try {
        let param = [email];
        const [user] = await executeQueryFile("./sql/selectUser.sql", param);

        if (user.length > 0) {
            return res.status(409).json({
                success: false,
                message: `Usuário já cadastrado.`,
            });
        }

        const hash = await bcrypt.hash(password, 10);

        param = [email, hash];
        const result = await executeQueryFile("./sql/insertUser.sql", param);
        const id = result[0].insertId;

        const token = generateToken(email);

        return res.status(201).json({
            success: true,
            message: `Usuário cadastrado.`,
            token: token,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Não foi possível realizar o cadastro."
        });
    }
});

router.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let param = [email];
    const [user] = await executeQueryFile("./sql/selectUser.sql", param);

    try {
        const encryptPass = user[0].password;
        const validPassword = await bcrypt.compare(password, encryptPass);

        if (!validPassword) {
            throw new Error(`Invalid Password`);
        }

        const token = generateToken(user[0].email);

        return res.status(200).json({
            success: true,
            message: `Login realizado com sucesso.`,
            token: token,
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Não foi possível realizar o login.`,
        });
    }
});

export default router;
