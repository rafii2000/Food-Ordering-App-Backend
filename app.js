const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv')
const routes = require('./src/routes')


//https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way


const app = express();
const port = 9999;
const host = '192.168.0.5'


//middleware
dotenv.config()
app.use(express.json());
app.use(cookieParser())
if(process.env.ENVIRONMENT === 'development') app.use(cors({origin: true, credentials: true}))
//app.use(cors({origin: true, credentials: true})) //enable CORS request - uncomment when frontend is run on external server
app.use('/api', routes)
app.use(express.static(path.join(__dirname, 'build'))); 


// serve React App
if(process.env.ENVIRONMENT === 'production'){
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}
    


//run server
app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`)
})

