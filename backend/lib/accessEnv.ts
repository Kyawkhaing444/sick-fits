import 'dotenv/config';

const cache: { [key: string]: string } = {};

type KeyType =
  | 'CLOUDINARY_CLOUD_NAME'
  | 'CLOUDINARY_KEY'
  | 'CLOUDINARY_SECRET'
  | 'COOKIE_SECRET'
  | 'DATABASE_URL'
  | 'STRIPE_SECRET'
  | 'MAIL_HOST'
  | 'MAIL_PORT'
  | 'MAIL_USER'
  | 'MAIL_PASS'
  | 'FRONTEND_URL';

interface IParaType {
  key: KeyType;
  defaultValue?: string;
}

export const accessEnv = ({ key, defaultValue }: IParaType): string => {
  if (!(key in process.env) || typeof process.env[key] === 'undefined') {
    if (defaultValue) return defaultValue;
    throw new Error(`${key} not found in process.env!`);
  }

  if (!(key in cache)) {
    cache[key] = process.env[key];
  }

  return cache[key];
};
