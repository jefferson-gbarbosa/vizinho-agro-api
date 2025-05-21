import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret';
const EXPIRES_IN = '7d';

export interface TokenPayload {
  sub: number;
  nome: string;
  type: 'producer';
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as unknown;

    if (
      typeof payload === 'object' &&
      payload !== null &&
      'sub' in payload &&
      'nome' in payload &&
      'type' in payload
    ) {
      return payload as TokenPayload;
    }

    return null;
  } catch {
    return null;
  }
}
