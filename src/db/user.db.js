const pool = require('./config')
const {retrieveDishesTypes} = require('./restaurantMenu.db')



//constructor
const user = () => {
    
}

user.model = {
    //users_data table
    userID: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,

    city: null,
    street: null,
    streetNumber: null,
    apartmentNumber: null,
    flor: null,

    //users table
    email: null,
    isVerified: null
}


user.createUser = async (id, email, hash, salt, isVerified) => {
    
    //TODO: implement inserts as a transaction !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //columns: id, email, hash, salt, isVerified
    let sql = `INSERT INTO users VALUES ( ?, ?, ?, ?, ? );`
    let args = [id, email, hash, salt, isVerified]

    //columns order: userID, firstName, lastName
    let sql2 = `INSERT INTO users_data VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )`
    let args2 = [id, null, null, null, null, null, null, null, null]
    
    try{
        const [rows, fields] = await pool.promise().execute(sql, args)
        const [rows2, fields2] = await pool.promise().execute(sql2, args2)
        console.log(rows)
        if(rows.serverStatus === 2 && rows2.serverStatus === 2) return true
        return false
    }
    catch (error){
        console.log(error)
    }  
    
}

user.findEmail = async (email) => {
        
    const sql = `SELECT * FROM users WHERE email = ? ;`
    const args = [email]

    try {
        const [rows, fields] = await pool.promise().execute(sql, args)

        if(rows.length === 0)
            //passed email doesn't exist
            return false
        else
            //passed email exist
            return true
    }
    catch (error) {
        
    }

        

}

user.retrieveUserCredentials = async (email) => {
   
    const sql = `SELECT * FROM users WHERE email = ? `
    const args = [email]

    try {
        
        const [rows, fields] = await pool.promise().execute(sql, args)
        
        if(rows.length === 0){
            //e-mail is invalid
            return null
        }
        else{
            //e-mail is correct
            return {
                id: rows[0].id,
                hash: rows[0].password,
                isVerified: rows[0].isVerified
            }
        }
    }
    catch (error) {
        
    }

}





//user contact/delivery information methods
//TODO:

user.retrieveUserData = async (userID) => {

    const sql = `
        SELECT users_data.*, users.email, users.isVerified FROM users_data
        INNER JOIN users ON users_data.userID = users.id
        WHERE users_data.userID = ?
    `
    const args = [userID]

    const [rows, fields] = await pool.promise().execute(sql, args)

    if(rows.length) return rows[0]
    else return user.model 
}

user.updateUserData = async (userID, data) => {

    const sql = `
        UPDATE users_data SET firstName = ?, lastName = ?, phoneNumber = ?, city = ?, street = ?,
        streetNumber = ?, apartmentNumber = ?, floor = ?
        WHERE userID = ?;`

    const args = [
        data.firstName, data.lastName, data.phoneNumber, data.city, data.street,
        data.streetNumber, data.apartmentNumber, data.floor, userID
    ]

    try{
        const result = await pool.promise().execute(sql, args)

        if(result[0].changedRows) return true
        else return false  
    }
    catch (error){
        console.log(error)
    }
}

user.updateUserEmail = async (userID, email) => {

    const sql = `UPDATE users SET email = ? WHERE id = ?`
    const args = [email, userID]

    try{

        const result = await pool.promise().execute(sql, args)
    
        //result.changedRows[0]
        if(result.length) return true
        else return false  
    }
    catch (error){
        console.log(error)
    }
}

user.updateUserPassword = async (userID, hash, salt) => {

    const sql = `UPDATE users SET password = ?, salt = ? WHERE id = ?`
    const args = [hash, salt, userID]

    try{

        const result = await pool.promise().execute(sql, args)

        //result.changedRows[0]
        if(result.length) return true
        else return false  
    }
    catch (error){
        console.log(error)
    }
}








//user favDishes methods
//TODO:

user.retrieveUserFavDishes = async (userID) => {
    //TODO  chyba do usuniecia, bo robi to juz user.service
    try{

        const dishesTypes = await retrieveDishesTypes()
        const userFavDishesList = await user.retrieveUserFavDishesList(userID)

        if(!dishesTypes || !userFavDishesList)
            return null
        

        //group fav dishes by dishesTypes
        //userFavDishes = userFavDishesGroupedObject
        const userFavDishes = {}
        for(let dishType of dishesTypes){

            userFavDishes[dishType.type] = []

            for(favDish of userFavDishesList){
                if(favDish.dishTypeID === dishType.id)
                userFavDishes[dishType.type].push(favDish)

            }
        }

        
        return userFavDishes

    }
    catch (error){
        console.log(error)
    }
}

user.retrieveUserFavDishesList = async (userID) => {

    try{

        const sql = `
            SELECT dishes.*, dishes.id as 'dishID', dishes_types.type as 'dishType', dishes_types.typeName as 'dishTypeName' , dishes_subtypes.subtypeName as 'dishSubtypeName' FROM users_fav_dishes
            INNER JOIN dishes ON users_fav_dishes.dishID = dishes.id
            INNER JOIN dishes_types ON dishes.dishTypeID = dishes_types.id
            INNER JOIN dishes_subtypes ON dishes.dishSubtypeID = dishes_subtypes.id
            WHERE userID = ? ;
        `
        const args = [userID]

        const [rows, fields] = await pool.promise().execute(sql, args)
        
        if(rows.length === 0)
            return []
        else
            return rows

    }
    catch (error){
        console.log(error)
    }
}


user.addFavDish = async (userID, dishID) => {

    const sql = `INSERT INTO users_fav_dishes VALUES (?, ?);`
    const args = [userID, dishID]

    const [rows, fields] = await pool.promise().execute(sql, args)

    if(rows.warningStatus === 0) return true
    return false
}

user.removeFavDish = async (userID, dishID) => {

    const sql = `DELETE FROM  users_fav_dishes WHERE userID = ? and dishID = ?;`
    const args = [userID, dishID]

    const [rows, fields] = await pool.promise().execute(sql, args)

    if(rows.warningStatus === 0) return true
    return false

}



module.exports = user;