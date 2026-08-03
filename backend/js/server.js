import express from "express";
import cors from "cors";
import fs from "fs";

import upload from "./routes/upload.js"
import auth from "./routes/auth.js"

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

const uploadPath = "tmp";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

app.use(express.static(uploadPath));

app.use('/upload', upload);
app.use('/auth', auth);

app.get("/test", (req, res) => {
    return res.status(200).json({
        status: "Ok",
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
