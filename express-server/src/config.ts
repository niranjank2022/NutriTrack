import "dotenv/config";

export default {
  PORT: Number(process.env.PORT),
  MONGODB_URI: process.env.MONGODB_URI,
};
