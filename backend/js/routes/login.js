import { Users } from "../classes/users.js";
import { generateToken } from "../auth.js";
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
        const user = new Users(email);
        let result = await user.queryUser();

        if (result.length > 0) {
            return res.status(409).json({
                success: false,
                message: `Usuário já cadastrado.`,
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const id = await user.createUsers(hash);

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

    try {
        const user = new Users(email);
        const result = await user.queryUser();

        const encryptPass = result.password;
        const validPassword = await bcrypt.compare(password, encryptPass);

        if (!validPassword) {
            throw new Error(`Invalid Password`);
        }

        const token = generateToken(result.email);

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
