import { executeQueryFile } from "../db.js";
import { generateToken } from "../auth.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class Users {
    constructor(email) {
        ((this.email = email), (this.password = null));
    }

    async queryUser() {
        const param = [this.email];
        const [result] = await executeQueryFile("./sql/selectUser.sql", param);
        return result;
    }

    async createUsers(hash) {
        const param = [this.email, hash];
        const [result] = await executeQueryFile("./sql/insertUser.sql", param);
        return result.insertId;
    }
}
