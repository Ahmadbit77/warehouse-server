import pool from "../../config/db.js"

export const postSuppliersBySubName = async(supplierSubName) => {
    const result = await pool.query(`select * from suppliers where ($1::text is null OR name ILIKE $1)`,
        [supplierSubName ? `%${supplierSubName}%` : null]);
    return result.rows ; 
}