import Account from './Model.js';
import OTP from '../OTP/Model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendMail, QRCODE } from 'sud-libs';
import { mailForm, hashBcrypt, hashMD5, loadContract } from '../../utils/index.js';
import dotenv from 'dotenv';
dotenv.config();

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

    if (password != password_confirm) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Password not same',
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
        const qrcode = await QRCODE(`https://sud-delirate.onrender.com/account/verify?token=${token}`);

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
                    <img src="${code}" />
                    <h5>Vui lòng quét QR code để xác thực tài khoản</h5>
                `,
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
        hashed_email: my_account.hashed_email,
        name: my_account.name,
        location: my_account.location,
        phone: my_account.phone,
        role: my_account.role,
    };
    const code = Math.floor(Math.random() * (9999 - 1000) + 1000);
    const token = jwt.sign({ user: user_info, code: code }, secretKey);

    await new OTP({
        email: my_account.hashed_email,
        code: code,
    }).save();

    const options = {
        from: auth.user,
        to: my_account.email,
        subject: `${code} Mã xác nhận đăng nhập tài khoản Delirate`,
        html: mailForm({
            caption: 'Mã xác nhận đăng nhập',
            content: ` 
            <h1>${code}</h1>
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
                const contract = await loadContract();

                switch (account.role) {
                    case 'customer':
                        let result_customer = await contract.register_customer({
                            args: {
                                hashed_email: account.hashed_email,
                                name: account.name,
                                phone: account.phone,
                            },
                        });

                        console.log('Customer registed ' + result_customer);
                        break;
                    case 'retailer':
                        let result_retailer = await contract.register_retailer({
                            args: {
                                hashed_email: account.hashed_email,
                                name: account.name,
                                location: account.location,
                            },
                        });

                        console.log('Retailer registed ' + result_retailer);
                        break;
                    default:
                        break;
                }

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

export { POST_Register, POST_Login, GET_Verify };
