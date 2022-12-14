
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import bcrypt from "bcrypt";

const { PRIVATE_KEY } = process.env;

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  // make authenticate path public
  if (req.path === '/api/authenticate') {
      return next();
  }

  const accessToken = req.headers.authorization?.replace(
      /^Bearer\s/,
      ""
    );

      
  if (!accessToken) return res.status(401).json("Rota inválida para acesso");

  const { decoded } = decode(accessToken);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;
    return next();
  }

    next();
}

export function createAccessToken(email: string, fullName: string) {
  // Build and return the new access token
  const accessToken = jwt.sign({ email, fullName }, PRIVATE_KEY as jwt.Secret);

  return accessToken;
}

function decode(token: string) {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY as jwt.Secret);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      decoded: null,
    };
  }
}