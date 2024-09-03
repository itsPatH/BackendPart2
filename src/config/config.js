import { config as dotenvConfig } from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
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
    PORT: process.env.PORT || 8080, // Valor por defecto si PORT no está definido
  },
};
