import express from "express";
import multer from "multer";
// import fs from "fs";

const PORT = 3000;
const app = express();

const uploadPath = 'app/tmp';

// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, {recursive: true});
// }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const date = new Date().toISOString().replace(/\D/g, "");
        const ext = file.originalname.split('.').pop();

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
        res.status(201).json({
            success: true,
            message: "Imagem enviada com sucesso.",
            file: req.file.filename,
            url: `http://localhost:${PORT}/${req.file.filename}`,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
