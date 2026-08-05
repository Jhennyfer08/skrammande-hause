import { authenticateToken } from "../auth.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";


const router = Router();
const uploadPath = "tmp";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const date = new Date().toISOString().replace(/\D/g, "");
        const ext = file.originalname.split(".").pop();

        cb(null, `${date}.${ext}`);
    },
});

const upload = multer({ storage });

router.get("/", (req, res) => {
    fs.readdir(uploadPath, (error, files) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Erro ao listar imagens.",
            });
        }

        const uri = `${req.protocol}://${req.get("host")}`;

        const images = files
            .filter((file) => !file.startsWith(".")) //elimina arquivos ocultos
            .sort((a, b) => b.localeCompare(a)); //ordena desc

        res.status(200).json({
            success: true,
            images: images.map((image) => `${uri}/${image}`),
        });
    });
});

router.post("/", authenticateToken, upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Arquivo não enviado.",
        });
    } else {
        const uri = `${req.protocol}://${req.get("host")}`;
        res.status(201).json({
            success: true,
            message: "Imagem enviada com sucesso.",
            file: req.file.filename,
            url: `${uri}/${req.file.filename}`,
        });
    }
});

export default router;
