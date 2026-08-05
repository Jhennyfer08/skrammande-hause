import { readFile } from "fs/promises";
import mysql2 from "mysql2/promise";

async function connect() {
    const connection = await mysql2.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    return connection;
}

export async function executeQuery(query, params = []) {
    const connection = await connect();

    try {
        const result = await connection.execute(query, params);
        return result;
    } catch (error) {
        console.error(`Identified error on executeQuery: ${error}`);
    } finally{
        await connection.end();
    }
}

export async function executeQueryFile(filePath, params = []) {
    const query = await readFile(filePath, "utf-8");
    return await executeQuery(query, params);
}