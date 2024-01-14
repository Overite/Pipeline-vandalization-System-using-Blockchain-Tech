const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: '',
    port: '', 
    secure: true,
    auth: {
        user: '',
        pass: ''
    }
})

export const sendMessage= async(data) =>{
    const info = await transporter.sendMail({
        from: '',
        ...data
    })
    return info
}