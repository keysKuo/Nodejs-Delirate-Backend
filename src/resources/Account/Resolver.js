import Account from './Model.js';
import OTP from '../OTP/Model.js';
import Order from '../Order/Model.js';
import Checkout from '../Checkout/Model.js';
import Customer from '../Customer/Model.js';
import Store from '../Store/Model.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendMail } from 'sud-libs';
import QRCode from 'qrcode';
import { hashBcrypt, hashSHA256 } from '../../utils/crypto/crypto.js';
import { mailForm, loadContract, getAccountBalance, sendNear } from '../../utils/index.js';
import dotenv from 'dotenv';
import createStripeSession from '../../utils/payments/stripe.js';

dotenv.config();

const apiUrl = process.env.API_URL || 'http://192.168.1.7:8080';
const secretKey = process.env.SECRET_KEY || 'nkeyskuo';

const auth = {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_PASSWORD,
};

async function POST_Register(req, res, next) {
    const { email, password, password_confirm, name, location, phone, role, folder } = req.body;

    const file = req.file;
    if (!file) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Image file not found',
        });
    }

    if (!email.includes('@')) {
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

    if (password.length < 6) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Password at least 6 characters',
        });
    }

    if (phone.length != 10) {
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
            hashed_email: hashSHA256(email),
            password: hashBcrypt(password),
            avatar: folder + '/' + file.filename,
        }).save();

        await new Customer({
            email,
            name,
            address: location,
            phone,
        }).save();

        // Encode URL
        const token = jwt.sign({ id: new_account._id }, secretKey);
        const qrcode = await QRCode.toDataURL(`${apiUrl}/account/verify?token=${token}`);

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
                    <img src="${qrcode}" />
                    <h5>Vui lòng quét QR code để xác thực tài khoản</h5>
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

async function POST_Login(req, res, next) {
    const { email, password } = req.body;

    const my_account = await Account.findOne({ email }).populate({ path: 'store' }).lean();

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

    let customer = await Customer.findOne({ email: my_account.email }).then(async (customer) => {
        if (customer) {
            return customer;
        }

        return await new Customer({
            name: my_account.name,
            email: my_account.email,
            address: my_account.location,
            phone: my_account.phone,
        }).save();
    });

    // Generate OTP and Send OTP
    const user_info = {
        email: my_account.email,
        hashed_email: my_account.hashed_email,
        name: my_account.name,
        avatar: apiUrl + '/uploads' + my_account.avatar,
        location: my_account.location,
        phone: my_account.phone,
        role: my_account.role,
        customer_id: customer._id,
    };

    if (my_account.role === 'retailer') {
        user_info['store'] = my_account.store;
    }

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
        if (err) {
            return res.json({
                success: false,
                status: 500,
                msg: 'Error generating QRCODE',
            });
        }

        return res.json({
            success: true,
            status: 200,
            token: token,
            data: url,
        });
    });
}

async function POST_LoginQR(req, res, next) {
    const { token } = req.query;
    const tokenData = tokens[token];
    const { email } = req.body;
    const expiresIn = 300;

    if (!tokenData) {
        return res.json({
            success: false,
            status: 400,
            msg: 'Invalid token',
        });
    }

    const timeElapsed = (Date.now() - tokenData.createdAt) / 1000;
    if (timeElapsed > expiresIn) {
        delete tokens[token];
        return res.json({
            success: false,
            status: 400,
            msg: 'Token expired',
        });
    }

    let my_account = await Account.findOne({ email }).populate({ path: 'store' }).lean();

    let customer = await Customer.findOne({ email: my_account.email }).then(async (customer) => {
        if (customer) {
            return customer;
        }

        return await new Customer({
            name: my_account.name,
            email: my_account.email,
            address: my_account.location,
            phone: my_account.phone,
        }).save();
    });

    const user_info = {
        email: my_account.email,
        hashed_email: my_account.hashed_email,
        name: my_account.name,
        avatar: apiUrl + '/uploads' + my_account.avatar,
        location: my_account.location,
        phone: my_account.phone,
        role: my_account.role,
        customer_id: customer._id,
    };

    if (my_account.role === 'retailer') {
        user_info['store'] = my_account.store;
    }

    // tokens[token].verify = true;
    tokens[token].user = user_info;
    return res.json({
        success: true,
        status: 200,
        agent: tokenData.agent,
        token: token,
        msg: 'Authenticated Login',
    });
}

