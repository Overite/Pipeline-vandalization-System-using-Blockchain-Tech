const express = require("express");
const router = express.Router();
const register  = require("../controllers/registerController.js");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Register User
router.post('/', async (req, res) => {
    const { firstname, lastname, email, password, contact, region, bio } = req.body;

    try{
        const existingUser = await prisma.user.findUnique({
            where: {email}
        })

        if(existingUser){
            res.status(400).json({
                status: '400',
                message: 'User Already Exists'
            })
        }
        else{
            const newUser = await register(firstname, lastname, email, password, contact, region, bio);
            res.status(201).json({
                status: '201', 
                message: 'Registered Successfully',
                data: newUser
            })
        }
    }
    catch(err){
        res.status(500).json({
            status: '500',
            message: 'An Error Occured',
            error: `${err.message} || ${err.stack}`
        })
    }
    finally{
        prisma.$disconnect();
    }
});

module.exports = router;