const pool = require('./config')


//constructor
const order = () => {
    
}


order.createOrder = async (orderID, date, userData, userOrder, status) => {
    
    let sql = `INSERT INTO orders VALUES ( ?, ?, ?, ?, ? );`
    let args = [orderID, date, userData, userOrder, status]
    
    try{
        const [rows, fields] = await pool.promise().execute(sql, args)
        
        if(rows.serverStatus === 2) return true
        return false
    }
    catch (error){
        console.log(error)
        return false
    }  
    
}

order.getOrders = async() => {

    const sql = `SELECT * FROM orders WHERE status = 'waiting' ORDER BY date ASC ;`
        
    try{
        const [rows, fields] = await pool.promise().execute(sql)
        
        if(rows) return rows
        return false
    }
    catch (error){
        console.log(error)
        return false
    }  
}

order.getOrderStatus = async(orderID) => {

    const sql = `SELECT status FROM orders WHERE orderID = ? ;`
    const args = [orderID]
    
    try{
        const [rows, fields] = await pool.promise().execute(sql, args)
        
        if(rows[0].status) return rows[0].status
        return false
    }
    catch (error){
        console.log(error)
        return false
    }  
}


order.updateOrderStatus = async (orderID, status) => {

    const sql = 'UPDATE orders SET status = ? WHERE orderID = ? ;'
    const args = [status, orderID]

    try {
        const result = await pool.promise().execute(sql, args)
        
        if(result.changedRows) return true
        return false
        
    }
    catch (error) {
        console.log(error)
        return false
    }

}



module.exports = order;