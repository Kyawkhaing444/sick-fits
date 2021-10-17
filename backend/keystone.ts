import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import 'dotenv/config';

const databaseURL = process.env.DATABASE_URL;

// const sessionConfig = {
//   maxAge: 60 * 60 * 24 * 360,
//   secret: process.env.COOKIE_SECRET,
// };
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  lists: createSchema({
    User,
  }),
  ui: {
    isAccessAllowed: () => true,
  },
  // TODO, need to add sessionConfig
});
