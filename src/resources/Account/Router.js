import { POST_ConfirmOTP, POST_ResendOTP } from '../OTP/Resolver.js';
import upload from '../../middlewares/multer.js';
import {
    GET_AccountBalance,
    GET_AnswerPermissionLoginQR,
    GET_CheckLoginQR,
    GET_LoginQR,
    GET_Verify,
    POST_Login,
    POST_LoginQR,
    POST_Register,
} from './Resolver.js';

import express from 'express';

const router = express.Router();

/**
 * Description: Register a new Account
 * Request:     POST /account/register
 * Send:        JSON object which contains email, password, password_confirm, name, location, phone, role
 * Receive:     200 if success, otherwise fail
 */
router.post('/register', upload.single('file'), POST_Register);

/**
 * Description: Login to App
 * Request:     POST /account/login
 * Send:        JSON object which contains email, password
 * Receive:     200 if success, otherwise fail
 */
router.post('/login', POST_Login);

/**
 * Description: Activate an account by scanning QR code
 * Request:     GET /account/verify/:token
 * Send:        jwt token which contains account_id as param
 * Receive:     200 if success, otherwise fail
 */
router.get('/verify', GET_Verify);


router.post('/confirm_otp', POST_ConfirmOTP);
router.post('/resend_otp', POST_ResendOTP);

router.get('/login_qr', GET_LoginQR);
router.post('/login_qr', POST_LoginQR);
router.get('/checklogin_qr', GET_CheckLoginQR);
router.get('/admit_permission', GET_AnswerPermissionLoginQR);

router.get('/get_account_balance', GET_AccountBalance);

export default router;
