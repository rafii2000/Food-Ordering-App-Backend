const bcrypt  = require('bcrypt')

async function generateSalt(){

    return await bcrypt.genSalt(10)
}

async function encryptPassword(password, salt){

    return await bcrypt.hash(password, salt)
}

async function checkPassword(plainPassword, hashedPassword){

    //console.log('plain: ',plainPassword, '\n', 'salt: ', salt, '\n', 'hash: ', hashedPassword)
    const match = await bcrypt.compare(plainPassword, hashedPassword)
    return match
}




module.exports = {

    encryptPassword: encryptPassword,
    generateSalt: generateSalt,
    checkPassword:checkPassword,
}