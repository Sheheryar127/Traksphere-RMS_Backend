import dotenv from "dotenv";

dotenv.config();

const config = {
  mode: process.env.MODE,
  port: process.env.SERVER_PORT || 5000,
  db: {
    // url: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    exp: process.env.JWT_EXPIRATION,
  },
  nodeMailer: {
    email: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || "",   // Uncomment if production in railway 
  }
}

export default config;