const prisma = require('../lib/prisma')
const bcrypt = require('bcrypt')

export const findUserByEmail = async(email)=>{
    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

export const updatePassword = async(email, newPassword)=>{
    newPassword = bcrypt.hashSync(newPassword, 8);
    return await prisma.user.update({
        where: {email},
        data: {
            password: newPassword
        }
    })
}

export const createUser = async(data)=>{
    data.password = bcrypt.hashSync(data.password, 8)
    return await prisma.user.create({
        data,
        select: {
            firstname: true,
            lastname: true,
            email: true
        }
    })
}

