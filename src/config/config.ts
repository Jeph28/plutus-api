export default {
  databaseURI: process.env.MONGODB_URI,
  databaseName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
};
