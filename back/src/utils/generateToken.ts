import jwt from 'jsonwebtoken';

const jwt_sec_acc = process.env.JWT_SECRET as string;
const jwt_sec_ref = process.env.JWT_SECRET_REF as string;

export const generateAccToken = (id: number, name: string | null) => {
  return jwt.sign(
    {
      id: id,
      name: name,
    },
    jwt_sec_acc,
    { expiresIn: '1h' }
  );
};

export const generateRefToken = (id: number, name: string | null) => {
  return jwt.sign(
    {
      id: id,
      name: name,
    },
    jwt_sec_ref,
    { expiresIn: '7d' }
  );
};

export const decodeToken = (token: string, type: 'refresh' | 'access') => {
  if (token) {
    if (type === 'refresh') {
      return jwt.verify(token, jwt_sec_ref);
    } else {
      return jwt.verify(token, jwt_sec_acc);
    }
  } else {
    return 'No token provided';
  }
};
