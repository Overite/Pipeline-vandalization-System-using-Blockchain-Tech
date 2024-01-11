const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const  bcrypt = require("bcrypt");

const login = async (email, password, adminNumber) => {
    const userData = await prisma.user.findUnique({
        where: {
            email,
            password,
            adminNumber
        }
    })
    try{
        const userEmail = userData.email;
        const userPassword = userData.password;
        const userAdminNum = userData.adminNumber;
    }
    catch(err){
        console.error(`ERROR: ${err.message} ||| ${err.stack}`)
    }
}

module.exports = login;