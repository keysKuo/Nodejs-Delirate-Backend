import OTP from './Model.js';
import { sendMail } from 'sud-libs';
import dotenv from 'dotenv';
import { mailForm } from '../../utils/index.js';
import jwt from 'jsonwebtoken';
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

async function POST_VerifyOTP(req, res, next) {
    const { code } = req.body;

    const token = req.header('Authorization');
    
    if (!token) {
        return res.json({ 
            success: false,
            status: 403,
            msg: 'JWT not found' 
        });
    }

    jwt.verify(token.replace('Bearer ',''), secretKey, async (err, decoded) => {
        if (err) {
            return res.json({ 
                success: false,
                status: 401,
                msg: 'JWT invalid'
            });
        }
        
        if (decoded.code != code) {
            return res.json({
                success: false,
                status: 300,
                msg: 'OTP invalid'
            })
        }

        const otp = await OTP.findOne({code});

        if(!otp) {
            return res.json({
                success: false,
                status: 404,
                msg: 'OTP not found'
            })
        }
        
        const { username, fullname, email, role } = decoded.user;
        req.user = {
            username, fullname, email, role
        }

        return res.json({
            success: true,
            status: 200,
            msg: 'Login successfully',
            data: req.user
        })
    });
}

export { POST_VerifyOTP };