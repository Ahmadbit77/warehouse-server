import pool from '../../config/db.js'

export const getAllParts = async () => {
    const result = await pool.query(`select 
    p.code as part_code , p.name as part_name , p.reserved as part_reserved , p.quantity as part_quantity ,p.minimum_stock,p.image_url,
    m.name as machine_name ,
    s.code as shelf_code 
    from parts p
    left join 
    machines m
    on p.machine_id = m.id 
    left join shelves s 
    on p.shelf_id = s.id 
    order by p.code;`);
    return result.rows;
}

export const getPartByCode = async (partCode) => {
    const result = await pool.query(`select 
        p.code as part_code, p.name as part_name , p.quantity ,p.description , p.minimum_stock ,
        m.name as machine_name , 
        s.code as shelf_code 
        from parts p 
        left join
        machines m 
        on p.machine_id = m.id 
        left join 
        shelves s 
        on p.shelf_id = s.id 
        where p.code = $1;
        `, [partCode])
    return result.rows[0];
}
export const postPart = async (partCode, partName, description, machineId, shelfCode, minimumStock, categoryId) => {
    const result = await pool.query(`insert into parts 
    (code , name, description ,  machine_id , shelf_id, minimum_stock, category_id) 
    values (
        $1,
        $2,
        $3,
        $4,
        (select id from shelves where code=$5),
        $6,
        $7)
    returning *`, [partCode, partName, description, machineId, shelfCode, minimumStock, categoryId]);
    return result.rows[0];
}
export const postPartsBySubNameAndCategory = async (subName, categoryId) => {
    const result = await pool.query(`select 
            p.code as part_code, p.name as part_name , p.quantity ,p.minimum_stock,p.id as part_id ,
            s.code as shelf_code 
            from parts p 
            left join
            shelves s
            on p.shelf_id = s.id
            WHERE ($1::text IS NULL OR p.name ILIKE $1::text) 
            AND ($2::int IS NULL OR p.category_id = $2::int)
            ORDER BY p.code;
        `,
        [subName ? `%${subName}%` : null, categoryId || null]
    );
    return result.rows;
}
export const getPartsCategories = async () => {
    const result = await pool.query('select * from parts_categories order by id;');
    return result.rows;
}
export const getRequiredParts = async () => {
    const result = await pool.query(
        `select p.code as part_code,
        p.name as part_name,
        CEIL(1.5 * p.minimum_stock - p.quantity ) as required_quantity, 
        c.arabic_name as part_category
        from parts p
        left join
        parts_categories c
        on c.id = p.category_id
        where 
        p.quantity < p.minimum_stock 
        order by code`
    );
    return result.rows;
}