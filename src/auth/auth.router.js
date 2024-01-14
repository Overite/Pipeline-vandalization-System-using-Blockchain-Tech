const express = require('express')
const router = express.Router();
const {login, register, forgotPassword, resetPassword} = require('./auth.controller')


router.post('/register', register)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword', resetPassword)

export default router;