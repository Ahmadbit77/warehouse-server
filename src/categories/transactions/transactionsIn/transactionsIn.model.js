import pool from '../../../config/db.js'
export const getAllTransactionsIn = async()=> {
    const result = await pool.query(`select 
        t.id as transaction_id, t.quantity as transaction_quantity,t.transaction_date,t.notes ,
        s.name as supplier_name,
        p.code as part_code, p.name as part_name 
        from transactions_in as t 
        left join 
        parts as p 
        on p.id=t.part_id 
        left join 
        suppliers as s 
        on s.id=t.supplier_id
        ORDER BY t.transaction_date DESC;
    `);
    return result.rows;
}
export const postTransactionIn = async(partId, quantity, supplierId, notes)=> {
    const result = await pool.query(` 
        insert into transactions_in 
        (part_id,quantity,supplier_id,notes) 
        values (
        $1,
        $2,
        $3,
        $4) 
        returning * ;`,
        [partId,quantity,supplierId,notes]);
        return result.rows[0];
}
export const postPartsBySubNameForTransactionsIn = async (subName)=> {
    const result = await pool.query (`
        select 
        t.id as transaction_id, t.quantity as transaction_quantity,t.transaction_date,t.notes ,
        s.name as supplier_name,
        p.code as part_code, p.name as part_name 
        from transactions_in as t 
        left join 
        parts as p 
        on p.id=t.part_id 
        left join 
        suppliers as s 
        on s.id=t.supplier_id
        where p.name like $1
        ORDER BY t.transaction_date DESC;
        `,[`%${subName}%`]);
    return result.rows;
}

export const postTransactionsInForSearch = async(partSubName, supplierSubName, startDate, endDate) => {
    const result = await pool.query(`
        select
            t.id as transactions_id, t.quantity as transactions_quantity, t.transaction_date, t.notes,
            p.name as part_name, p.code as part_code, p.id as part_id,
            s.name as supplier_name, s.id as supplier_id
        from transactions_in as t
        left join parts as p on p.id = t.part_id
        left join suppliers as s on s.id = t.supplier_id
        WHERE
        ($1::text IS NULL OR p.name ILIKE $1::text)
        AND ($2::text IS NULL OR s.name ILIKE $2::text)
        AND (
            ($3::date IS NULL AND $4::date IS NULL)
            OR ($3::date IS NOT NULL AND $4::date IS NULL AND t.transaction_date >= $3::date)
            OR ($3::date IS NULL AND $4::date IS NOT NULL AND t.transaction_date <= $4::date)
            OR (
                $3::date IS NOT NULL 
                AND $4::date IS NOT NULL 
                AND t.transaction_date::date >= $3::date 
                AND t.transaction_date::date <= $4::date
            )
        )
        order by t.transaction_date desc;
    `,
    [
        partSubName ? `%${partSubName}%` : null,
        supplierSubName ? `%${supplierSubName}%` : null,
        startDate ? startDate : null,
        endDate ? endDate : null
    ]);

    return result.rows;
};


