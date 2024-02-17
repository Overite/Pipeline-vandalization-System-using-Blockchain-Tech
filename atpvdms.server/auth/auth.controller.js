import esh from "express-async-handler";
import { prisma } from '../prisma_client.config.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { send_mail } from "../utils/mail.js";


const signup = esh(async (req, res) => {
    const { password, full_name, email } = req.body;

    if (!email || !password || !full_name) res.status(400).json({ msg: 'Fill in all credentials!', code: 400 })

    try {
        const admin_exist = await prisma.admin.findUnique({ where: { email } });
        const user_name_taken = await prisma.admin.findUnique({ where: { user_name: full_name } });

        if (admin_exist) {
            res.status(400).json({ msg: "This account already exists. Pick another gmail", code: 400 });
        }
        if (user_name_taken) {
            res.status(400).json({ msg: "This user name is taken. Pick another user name", code: 400 });
        }
        if (!admin_exist && !user_name_taken) {
            const assigned_admin_number = Math.floor(Math.random() * 90000) + 10000;
            const hashed_password = await bcrypt.hash(password, Number(process.env.BYCRYPT_HASH_NUMBER));

            const new_admin = await prisma.admin.create({
                data: {
                    email,
                    full_name,
                    password: hashed_password,
                    active: false,
                    role: 'ADMIN',
                    user_name: full_name,
                    admin_number: Number(assigned_admin_number)
                },
            });

            if (new_admin) {
                send_mail({
                    mail_options: {
                        to: email,
                        subject: 'Account Registration',
                        text: `Dear ${full_name},\n\nYour account has been successfully created. Your admin number is ${assigned_admin_number} and your password is ${password}. \n\nRegards,\nATPVDMS Team`
                    }
                })

                res.status(201).json({ msg: 'Your account was created', code: 201 })
            }
            else res.status(400).json({ msg: 'Error in creating your account! Check internet connection', code: 400 })
        }

    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error, code: 500 });
    }
})

const signin = esh(async (req, res) => {
    const { email, password, admin_number } = req.body;

    try {
        const admin = await prisma.admin.findUnique({
            where: { email }
        });
        // await prisma.admin.findUnique({
        //     where: { admin_number: 38373 }
        // })

        if (!admin) res.status(404).json({ msg: 'Account not found. Enter the right email', code: 404 });

        const password_is_correct = await bcrypt.compare(password, admin.password);

        if (admin && password_is_correct) {
            const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            const one_month_from_now = new Date();
            one_month_from_now.setMonth(one_month_from_now.getMonth() + 1);

            res.cookie("token", token, {
                httpOnly: process.env.MODE == 'DEVELOPMENT' ? true : false,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: process.env.MODE == 'DEVELOPMENT' ? true : false,
                sameSite: process.env.MODE == 'DEVELOPMENT' ? 'none' : 'strict',
                path: '/'
            });

            send_mail({
                mail_options: {
                    to: email,
                    subject: 'Account signin',
                    text: `Dear ${admin.full_name},\n\nSuccessfully signed in. \n\nRegards,\niDocRequest Team`
                }
            })

            res.status(200).json({ token, msg: `You are signed in`, code: 200 });
        }

        if (!password_is_correct) res.status(401).json({ msg: 'Password is not correct!', code: 401 });

    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error, code: 500 });
    }
})

const signout = esh(async (req, res) => {
    try {
        const token = req?.cookies?.token;

        if (!token || token === '') {
            return res.status(401).json({ msg: 'You were not signed in', code: 401 });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.log('err', err);
                return res.status(500).json({ msg: 'Error in getting token!', code: 500 });
            } else {
                const user_id = decoded.userId;
                const admin = await prisma.admin.findUnique({ where: { id: user_id } });

                if (admin) {
                    // Clear the token cookie
                    res.cookie("token", '', {
                        hhttpOnly: process.env.MODE == 'DEVELOPMENT' ? true : false,
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                        secure: process.env.MODE == 'DEVELOPMENT' ? true : false,
                        sameSite: process.env.MODE == 'DEVELOPMENT' ? 'none' : 'strict',
                        path: '/'
                    });

                    // Send an email to the user
                    send_mail({
                        mail_options: {
                            to: admin.email,
                            subject: 'Account signout',
                            text: `Dear ${admin.full_name},\n\nSuccessfully signed out. \n\nRegards,\niDocRequest Team`
                        }
                    });

                    // Send the response after clearing the token cookie
                    return res.status(200).json({ msg: "You're logged out", code: 200 });
                } else {
                    return res.status(404).json({ msg: 'User not found', code: 404 });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error, code: 500 })
    }
});

