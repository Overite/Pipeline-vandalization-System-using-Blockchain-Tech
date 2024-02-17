import nodemailer from "nodemailer"

// sample
// send_mail({
//     mail_options: {
//         to: email,
//         subject: 'Password Reset Successful',
//         text: `Dear ${admin_exist.FullName},\n\nYour password has been successfully reset.\n\nRegards,\niDocRequest Team`
//     }
// });
// sample

const send_mail = ({ mail_options }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.I_DOC_GOOGLE_ACCOUNT_EMAIL,
            pass: process.env.I_DOC_GOOGLE_ACCOUNT_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.I_DOC_GOOGLE_ACCOUNT_EMAIL,
        ...mail_options
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(info.response)
        }
    });

}

export { send_mail }