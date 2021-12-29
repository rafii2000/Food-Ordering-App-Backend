
const orderService = require('../services/order.service')

const newOrder = async (req, res, next) => {

    try{

        console.log('newOrder controller')
        //TODO: validation
        const userData = JSON.stringify(req.body.userData)
        const userOrder = JSON.stringify(req.body.userOrder)
        
        const response = await orderService.newOrder(userData, userOrder)
        res.status(200)
        res.send(response)
       
    }
    catch (error){
        console.log(error)
        res.sendStatus(500)
    }

}

const getOrders = async (req, res, next) => {

    try {
               
        const response = await orderService.getOrders()
        
        res.status(200)
        res.send(response)
    } 
    catch (error) {
        console.log(error)
    }
}

const getOrderStatus = async (req, res, next) => {

    try {

        //TODO: validation
        const orderID = req.params.orderID
        
        const response = await orderService.getOrderStatus(orderID)
        
        res.status(200)
        res.send(response)
    } 
    catch (error) {
        console.log(error)
    }
}


const updateOrderStatus = async (req, res, next) => {

    try {

        //TODO: validation
        const orderID = req.params.orderID
        const status = req.params.status

        const response = await orderService.updateOrderStatus(orderID, status)

        res.status(200)
        res.send(response)

    }
    catch (error) {
        console.log(error)
    }
    
}


module.exports = {
    newOrder,
    getOrders,
    getOrderStatus,
    updateOrderStatus
    
}