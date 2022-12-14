import express from "express"
import { Request, Response } from 'express';
import { User } from "../models/user.model";
import { createAccessToken } from "../services/authentication.service";

export const authenticationRouter = express.Router()

authenticationRouter.put('/authenticate', async (req: Request, res: Response) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email: email }).exec();

    if (user?.comparePassword(password)) {
        res.status(200).json({ token: createAccessToken(user.email, user.fullName), user});
    } else {
        res.status(501).json("Usuário não encontrado ou senha incorreta, tente novamente");
    }
})