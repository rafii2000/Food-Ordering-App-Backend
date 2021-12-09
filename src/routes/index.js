const express = require('express')
const {restaurantMenuController, userController} = require('../controllers') 
const verifyToken = require('../utils/verifyToken')

const router = express.Router()


//  ----- RESTAURANT MENU ENDPOINTS ----- //
router.get('/menu', restaurantMenuController.retrieveMenu)    //menu is grouped list of dishes

router.get('/dishes',               restaurantMenuController.retrieveDishes);   
router.get('/dishes/:dishID',       restaurantMenuController.retrieveDish);
router.post('/dishes',              restaurantMenuController.createDish);
router.put('/dishes/:dishID',       restaurantMenuController.updateDish);
router.delete('/dishes/:dishID',    restaurantMenuController.deleteDish);

router.get('/dishes-types',                 restaurantMenuController.retrieveDishesTypes)
router.post('/dishes-types',                restaurantMenuController.createDishType)
router.delete('/dishes-types/:dishTypeID',  restaurantMenuController.deleteDishType)

router.get('/dishes-subtypes',                      restaurantMenuController.retrieveDishesSubtypes)
router.get('/dishes-subtypes/:dishTypeID',          restaurantMenuController.retrieveSubtypesOfDishType)
router.post('/dishes-subtypes',                     restaurantMenuController.createDishSubtype)
router.delete('/dishes-subtypes/:dishSubtypeID',    restaurantMenuController.deleteDishSubtype)


//  ----- USER ----- //
router.post('/login', userController.authenticateUser)
router.post('/logout', userController.logoutUser)
router.post('/signin', userController.createUser)
router.put('/users/:userID', verifyToken, userController.updateUserData)
router.put('/users/:userID/email', verifyToken, userController.updateUserEmail)
router.put('/users/:userID/password', verifyToken, userController.updateUserPassword)

router.get('/user/data-model', userController.retrieveUserDataModel)
router.get('/user/check-session', verifyToken, userController.checkSession)


//  ----- USER-FAV-DISHES ----- //
router.get('/fav-dishes/:userID', userController.retrieveUserFavDishes)
router.put('/fav-dishes/:userID/:dishID', userController.addFavDish)
router.delete('/fav-dishes/:userID/:dishID', userController.removeFavDish)



module.exports = router


