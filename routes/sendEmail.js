import nodemailer from "nodemailer";
import { config } from "dotenv";
config();


const sendEmail = async (to, subject, html) => {
    try {
        // create a transporter Object using the SMTP transport
       const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"No Reply" <${process.env.EMAIL_USER}`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: %s", info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default sendEmail;