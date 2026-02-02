import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST, //46.202.167.245
  port: Number(process.env.DB_PORT), // 3306
  user: process.env.DB_USER, // mysql
  password: process.env.DB_PASSWORD, // RAUEEgq8v5KeI8Ek98mVRqwFZu1WIyaUsQgLb30KFpDOIJxxw9Y425zso5girYX5
  database: process.env.DB_NAME, // default

  waitForConnections: true,
  connectionLimit: 5,
  connectTimeout: 10000, // prevents 504 timeout
});