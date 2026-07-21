const transporter = require("../mail.js");
const otp = Math.floor(100000 + Math.random() * 900000);
const sendTestMail = async (req, res) => {

    try {
         const {email} = req.body;

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

           subject: "Email Verification",

html: `
    
    <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;border:1px solid #ddd;border-radius:10px;overflow:hidden;">

        <div style="background:#ff6b35;color:white;padding:20px;text-align:center;">
            <h1>🍔 FeastFlow</h1>
            <p>Email Verification</p>
        </div>

        <div style="padding:30px;">

            <h2>Hello!</h2>

            <p>
                Thank you for creating your FeastFlow account.
                Please use the OTP below to verify your email address.
            </p>

            <div style="
                background:#f5f5f5;
                border:2px dashed #ff6b35;
                padding:20px;
                text-align:center;
                font-size:32px;
                font-weight:bold;
                letter-spacing:8px;
                color:#ff6b35;
                margin:30px 0;
            ">
                ${otp}
            </div>

            <p>
                This OTP will expire in <b>5 minutes</b>.
            </p>

            <p>
                If you didn't request this account, you can safely ignore this email.
            </p>

        </div>

        <div style="background:#fafafa;padding:15px;text-align:center;color:#777;">
            © 2026 FeastFlow. All rights reserved.
        </div>

    </div>

    `

        });

        res.status(200).json({

            message: "Email Sent Successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Email Sending Failed"

        });

    }

};

module.exports = { sendTestMail };