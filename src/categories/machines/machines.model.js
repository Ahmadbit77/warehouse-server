import pool from "../../config/db.js";

export const postMachinesBySubName = async(subName) => {
    const result = await pool.query(`select name , id from machines where ($1::text is null or name like $1::text) order by name`, [subName != null ? `%${subName}%` : null]);
    return result.rows ;
}