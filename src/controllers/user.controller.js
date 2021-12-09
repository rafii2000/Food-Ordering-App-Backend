
const jwt = require('jsonwebtoken');

const userService = require('../services/user.service')

     

const authenticateUser = async (req, res, next) => {

    //TODO: req.body validation

    console.log(`user.controller authenticateUser()`)
    console.log(`ip: ${req.ip}`)
    console.log(`token: ${req.cookies.token} (should be undefined)`)
    console.log(`device: ${req.headers['user-agent']}`)
    //console.log(`\n`)

    try{

        const response = await userService.authenticateUser(req.body)   //return user's data

        if(response.status === 'success'){

            //create JWT token with userID payload
            const userID = response.data.userData.userID
            const token = jwt.sign({userID: userID}, process.env.JWT_SECRET)
            console.log('generated toke:', token)
            console.log(`\n`)
            
            //production: frontend is serve from this server, from build directory, CORS request are disabled
            //development: frontend is serve from webpack server (or any external), CORS request must be enabled
            res.cookie('token', token, { 
                maxAge: 24 * 60 * 60 * 1000,    //24h
                httpOnly: true,
                sameSite: process.env.ENVIRONMENT === 'production' ? 'strict' : 'none',
                secure: false,
            })
        }
        
        res.status(200)
        res.send(response)
    }
    catch (error){
        console.log(error)
        res.sendStatus(500)
    }

}


const createUser = async (req, res, next) => {

    //TODO: req.body validation
    
    try{

        const response = await userService.createUser(req.body)
        res.status(200)
        res.send(response)

    }
    catch (error){
        console.log(error)
        res.sendStatus(500)
    }
}

//autoLogin, persistSession, persistUserData
const checkSession = async (req, res, next) => {

    //if session cookie's token is not expired get user data without login 
    try{
        
        const jwtPayload = res.locals.jwtPayload
        const response = await userService.checkSession(jwtPayload)
        res.send(response)
    }
    catch (error){
        console.log(error)
        res.sendStatus(500)
    }

}


const logoutUser = async (req, res, next) => {

    try{
    
        //production: frontend is serve from this server, from build directory, CORS request are disabled
        //development: frontend is serve from webpack server (or any external), CORS request must be enabled
        res.clearCookie('token', { 
            httpOnly: true,
            sameSite: process.env.ENVIRONMENT === 'production' ? 'strict' : 'none',
            secure: false,
        })

        res.status(200)
        res.send({status: 'success', message: 'Logout succeeded'})

    }
    catch (error){
        console.log(error)
        res.sendStatus(500)
    }
}


const updateUserData = async (req, res, next) => {

    try{
        const userID = req.params.userID
        const data = req.body.data

        const response = await userService.updateUserData(userID, data)
        res.status(200)
        res.send(response)
    }
    catch (error){
        console.log(error)
        res.sendStatus(500)
    }
}


const updateUserEmail = async (req, res, next) => {

    try{
        const userID = req.params.userID
        const email = req.body.email

        const response = await userService.updateUserEmail(userID, email)
        res.status(200)
        res.send(response)
    }
    catch (error){
        console.log(error)
        res.sendStatus(500)
    }
}

const updateUserPassword = async (req, res, next) => {

    try{
        //TODO: validation
        const userID = req.params.userID
        const password = req.body.password
        const password2 = req.body.repeatPassword
        
        const response = await userService.updateUserPassword(userID, password)
        res.status(200)
        res.send(response)
    }
    catch (error){
        console.log(error)
        res.sendStatus(500)
    }
}



const retrieveUserDataModel = async (req, res, next) => {

    try {
        const response = await userService.retrieveUserDataModel()
        res.status(200)
        res.send(response)
    }
    catch (error) {
        res.statusCode = 500;
        res.send({status: 'error', message: 'Error while retrieving user data object '})
    }
}





//  ----- USER/FAV-DISHES ----- //

const retrieveUserFavDishes = async (req, res, next) => {

    try{
        const userID = req.params.userID
        const response = await userService.retrieveUserFavDishes(userID)
        res.status(200)
        res.send(response)
    }
    catch (error){
        console.log(error)
        res.sendStatus(500)
    }

}

const addFavDish = async (req, res, next) => {

    try{
        const userID = req.params.userID
        const dishID = req.params.dishID
        const response = await userService.addFavDish(userID, dishID)
        res.status(200)
        res.send(response)
    }
    catch (error){
        console.log(error)
        res.sendStatus(500)
    }

}

const removeFavDish = async (req, res, next) => {

    try{
        const userID = req.params.userID
        const dishID = req.params.dishID
        const response = await userService.removeFavDish(userID, dishID)
        res.status(200)
        res.send(response)
    }
    catch (error){
        console.log(error)
        res.sendStatus(500)
    }
    
}





module.exports = {

    //user
    createUser,
    authenticateUser,
    checkSession,
    logoutUser,
    updateUserData,
    updateUserEmail,
    updateUserPassword,
    retrieveUserDataModel,


    //fav-dishes
    addFavDish,
    removeFavDish,
    retrieveUserFavDishes,

}