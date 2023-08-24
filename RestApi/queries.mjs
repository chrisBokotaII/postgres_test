import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { Pool } = pg;
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432,
});
class users {
  static getUsers(req, res) {
    pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }
  static getUser(req, res) {
    const id = parseInt(req.params.id);
    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }
  static async createUser(req, res) {
    const { first_name, last_name, email, password } = req.body;
    await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2, $3, $4)",
      [first_name, last_name, email, password],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send(`User added with ID: ${results.insertId}`);
      }
    );
  }
  static async updateUser(req, res) {
    const id = parseInt(req.params.id);
    const { first_name, last_name, email, password } = req.body;
    await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
      [first_name, last_name, email, password, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`User modified with ID: ${id}`);
      }
    );
  }
  static async deleteUser(req, res) {
    const id = parseInt(req.params.id);
    await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`User deleted with ID: ${id}`);
      }
    );
  }
}

export default users;
