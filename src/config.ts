const config = {
  db: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    database: process.env.DB_DATABASE || "sequelize_api",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "secret",
    dialect: process.env.DB_DIALECT || "mysql",
  },
};

export default config;
