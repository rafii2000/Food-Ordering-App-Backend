
const { response } = require('express')
const {restaurantMenuService} = require('../services')


const retrieveMenu = async (req, res, next) => {

    try{

        //const result = await callServiceHere(arg1, arg2)
        const response = await restaurantMenuService.retrieveMenu()
        
        res.statusCode = 201
        res.send(response)
    }
    catch (e){
        console.log(e.message)
        res.sendStatus(500)
        //res.sendStatus(500) && next(error)
    }

}




const retrieveDishes = async (req, res, next) => {
    //controller code here
    //TODO: parse args from body
    //TODO: call service
    //TODO: send response
}

const retrieveDish = async (req, res, next) => {
    //controller code here
    //TODO: parse args from body
    //TODO: call service
    //TODO: send response
}

const createDish = async (req, res, next) => {
    //controller code here
    //TODO: parse args from body
    //TODO: call service
    //TODO: send response
}

const updateDish = async (req, res, next) => {
    //controller code here
    //TODO: parse args from body
    //TODO: call service
    //TODO: send response
}

const deleteDish = async (req, res, next) => {
    //controller code here
    //TODO: parse args from body
    //TODO: call service
    //TODO: send response
}



const retrieveDishesTypes = async (req, res, next) => {
    
    //TODO: parse args from body
    
    try{
        const response = await restaurantMenuService.retrieveDishesTypes()
        res.statusCode = 200
        res.send(response)
    }
    catch (error){

        res.statusCode = 501
        res.send({status: 'error', message: 'Error while retrieving dishes types'}) 
    }
}

const createDishType = async (req, res, next) => {
    //controller code here
    //TODO: parse args from body
    //TODO: call service
    //TODO: send response
}

const deleteDishType = async (req, res, next) => {
    //controller code here
    //TODO: parse args from body
    //TODO: call service
    //TODO: send response
}





const retrieveDishesSubtypes = async (req, res, next) => {
    //controller code here
    //TODO: parse args from body
    //TODO: call service
    //TODO: send response
}

const retrieveSubtypesOfDishType = async (req, res, next) => {
    //controller code here
    //TODO: parse args from body
    //TODO: call service
    //TODO: send response
}

const createDishSubtype = async (req, res, next) => {
    //controller code here
    //TODO: parse args from body
    //TODO: call service
    //TODO: send response
}

const deleteDishSubtype = async (req, res, next) => {
    //controller code here
    //TODO: parse args from body
    //TODO: call service
    //TODO: send response
}








module.exports = {
    retrieveMenu,
    
    retrieveDishes,
    retrieveDish,
    createDish,
    updateDish,
    deleteDish,

    retrieveDishesTypes,
    createDishType,
    deleteDishType,


    retrieveDishesSubtypes,
    retrieveSubtypesOfDishType,
    createDishSubtype,
    deleteDishSubtype


}