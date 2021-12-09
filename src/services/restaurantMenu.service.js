
const restaurantMenuDB = require('../db/restaurantMenu.db')


const retrieveMenu = async () => {

    try {
        
        const dishes = await restaurantMenuDB.retrieveDishes()
        const dishesTypes = await restaurantMenuDB.retrieveDishesTypes()

        if(!dishes || !dishesTypes)
            return {status: 'error', message: `Can't fetch restaurant menu`}


        const menu = {}
        for(dishType of dishesTypes){
        
            menu[dishType.type] = []    

            for(dish of dishes){

                if(dish.dishTypeID === dishType.id)
                    menu[dishType.type].push(dish)
            }
        }


        if(menu)
            return {status: 'success', data: menu}
        else
            return {status: 'error', message: `Can't fetch restaurant menu`}
            
    }
    catch (error) {
        throw new Error(e.message)
    }

}


const retrieveDishesTypes = async () => {

    try {
        
        const dishesTypes = await restaurantMenuDB.retrieveDishesTypes()
                
        if(dishesTypes){
            return {status: 'success', data: dishesTypes}
        }
        else{
            return {status: 'error', message: `Can't fetch dishes types`}
        }

    }
    catch (error) {
        throw new Error(e.message)
    }

}



module.exports = {

    retrieveMenu,
    retrieveDishesTypes,
        

}

