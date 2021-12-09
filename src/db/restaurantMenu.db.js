
const pool = require('./config')



const restaurantMenu = () => {

}

restaurantMenu.retrieveMenu = async () => {

}

restaurantMenu.retrieveDishes = async () => {
    try{
        
        //TODO: poprawić aliasy na froncie i tutaj
        const sql = `
            SELECT dishes.*, dishes.id as 'dishID', dishes_types.type as 'dishType', dishes_types.typeName as 'dishTypeName' , dishes_subtypes.subtypeName as 'dishSubtypeName' FROM dishes
            INNER JOIN dishes_types ON dishes.dishTypeID = dishes_types.id
            INNER JOIN dishes_subtypes ON dishes.dishSubtypeID = dishes_subtypes.id;
        `

        const [rows, fields] = await pool.promise().execute(sql)

        if(rows.length === 0)
            return null
        else
            return rows
            
    }
    catch (error){
        console.log(error)
    }
}


restaurantMenu.retrieveDishesTypes = async () => {
    
    try{
        
        const sql = `SELECT * FROM dishes_types;`

        const [rows, fields] = await pool.promise().query(sql)

        if(rows.length === 0)
            return null
        else
            return rows

    }
    catch (error){
        console.log(error)        
    }

}


module.exports = restaurantMenu;