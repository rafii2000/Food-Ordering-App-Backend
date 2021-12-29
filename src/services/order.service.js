
const orderDB = require('../db/order.db')
const uuid = require('uuid')


const newOrder = async (userData, userOrder) => {

    try {
        
        const orderID = uuid.v4()
        const date = new Date().toLocaleString()
        const status = 'waiting'

        const result = await orderDB.createOrder(orderID, date, userData, userOrder, status)

        if(result){

            return {status: 'success', message:'Order send to restaurant successfully', data:{orderID: orderID}}
        }
        else{
            return {status: 'error', message:'Error while sending order to restaurant'}
        }

    }
    catch (error) {
        console.log(error)
    }
}

const getOrders = async () => {

    try {
        
        const result = await orderDB.getOrders()
        
        if(result){
            return {status: 'success', message:'', data:result}
        }
        else{
            return {status: 'error', message:''}
        }
    }
    catch (error) {
        console.log(error)    
    }
}

const getOrderStatus = async (orderID) => {

    try {
        
        const result = await orderDB.getOrderStatus(orderID)

        if(result){
            return {status: 'success', message:'', data:{status: result}}
        }
        else{
            return {status: 'error', message:''}
        }
    }
    catch (error) {
        console.log(error)    
    }
}


const updateOrderStatus = async (orderID, status) => {

    try {
        
        const result = await orderDB.updateOrderStatus(orderID, status)

        if(result)
            return {status: 'success', message: 'Order status updated'}
        else
            return {status: 'error', message: 'Order status updating failed'}

    }
    catch (error) {
        console.log(error)
    }

}




module.exports = {

    newOrder,
    getOrders,
    getOrderStatus,
    updateOrderStatus,
}