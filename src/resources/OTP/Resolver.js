import OTP from './Model.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

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
        
        const otp = await OTP.findOne({ code, email: decoded.user.hashed_email });

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
            token: jwt.sign(decoded.user, secretKey, { expiresIn: '5m' })
        });
    });
}

export { POST_ConfirmOTP };
