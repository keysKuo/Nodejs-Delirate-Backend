import Account from './Model.js';
import OTP from '../OTP/Model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendMail } from 'sud-libs';
import QRCode from 'qrcode';
import { mailForm, hashBcrypt, hashMD5, loadContract } from '../../utils/index.js';
import dotenv from 'dotenv';

dotenv.config();

const apiUrl = process.env.API_URL || 'http://localhost:8080';
const secretKey = process.env.SECRET_KEY || 'nkeyskuo';

const auth = {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_PASSWORD,
};

/**
 * Description: Register a new Account
 * Request:     POST /account/register
 * Send:        JSON object which contains email, password, password_confirm, name, location, phone, role
 * Receive:     200 if success, otherwise fail
 */
async function POST_Register(req, res, next) {
    const { email, password, password_confirm, name, location, phone, role } = req.body;

    if(!email.includes('@')) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Email invalid',
        });
    }


    if (password != password_confirm) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Password not same',
        });
    }

    if(password.length < 6) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Password at least 6 characters',
        });
    }

    if(phone.length != 10) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Phone number invalid',
        });
    }

    const my_account = await Account.findOne({ email });

    if (my_account) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Account already exist',
        });
    }

    try {
        let new_account = await new Account({
            email,
            name,
            location,
            phone,
            role,
            hashed_email: hashMD5(email),
            password: hashBcrypt(password),
        }).save();

        // Encode URL
        const token = jwt.sign({ id: new_account._id }, secretKey);
        // const qrcode = await QRCODE(`https://sud-delirate.onrender.com/account/verify?token=${token}`);

        // Send mail verified
        const options = {
            from: auth.user,
            to: email,
            subject: 'Xác thực tài khoản từ Delirate',
            text: `Xin chào ${name}`,
            attachDataUrls: true,
            html: mailForm({
                logo_link: process.env.LOGO_LINK || '',
                caption: `Xác thực tài khoản từ Delirate`,
                content: `
                    <p style="font-size: 15px">http://localhost:8080/account/verify?token=${token}</p>
                    <h5>Vui lòng truy cập đường dẫn để xác thực tài khoản</h5>
                `,
                // `
                //     <img src="${qrcode}" />
                //     <h5>Vui lòng quét QR code để xác thực tài khoản</h5>
                // `
            }),
        };

        sendMail(auth, options, (err) => {
            if (err) console.log(err);
        });

        return res.json({
            success: true,
            status: 200,
            msg: 'Account registed',
        });
    } catch (err) {
        return res.json({
            success: false,
            status: 500,
            msg: 'Register account rejected. ' + err,
        });
    }
}

/**
 * Description: Login to App
 * Request:     POST /account/login
 * Send:        JSON object which contains email, password
 * Receive:     200 if success, otherwise fail
 */
async function POST_Login(req, res, next) {
    const { email, password } = req.body;

    const my_account = await Account.findOne({ email }).lean();

    if (!my_account) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Account invalid',
        });
    }

    if (my_account.status !== 'activated') {
        return res.json({
            success: false,
            status: 300,
            msg: 'Account not activated',
        });
    }

    if (!bcrypt.compareSync(password, my_account.password)) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Incorrect password',
        });
    }

    // Generate OTP and Send OTP
    const user_info = {
        email: my_account.email,
        hashed_email: my_account.hashed_email,
        name: my_account.name,
        location: my_account.location,
        phone: my_account.phone,
        role: my_account.role,
    };

    try {
        let otp = await new OTP({
            email: my_account.email,
            code: Math.floor(Math.random() * (9999 - 1000) + 1000),
        }).save();
        const token = jwt.sign({ user: user_info, code: otp.code }, secretKey);
    
        const options = {
            from: auth.user,
            to: my_account.email,
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
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: 'OTP cannot send',
        });
    }
    
}

/**
 * Description: Activate an account by scanning QR code
 * Request:     POST /account/verify/:token
 * Send:        jwt token which contains account_id as param
 * Receive:     200 if success, otherwise fail
 */
