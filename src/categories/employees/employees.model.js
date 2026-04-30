import pool from "../../config/db.js";

export const postEmployeesBySubName = async(empoyeeSubName) => {
        const result = await pool.query (`
            select name ,id as employee_id from employees 
            where ($1::text is null or name ILIKE $1::text);
        `,[empoyeeSubName ? `%${empoyeeSubName}%` : null]);
        return result.rows;
}