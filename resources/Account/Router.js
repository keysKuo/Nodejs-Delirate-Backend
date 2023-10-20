import { POST_VerifyOTP } from '../OTP/Resolver.js';
import { GET_Verify, POST_Login, POST_Register } from './Resolver.js' ;
import express from 'express';

const router = express.Router();

router.post('/register', POST_Register);
router.post('/login', POST_Login);
router.get('/verify/:token', GET_Verify);
router.post('/confirm_otp', POST_VerifyOTP);

export default router;