const forgot_password = esh(async (req, res) => {
    const { email } = req.body;

    try {
        const admin_exist = await prisma.tblUsers.findUnique({ where: { Email: email } })

        if (admin_exist) {
            const password_reset_token = Math.floor(Math.random() * 900000) + 100000;

            const html_template = `
            <div style="width: 100%; height: fit-content; background-color: white; display: flex; flex-direction: column; gap: 0.8em; padding: 1em 2em;">

            <p>Dear ${admin_exist?.FullName},</p>
            <p>Complete your password reset with these token</p>

                <div style="display: flex; gap: 1em; width: fit-content; marign: 1em auto;">
                    <span style="background-color: lightgray; border: 1px solid darkgray; color: black; padding: 1em; border-radius: 0.3em;">${password_reset_token.toString()[0]}</span>
                    <span style="background-color: lightgray; border: 1px solid darkgray; color: black; padding: 1em; border-radius: 0.3em;">${password_reset_token.toString()[1]}</span>
                    <span style="background-color: lightgray; border: 1px solid darkgray; color: black; padding: 1em; border-radius: 0.3em;">${password_reset_token.toString()[2]}</span>
                    <span style="background-color: lightgray; border: 1px solid darkgray; color: black; padding: 1em; border-radius: 0.3em;">${password_reset_token.toString()[3]}</span>
                    <span style="background-color: lightgray; border: 1px solid darkgray; color: black; padding: 1em; border-radius: 0.3em;">${password_reset_token.toString()[4]}</span>
                    <span style="background-color: lightgray; border: 1px solid darkgray; color: black; padding: 1em; border-radius: 0.3em;">${password_reset_token.toString()[5]}</span>
                </div>
            </div>
            `

            send_mail({
                mail_options: {
                    to: admin_exist?.Email,
                    subject: 'Forgot password',
                    html: html_template
                }
            })

            res.cookie("password_reset_token", password_reset_token, {
                httpOnly: process.env.MODE == 'DEVELOPMENT' ? true : false,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: process.env.MODE == 'DEVELOPMENT' ? true : false,
                sameSite: process.env.MODE == 'DEVELOPMENT' ? 'none' : 'strict',
                path: '/'
            });


            res.status(200).json({ msg: 'Check your gmail!', code: 200 })
        }
        else res.status(404).json({ msg: 'Account of this gmail was not found!', code: 404 })
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error, code: 500 })
    }
})

const confirm_token = esh(async (req, res) => {
    const { password_reset_token: input_token } = req.body;
    const password_reset_token = req?.cookies?.password_reset_token;

    try {
        const token_match = password_reset_token == input_token;
        console.log({ password_reset_token, input_token })

        if (token_match) res.status(200).json({ msg: 'tokens match', token_match, code: 200 })
        else res.status(400).json({ msg: `tokens don't match`, code: 400 })
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error, code: 500 })
    }
})

const reset_password = esh(async (req, res) => {
    const { email, new_password } = req.body;

    try {
        const admin_exist = await prisma.tblUsers.findUnique({ where: { Email: email.toLowerCase() } });
        if (!admin_exist) {
            res.status(404).json({ msg: 'Admin account not found', code: 404 });
        }

        const hashed_password = await bcrypt.hash(new_password, Number(process.env.BYCRYPT_HASH_NUMBER));

        const password_reset = await prisma.tblUsers.update({
            where: { Email: email },
            data: { Password: hashed_password }
        });

        if (password_reset) {

            send_mail({
                mail_options: {
                    to: email,
                    subject: 'Password Reset Successful',
                    text: `Dear ${admin_exist.FullName},\n\nYour password has been successfully reset.\n\nRegards,\niDocRequest Team`
                }
            });

            return res.status(200).json({ msg: 'Password reset successful', code: 200 });
        } else {
            return res.status(500).json({ msg: 'Password reset not successful', code: 500 });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error', error, code: 500 });
    }
});


export { signup, signin, signout, forgot_password, reset_password, confirm_token }