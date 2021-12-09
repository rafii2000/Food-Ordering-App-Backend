
const uuid = require('uuid')


const userDB = require('../db/user.db')
const restaurantMenuDB = require('../db/restaurantMenu.db')
const passwordHasher = require('../utils/passwordHasher')




//service retrieve responses from DB methods and create messages for controllers to return
    


const authenticateUser = async (req_data) => {
 
    try{

        //extract data from request
        let email = req_data.email
        let password = req_data.password

        const credentials = await userDB.retrieveUserCredentials(email)

        //check are credentials correct
        if(!credentials){
            return {status: 'error', message: 'E-mail or Password are invalid.'}
        }

        if(credentials){
            
            const match = await passwordHasher.checkPassword(password, credentials.hash)

            if(!match)
                return {status: 'error', message: 'E-mail or Password are invalid.'}
        }

        //email and password are correct, retrieve userData and userFavDishes
        const userData = await userDB.retrieveUserData(credentials.id)
        const serviceResponse = await retrieveUserFavDishes(credentials.id)

                
        //check if all data has been retrieved  
        if(!userData)
            return {status: 'error', message: `Log in error. Can't fetch user data.`}
        if(serviceResponse.status === 'error')
            return {status: 'error', message: `Log in error. Can't fetch user fav dishes.`}
        

        //create response data object
        const data = {
            userData: userData,
            userFavDishes: serviceResponse.data,
        }

        return { status: 'success', message: 'Login successful', data: data }

    }
    catch (error){
        console.log(error)
    }
}


const createUser = async (req_data) => {
        
    try{

        //extract data from request
        let email = req_data.email
        let password = req_data.password
      
        //prepare data for DB_Layer
        let id = uuid.v4()
        let salt = await passwordHasher.generateSalt()
        let hash = await passwordHasher.encryptPassword(password, salt)
        let isVerified = 0

        //call methods from DB_Layer
        const isEmailFound = await userDB.findEmail(email)
    
        if(isEmailFound === true){
            return {status: 'error', message: 'E-mail is already used'}
        }

        if(isEmailFound === false){
            const result = await userDB.createUser(id, email, hash, salt, isVerified)
            
            //console.log('user.service.js createUser() result = ', result)
            if(result)
                return {status: 'success', message: 'Account created successfully'}
            else
                return {status: 'error', message: `Error while creating account.`}
        }
    
    }
    catch (error){
        console.log('User.service ERROR: ')
        console.log(error)
    }
}


const checkSession = async (jwtPayload) => {
    
    //if session cookie's token is not expired get user data without login 
    try{

        const userID = jwtPayload.userID
        
        const userData = await userDB.retrieveUserData(userID)
        const userFavDishes = await userDB.retrieveUserFavDishes(userID)

        
        if(!userData)
            return {status: 'error', message: `AutoLogin failed. Can't fetch user data`}
        if(!userFavDishes)
            return {status: 'error', message: `AutoLogin failed. Can't fetch user fav dishes`}

        const data = {
            userData: userData,
            userFavDishes: userFavDishes
        }

        return {status: 'success', message: 'AutoLogin successful', data: data}
        
    }
    catch (error){
        console.log(error)
    }
}


const updateUserData = async (userID, data) => {

    try{
        const result = await userDB.updateUserData(userID, data)

        if(result){
           return {status: 'success', message: 'User data updated'} 
        }
        else{
            return {status: 'error', message: 'Error while updating data'} 
        }
    }
    catch (error){
        console.log(error)
    }
}

const updateUserEmail = async (userID, email) => {

    try{
        const result = await userDB.updateUserEmail(userID, email)

        if(result){
           return {status: 'success', message: 'User e-mail updated'} 
        }
        else{
            return {status: 'error', message: 'Error while updating e-mail'} 
        }
    }
    catch (error){
        console.log(error)
    }
}

const updateUserPassword = async (userID, password) => {

    try{

        //create hash and salt
        const salt = await passwordHasher.generateSalt()
        const hash = await passwordHasher.encryptPassword(password, salt)

        const result = await userDB.updateUserPassword(userID, hash, salt)

        if(result){
           return {status: 'success', message: 'User password updated'} 
        }
        else{
            return {status: 'error', message: 'Error while updating password'} 
        }
    }
    catch (error){
        console.log(error)
    }
}


const retrieveUserDataModel = async () => {

    try {
        return {status: 'success', data: userDB.model}
    }
    catch (error) {
        console.log(error)
    }
}



//userFavDishesGroupedObject
const retrieveUserFavDishes = async (userID) => {
    
    try{
        
        const userFavDishesList = await userDB.retrieveUserFavDishesList(userID)
        const dishesTypes = await restaurantMenuDB.retrieveDishesTypes()

        if(!userFavDishesList || !dishesTypes)
            return {status: 'error', message: `Can't fetch user fav dishes`}

            
        //group fav dishes by dishesTypes
        const userFavDishesGroupedObject = {}
        for(let dishType of dishesTypes){

            userFavDishesGroupedObject[dishType.type] = []

            for(favDish of userFavDishesList){
                if(favDish.dishTypeID === dishType.id)
                userFavDishesGroupedObject[dishType.type].push(favDish)

            }
        }

        if(userFavDishesGroupedObject)
            return {status: 'success', data: userFavDishesGroupedObject}

    }
    catch (error){
        console.log(error)
    }
}





//  ----- USER/FAV-DISHES ----- //

const addFavDish = async (userID, dishID) => {

    try{

        const result = await userDB.addFavDish(userID, dishID)

        if(result)
            return {status: 'success', message: 'Dish has been added to fav-list'}
        else
            return {status: 'error', message: 'Dish has not been added to fav-list'}
            
    }
    catch (error){

        console.log(error)
    }

}

const removeFavDish = async (userID, dishID) => {

    try{

        const result = await userDB.removeFavDish(userID, dishID)

        if(result)
            return {status: 'success', message: 'Dish has been removed from fav-list'}
        else
            return {status: 'error', message: 'Dish has not been removed from fav-list'}
    }
    catch (error){

        console.log(error)
    }

}




module.exports = {

    //user
    createUser, 
    authenticateUser,
    checkSession,
    updateUserData,
    updateUserEmail,
    updateUserPassword,
    retrieveUserDataModel,


    //fav-dishes
    addFavDish,
    removeFavDish,
    retrieveUserFavDishes,


}