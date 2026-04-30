import pool from "../../config/db.js";

export const postUserLogIn = async(username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
}

