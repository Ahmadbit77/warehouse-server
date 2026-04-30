import pool from '../../config/db.js'

export const postSectionsBySubName = async(sectionsSubName) => {
    const result = await pool.query(
        `select * from sections
        where ($1::text is null OR name like $1::text) 
        order by name`
    ,[sectionsSubName ? `%${sectionsSubName}%` : null]);
    return result.rows;
}