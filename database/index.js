require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({ connectionString: connectionString });

const db = {
  getQuestions: async () => {
    const sql = `SELECT * FROM jeopardy_data WHERE show_number = 5307 AND round= 'Jeopardy!'`;

    let data = await pool.query(sql);
    return data.rows;
  },

  getScores: async () => {
    const sql = `SELECT * FROM high_scores ORDER BY score DESC`;

    let data = await pool.query(sql);
    return data.rows;
  },

  postScores: async (name, score) => {
    const newName = name.replaceAll("^\"|\"$", "");
    const sql = `INSERT INTO high_scores (name, score) VALUES ('${name}', ${score})`;

    let data = await pool.query(sql);
    return data;
  }
}

module.exports = { pool, db };