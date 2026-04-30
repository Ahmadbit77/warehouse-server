import pool from '../../config/db.js'

export const getAllBorrows = async() => {
    const result = await pool.query(`select 
        b.id as borrow_id ,
        b.borrow_type ,
        b.quantity as borrow_quantity,
        b.borrow_date,
        b.return_date,
        b.notes , 
        p.name as part_name ,
        e.name as employee_name
        from borrows as b
        left join
        parts as p 
        on p.id = b.part_id 
        left join 
        employees as e 
        on e.id = b.employee_id 
        order by b.id ;
        `);
    return result.rows ;
}
export const getAllActiveBorrows = async() => {
    const result = await pool.query(`select 
        b.id as borrow_id ,
        b.borrow_type ,
        b.quantity as borrow_quantity,
        b.borrow_date,
        b.return_date,
        b.notes , 
        p.name as part_name ,
        e.name as employee_name
        from borrows as b
        left join
        parts as p 
        on p.id = b.part_id 
        left join 
        employees as e 
        on e.id = b.employee_id 
        where b.borrow_type = 'borrowed'
        order by b.id ;
        `);
    return result.rows ;
}

export const postBorrow = async(partName, borrowType, quantity, employeeName,notes) => {
    const result = await pool.query(`
        insert into borrows
        (part_id, borrow_type, quantity, employee_id, notes)
        values 
        ((select id from parts where name=$1),$2,$3,(select id from employees where name=$4),$5)
        returning *;
    `,[partName, borrowType, quantity, employeeName,notes]);
    return result.rows[0] ;
}
export const putBorrow = () => {
    const result = pool.query(`update borrows set borrow_type = 'returned' where id = $1 returning *`,[borrowId]);
    return result.rows[0];
}
