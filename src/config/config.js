import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default {
  app: {
    MONGO: {
      URL: process.env.MONGO_URL,
    },
    JWT: {
      KEY: process.env.JWT_KEY,
    },
  },
  server: {
    PORT: process.env.PORT || 8080,
  },
};