const bcrypt = require("bcrypt");

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();


const register = async function registerUser(firstname, lastname, email, password, contact, region, bio) {

    const saltRounds = 10;
    const passwordSalt = bcrypt.genSaltSync(saltRounds) 
    const passwordHash = bcrypt.hashSync(password, passwordSalt);
    const adminNumber = generateAdminNum();
    try{
        // create a new user
        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                adminNumber,
                email,
                password: passwordHash,
                contact,
                region,
                bio,
            }
        })

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

let getDate = Date.now()