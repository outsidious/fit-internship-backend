import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs'

export async function HashingPassword(req: Request, res: Response, next: NextFunction) {
  if (req.body['password']) {
    req.body['password'] = await bcrypt.hash(req.body['password'], 5);   
  }
  next();
};