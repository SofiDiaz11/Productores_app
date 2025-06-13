import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}

export const generateToken = (userId: string): string => {
  const options: SignOptions = { 
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']
  };
  return jwt.sign({ userId }, JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required for verification');
  }
  return jwt.verify(token, JWT_SECRET) as { userId: string };
}; 