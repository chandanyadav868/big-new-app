import mysql from "mysql2/promise";

declare global {
  // prevent multiple pools in dev
  var mysqlPool: mysql.Pool | undefined;
}

export const db =
  global.mysqlPool ??
  mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    connectTimeout: 10000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

if (process.env.NODE_ENV !== "production") {
  global.mysqlPool = db;
}