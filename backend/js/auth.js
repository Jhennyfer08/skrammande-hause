import jwt from "jsonwebtoken";

export function generateToken(id, email) {
    return jwt.sign(
        {
            id: id,
            email: email
        },

        process.env.JWT_SECRET,

        {
            expiresIn: process.env.JWT_EXPIRE,
            algorithm: "HS512"
        }
    );
}

export function authenticateToken(req, res, next) {
    const authReader = req.headers.authorization;

    if (!authReader) {
        return res.status(401).json({
            success: false,
            message: "Token inexistente.",
        });
    }

    const token = authReader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token inválido ou expirado."
        });
    }
}