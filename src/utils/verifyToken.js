const jwt = require('jsonwebtoken')
const { stringify } = require('uuid')


module.exports = verifyToken = (req, res, next) => {

    console.log(`verifyToken()`)
    console.log(`ip: ${req.ip}`)
    console.log(`token: ${req.cookies.token}`)
    console.log(`device: ${req.headers['user-agent']}`)

    const token = req.cookies.token;
        
    if(!token) return res.status(401).send({message: 'Access Denied. You must be an authenticated user with token'})

    try{
        const jwtPayload = jwt.verify(token, process.env.JWT_SECRET)
        console.log('token payLoad:', jwtPayload)
        console.log('\n')
        res.locals.jwtPayload = jwtPayload
        next()
    }
    catch (err){
        console.log(err)
        return res.status(400).send({message: `${err.name}: ${err.message}`})
    }
   
}

