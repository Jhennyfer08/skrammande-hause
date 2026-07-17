import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import { error } from "console";

const PORT = 3000;
const app = express();
app.use(cors());

const uploadPath = "tmp";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

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

app.use(express.static(uploadPath));

app.get("/test", (req, res) => {
    return res.status(200).json({
        status: "Ok",
    });
});

app.post("/upload", upload.single("image"), (req, res) => {
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

app.get("/upload", (req, res) => {
    fs.readdir(uploadPath, (error, files) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Erro ao listar imagens.",
            });
        }

        const images = files
            .filter((file) => !file.startsWith(".")) //elimina arquivos ocultos
            .sort((a, b) => b.localeCompare(a)); //ordena desc

        const uri = `${req.protocol}://${req.get("host")}`;

        res.status(200).json({
            success: true,
            images: images.map((image) => `${uri}/${image}`),
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