async function GET_Verify(req, res, next) {
    const { token } = req.query;

    jwt.verify(token, secretKey, async (error, decoded) => {
        if (error) {
            return res.json({
                success: false,
                status: 500,
                msg: 'JWT invalid',
            });
        }

        return await Account.findByIdAndUpdate(decoded.id, { $set: { status: 'activated' } })
            .then(async (account) => {
                // const contract = await loadContract();

                // switch (account.role) {
                //     case 'customer':
                //         let result_customer = await contract.register_customer({
                //             args: {
                //                 hashed_email: account.hashed_email,
                //                 name: account.name,
                //                 phone: account.phone,
                //             },
                //         });

                //         console.log('Customer registed ' + result_customer);
                //         break;
                //     case 'retailer':
                //         let result_retailer = await contract.register_retailer({
                //             args: {
                //                 hashed_email: account.hashed_email,
                //                 name: account.name,
                //                 location: account.location,
                //             },
                //         });

                //         console.log('Retailer registed ' + result_retailer);
                //         break;
                //     default:
                //         break;
                // }

                return res.json({
                    success: true,
                    status: 200,
                    msg: 'Account verified ' + `[${account.role}]` + `[${account.hashed_email}]`,
                });
            })
            .catch((err) => {
                return res.json({
                    success: false,
                    status: 500,
                    msg: err,
                });
            });
    });
}

// <----------------------------- LOGIN QRCODE ------------------------------>

let tokens = [];

async function GET_LoginQR(req, res, next) {
    const token = crypto.randomBytes(20).toString('hex');
    tokens[token] = { createdAt: Date.now() };

    const browser = req.useragent.browser;
    const os = req.useragent.os;

    tokens[token].agent = { browser, os, timestamp: new Date().toLocaleString('vi-vn'), location: 'Ho Chi Minh City' };

    const loginUrl = apiUrl + `/account/login_qr?token=${token}`;

    return await QRCode.toDataURL(loginUrl, (err, url) => {
        if(err) {
            return res.json({
                success: false,
                status: 500,
                msg: 'Error generating QRCODE'
            })
        }

        return res.json({
            success: true,
            status: 200,
            token: token,
            data: url
        })
    })
}

async function POST_LoginQR(req, res, next) {
    const { token } = req.query;
    const tokenData = tokens[token];
    const { email } = req.body;
    const expiresIn = 300;

    if(!tokenData) {
        return res.json({
            success: false,
            status: 400,
            msg: 'Invalid token'
        })
    }

    const timeElapsed = (Date.now() - tokenData.createdAt) / 1000;
    if(timeElapsed > expiresIn) {
        delete tokens[token];
        return res.json({
            success: false,
            status: 400,
            msg: 'Token expired'
        })
    }

    let my_account = await Account.findOne({email}).lean();

    const user_info = {
        email: my_account.email,
        hashed_email: my_account.hashed_email,
        name: my_account.name,
        location: my_account.location,
        phone: my_account.phone,
        role: my_account.role,
    };

    // tokens[token].verify = true;
    tokens[token].user = user_info;
    return res.json({
        success: true,
        status: 200,
        agent: tokenData.agent,
        token: token,
        msg: 'Authenticated Login'
    })
    
}

async function GET_AnswerPermissionLoginQR(req, res, next) {
    const { token, verify } = req.query;

    if(verify === 'true') {
        tokens[token].verify = true;
        return res.json({
            success: true,
            status: 200,
            token: token,
            msg: 'Login verified'
        })
    }
    else {
        return res.json({
            success: false,
            status: 400,
            msg: 'Login rejected'
        })
    }
}

async function GET_CheckLoginQR(req, res, next) {
    const { token } = req.query;
    const tokenData = tokens[token];

    if(!tokenData) {
        return res.json({
            success: false,
            status: 400,
            msg: 'Login rejected'
        })
    }

    if(tokenData.verify) {
        return res.json({
            success: true,
            status: 200,
            data: tokenData.user,
            msg: 'Login successfully'
        })
    }

    if(tokenData.user) {
        return res.json({
            success: false,
            status: 301,
            data: tokenData.user,
            msg: 'Waiting for permission'
        })
    }

    return res.json({
        success: false,
        status: 300,
        msg: 'Waiting for scanning'
    })
}

export { POST_Register, POST_Login, GET_Verify, GET_LoginQR, POST_LoginQR, GET_CheckLoginQR, GET_AnswerPermissionLoginQR };
