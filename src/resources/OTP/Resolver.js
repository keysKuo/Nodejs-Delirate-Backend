import OTP from './Model.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Account from '../Account/Model.js';
import Customer from '../Customer/Model.js';

import { sendMail } from 'sud-libs';
import { mailForm } from '../../utils/index.js';
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const apiUrl = process.env.API_URL;

const auth = {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_PASSWORD,
};
/**
 * Description: Verify login with OTP
 * Request:     POST /account/confirm_otp
 * Send:        JSON object which contains code(OTP)
 * Receive:     200 if success, otherwise fail
 */
async function POST_ConfirmOTP(req, res, next) {
    const { code } = req.body;

    const token = req.header('Authorization');
    
    if (!token) {
        return res.json({
            success: false,
            status: 403,
            msg: 'JWT not found',
        });
    }

    jwt.verify(token.replace('Bearer ', ''), secretKey, async (err, decoded) => {
        if (err) {
            return res.json({
                success: false,
                status: 401,
                msg: 'JWT invalid',
            });
        }

        if (decoded.code != code) {
            return res.json({
                success: false,
                status: 300,
                msg: 'OTP invalid',
            });
        }
        
        const otp = await OTP.findOne({ code, email: decoded.user.email });

        if (!otp) {
            return res.json({
                success: false,
                status: 404,
                msg: 'OTP not found',
            });
        }

        return res.json({
            success: true,
            status: 200,
            msg: 'Login successfully',
            data: decoded.user
        });
    });
}

/**
 * Description: Resend OTP to Email
 * Request:     POST /account/confirm_otp
 * Send:        JSON object which contains email
 * Receive:     200 if success, otherwise fail
 */
async function POST_ResendOTP(req, res, next) {
    const { email } = req.body;
    
    try {
        let myAccount = await Account.findOne({ email });

        let customer = await Customer.findOne({ email: myAccount.email }).then(async (customer) => {
            if (customer) {
                return customer;
            }
    
            return await new Customer({
                name: myAccount.name,
                email: myAccount.email,
                address: myAccount.location,
                phone: myAccount.phone,
            }).save();
        });

        if(myAccount) {
            const user_info = {
                email: myAccount.email,
                hashed_email: myAccount.hashed_email,
                name: myAccount.name,
                location: myAccount.location,
                avatar: apiUrl + '/uploads' + myAccount.avatar,
                phone: myAccount.phone,
                role: myAccount.role,
                customer_id: customer._id,
            };

            if (myAccount.role === 'retailer') {
                user_info['store'] = myAccount.store;
            }

            let otp = await new OTP({
                email: email,
                code: Math.floor(Math.random() * (9999 - 1000) + 1000),
            }).save();

            const token = jwt.sign({ user: user_info, code: otp.code }, secretKey);
        
            const options = {
                from: auth.user,
                to: email,
                subject: `${otp.code} Mã xác nhận đăng nhập tài khoản Delirate`,
                html: mailForm({
                    caption: 'Mã xác nhận đăng nhập',
                    content: ` 
                    <h1>${otp.code}</h1>
                    `,
                }),
            };
        
            sendMail(auth, options, (err) => {
                if (err) console.log(err);
            });
        
            return res.json({
                success: true,
                status: 200,
                msg: 'OTP sent',
                token: token,
            });
        }
        
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: 'OTP cannot send: ' + error,
        });
    }
}

export { POST_ConfirmOTP, POST_ResendOTP };
