const { findUserByEmail, updatePassword, createUser } = require('./auth.service')
const {sendMessage} = require('../lib/mailing')
const redisClient = require('../lib/redisClient')


export const login = async (req, res)=>{
    const { email, password } = req.body;

    try{
        const userEmail = await findUserByEmail(email);

        if(!userEmail){
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
}


export const register = async(req, res)=>{
    const {firstname, lastname, email, password, contact, region, bio} = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if(existingUser){
            res.status(401).json({
                message: 'User already exists'
            })
        }

        const user =  await createUser({firstname, lastname, email, password, contact, region, bio});
        res.status(201).json({
            message: 'User successfully created',
            user
        })

    } catch (error) {
        console.error(`ERROR: ${err.message} ||| ${err.stack}`);
        res.status(500).json({
            status: "500",
            message: "Internal Server Error",
            data: `${err.message} ||| ${err.stack}`
        })
    }
}

export const forgotPassword  = async (req, res, next) => {
    const email = req.body.email;
    try {
        const existingUser = await findUserByEmail(email)
        if(!existingUser){
            res.status(401).json({
                message: 'User does not exist'
            })
        }
        const otp = generateRandomOTP();
        await redisClient.set(`passwordReset:${email}`, otp, {EX: 360}) //This sets the email with otp and expiration time of 300 secs
        
        const subject = 'Password Reset Request'
        const html = 
        `<h3> We received a request to reset your password for your overite account.
            If you did not make this request, please ignore this email. To reset your password, Here's your six digit code: <h2>${otp}</h2>
            This code expires in 3 minutes
        </h3>
        `
        const data = {
            subject,
            html,
            to: email
        }

        const info = await sendMessage(data);
        
        if(!info.accepted){
            res.status(500).json({
                message: `Something went wrong`
            })
            next();
        }
        res.status(200).json({
            message: 'Successful, Check your email for code'
        })

    } catch(e) {
        console.error(`ERROR: ${err.message} ||| ${err.stack}`);
        res.status(500).json({
            status: "500",
            message: "Internal Server Error",
            data: `${err.message} ||| ${err.stack}`
        })
    }
}


export const resetPassword = async(req, res)=>{
    const {email, newPassword, code} = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if(!existingUser){
            res.status(400).json({
                message: 'User does not exist'
            })
        }

        const cachedCode = await redisClient.get(`passwordReset:${email}`);
        if(!cachedCode || cachedCode !== code){
            res.status(400).json({
                message: '' //Do something
            })
        }       

        await updatePassword(email, password);
        res.status(200).json({
            message: 'Password reset successfully'
        })

    } catch (error) {
        console.error(`ERROR: ${err.message} ||| ${err.stack}`);
        res.status(500).json({
            status: "500",
            message: "Internal Server Error",
            data: `${err.message} ||| ${err.stack}`
        })   
    }
}

const generateRandomOTP = ()=>{
    return Math.floor(Math.random(999999 - 100000 + 1) + 100000);
}