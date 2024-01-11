const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("@prisma/client");
const dotenv = require("dotenv");

const registerRoute = require("../routes/registerRoute.js");
const loginRoute = require("../routes/loginRoute.js")

const app = express();
app.use(express.json());

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).json("Successful Connection!")
});

app.use('/register', registerRoute);
app.use('/login', loginRoute);


const start = async() => {
    try{
        app.listen(PORT, () => {
            console.log(`Application is Listening on ${PORT} ~ Visit http://localhost:${PORT}`)
        })
    }
    catch(ex){
        console.log(`${ex.message} ||| ${ex.stack} ${new Date()}`)
    }
}

start();