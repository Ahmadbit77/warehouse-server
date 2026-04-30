import pool from "../../config/db.js" ;

export const getShelfByCode = async (code) => {
    const result = await pool.query(`select * from shelves where code = $1`,[code]);
    return result.rows[0] ;
}

export const postShelfByCode = async (code) => {
    const result = await pool.query(`insert into shelves (code) values ($1) returning *`,[code]);
    return result.rows[0];
}