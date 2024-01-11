const bcrypt = require("bcrypt");
const existingUser = require("../controllers/registerController.js");

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

const register = async function registerUser(email, password, adminNumber) {

    const saltRounds = 10;
    const passwordSalt = bcrypt.genSaltSync(saltRounds)
    const passwordHash = bcrypt.hashSync(password, passwordSalt);
    try{
        // create a new user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: passwordHash,
                adminNumber: generateAdminNum(),
            },
        })

        router.post('/', async (req, res) => {
    const {email, password} = req.body;

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
            const newUser = await register(email, password);
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

        return newUser;
    }
    catch(err){
        console.error('ERROR FOUND, ', err);
        throw new Error("Could not Register User");
    }
    finally{
        prisma.$disconnect();
    }
}

module.exports = register;

function generateAdminNum() {
    var min = 1;
    var max = 9;

    var randomString = "";
    for(var i=0; i<4; i++){
        var randomNum = Math.floor(Math.random() * (min + max));
        randomString += randomNum;
    }

    return `ADM-${randomString}`;
}