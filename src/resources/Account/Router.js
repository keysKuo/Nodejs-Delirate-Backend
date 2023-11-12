import { POST_ConfirmOTP, POST_ResendOTP } from '../OTP/Resolver.js';
import { GET_LoginQR, GET_Verify, POST_Login, POST_LoginQR, POST_Register } from './Resolver.js';

import express from 'express';


const router = express.Router();

router.post('/register', POST_Register);
router.post('/login', POST_Login);
router.get('/verify', GET_Verify);
router.post('/confirm_otp', POST_ConfirmOTP);
router.post('/resend_otp', POST_ResendOTP);

router.get('/login_qr', GET_LoginQR);
router.post('/login_qr', POST_LoginQR);

export default router;
