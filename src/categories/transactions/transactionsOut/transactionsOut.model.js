import pool from '../../../config/db.js';

export const getAllTransactionsOut = async()=> {
    const result = await pool.query(`
        select
        t.id as transactions_id, t.quantity as transactions_quantity, t.transaction_date, t.notes ,
        e.name as employees_name,
        s.name as section_name,
        p.name as part_name , p.code as part_code 
        from transactions_out as t 
        left join 
        employees as e 
        on e.id = t.employee_id 
        left join 
        sections as s
        on s.id=t.section_id
        left join parts as p
        on p.id = t.part_id 
        order by t.transaction_date desc;
`);
    return result.rows;
}
export const postTransactionOut = async(partId, quantity, employeeId, sectionId,notes) => {
    const result = await pool.query(`
            INSERT INTO transactions_out 
            (part_id , quantity , employee_id , section_id , notes)
            values
            ($1, $2 ,$3 ,$4, $5)
            RETURNING *;`,[partId, quantity, employeeId, sectionId,notes]);
        return result.rows[0];
}

export const postPartsBySubNameForTransactionsOut = async(subName)=> {
    const result = await pool.query(`
        select
        t.id as transactions_id, t.quantity as transactions_quantity, t.transaction_date, t.notes ,
        e.name as employees_name,
        s.name as section_name,
        p.name as part_name 
        from transactions_out as t 
        left join 
        employees as e 
        on e.id = t.employee_id 
        left join 
        sections as s
        on s.id=t.section_id
        left join parts as p
        on p.id = t.part_id 
        where p.name like $1 
        order by t.transaction_date desc ;
    `,[`%${subName}%`]);
    return result.rows;
}
export const postTransactionsOutForSearch = async(partSubName, receiverSubName, sectionsSubName, startDate, endDate) => {
    const result = await pool.query(`
        select
            t.id as transactions_id, t.quantity as transactions_quantity, t.transaction_date, t.notes,
            e.name as employees_name, e.id as employee_id,
            s.arabic_name as section_name,
            p.name as part_name, p.code as part_code, p.id as part_id
        from transactions_out as t
        left join employees as e on e.id = t.employee_id
        left join sections as s on s.id = t.section_id
        left join parts as p on p.id = t.part_id
        WHERE
            ($1::text IS NULL OR p.name ILIKE $1::text)
            AND ($2::text IS NULL OR e.name ILIKE $2::text)
            AND ($3::text IS NULL OR s.name ILIKE $3::text)
            AND (
                ($4::date IS NULL AND $5::date IS NULL)  -- No date filters
                OR ($4::date IS NOT NULL AND $5::date IS NULL AND t.transaction_date >= $4::date)  -- Only startDate
                OR ($4::date IS NULL AND $5::date IS NOT NULL AND t.transaction_date <= $5::date)  -- Only endDate
                 OR (
                    $4::date IS NOT NULL 
                    AND $5::date IS NOT NULL 
                    AND t.transaction_date::date >= $4::date 
                    AND t.transaction_date::date <= $5::date  -- Both startDate and endDate, using date only (no time)
                )
            )
        order by t.transaction_date desc;
    `,
    [
        partSubName ? `%${partSubName}%` : null,
        receiverSubName ? `%${receiverSubName}%` : null,
        sectionsSubName ? `%${sectionsSubName}%` : null,
        startDate ? startDate : null,
        endDate ? endDate : null
    ]);

    return result.rows;
};