async function GET_AnswerPermissionLoginQR(req, res, next) {
    const { token, verify } = req.query;

    if (verify === 'true') {
        tokens[token].verify = true;
        return res.json({
            success: true,
            status: 200,
            token: token,
            msg: 'Login verified',
        });
    } else {
        delete tokens[token];
        return res.json({
            success: false,
            status: 400,
            msg: 'Login rejected',
        });
    }
}

async function GET_CheckLoginQR(req, res, next) {
    const { token } = req.query;
    const tokenData = tokens[token];

    if (!tokenData) {
        return res.json({
            success: false,
            status: 400,
            msg: 'Login rejected',
        });
    }

    if (tokenData.verify) {
        return res.json({
            success: true,
            status: 200,
            data: tokenData.user,
            msg: 'Login successfully',
        });
    }

    if (tokenData.user) {
        return res.json({
            success: false,
            status: 301,
            data: tokenData.user,
            msg: 'Waiting for permission',
        });
    }

    return res.json({
        success: false,
        status: 300,
        msg: 'Waiting for scanning',
    });
}

async function GET_AccountBalance(req, res, next) {
    let balance = await getAccountBalance();
    if (balance) {
        return res.json({
            success: true,
            status: 200,
            balance: balance.available,
        });
    }

    return res.json({
        success: false,
        status: 500,
        msg: 'Balance not found',
    });
}

async function GET_NearPaymentQR(req, res, next) {
    const { code, amount } = req.query;
    const token = crypto.randomBytes(20).toString('hex');
    tokens[token] = { createdAt: Date.now() };

    const nearPaymentUrl = `${apiUrl}/near-payment?code=${code}&amount=${amount}&token=${token}`;

    return QRCode.toDataURL(nearPaymentUrl, (err, url) => {
        if (err) {
            return res.json({
                success: false,
                status: 500,
                msg: 'Error generating QRCODE',
            });
        }

        console.log('6.Near Payment Created');
        return res.json({
            success: true,
            status: 200,
            token: token,
            code: code,
            url: url,
        });
    });
}

async function PUT_NearPaymentQR(req, res, next) {
    const { code, amount, token } = req.query;
    const tokenData = tokens[token];
    const expiresIn = 900;

    try {
        if (!tokenData) {
            return res.json({
                success: false,
                status: 400,
                msg: 'Invalid token',
            });
        }

        const timeElapsed = (Date.now() - tokenData.createdAt) / 1000;
        if (timeElapsed > expiresIn) {
            delete tokens[token];
            return res.json({
                success: false,
                status: 400,
                msg: 'Token expired',
            });
        }

        let receipt = await sendNear();
        if (!receipt) {
            return res.json({
                success: false,
                status: 501,
                msg: 'Fail to send Near',
            });
        }

        await Order.updateMany({ISBN_code: code}, { status: 'Paid' });
        await Checkout.findOneAndUpdate({ISBN_code: code}, { $set: { status: 'Completed' } });

        console.log('7.Near Payment Success');
        delete tokens[token];
        return res.json({
            success: true,
            status: 200,
            msg: 'Near Payment Success',
            receipt,
        });
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: 'Near Payment Fail',
        });
    }
}

async function GET_StripePaymentGateway(req, res, next) {
    const { code } = req.query;

    const stripe_url = await createStripeSession(code);
    // console.log(stripe_url)
    if (stripe_url) {
        return res.json({
            success: true,
            status: 200,
            msg: 'Order Created',
            code: code,
            url: stripe_url,
        });
    }

    return res.json({
        success: false,
        status: 500,
        msg: 'Error while creating stripe payment',
    });
}

async function PUT_StripePaymentGateWay(req, res, next) {
    const { code } = req.query;
    let orders = await Order.updateMany({ ISBN_code: code, status: 'Confirmed' }, { status: 'Paid' } );

    if (orders) {
        let checkout = await Checkout.findOneAndUpdate({ ISBN_code: code }, { $set: { status: 'Completed' } });
        if (checkout) {
            console.log('7.Stripe Payment Success');
            return res.json({
                success: true,
                status: 200,
                msg: 'Stripe Payment Success',
            });
        }

        return res.json({
            success: false,
            status: 404,
            msg: 'Stripe Payment Fail',
        });
    }

    return res.json({
        success: false,
        status: 404,
        msg: 'Stripe unpaid',
    });
}

export {
    GET_StripePaymentGateway,
    PUT_StripePaymentGateWay,
    GET_AccountBalance,
    GET_NearPaymentQR,
    PUT_NearPaymentQR,
    POST_Register,
    POST_Login,
    GET_Verify,
    GET_LoginQR,
    POST_LoginQR,
    GET_CheckLoginQR,
    GET_AnswerPermissionLoginQR,
};
