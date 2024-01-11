const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// app.use(express.json());

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user){
            res.status(401).json({
                status: "401",
                message: "Incorrect Email or Password"
            })
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if(isValid){
            res.status(201).json({
                status: "201",
                message: "Login Successful"
            })
        }
        else{
            res.status(400).json({
                status: "400",
                message: "Incorrect Email or Password"
            })
        }
    }
    catch(err){
        console.error(`ERROR: ${err.message} ||| ${err.stack}`);
        res.status(500).json({
            status: "500",
            message: "Internal Server Error",
            data: `${err.message} ||| ${err.stack}`
        })
    }
})

module.exports = router;