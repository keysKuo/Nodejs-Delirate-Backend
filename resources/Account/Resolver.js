import Account from './Model.js';
import OTP from '../OTP/Model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendMail, QRCODE } from 'sud-libs';
import { mailForm } from '../../utils/index.js';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY || 'nkeyskuo'

const auth = {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_PASSWORD
}

async function POST_Register(req, res, next) {
    const { username, password, password_confirm, fullname, email, role } = req.body;

    if(password != password_confirm) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Password not same'
        })
    }
    
    const my_account = await Account.findOne({ username });
    
    if(my_account) {
        return res.json({
            success: false,
            status: 300,
            msg: 'This username or email is existed',
        })
    }
    else {
        bcrypt.hash(password, 10, async function(error, hashed_password) {
            if(error) {
                return res.json({
                    success: false,
                    status: 501,
                    msg: error
                });
            }

            try {
                let new_account = await new Account({
                    username: username,
                    password: hashed_password,
                    fullname: fullname,
                    email: email,
                    role: role,
                }).save();

                // Encode URL
                const token = jwt.sign({id:new_account._id}, secretKey);
                const qrcode = await QRCODE(`http://localhost:8080/account/verified/${token}`);
                
                // Send mail verified
                const options = {
                    from: auth.user,
                    to: email,
                    subject: 'Thông tin tài khoản từ Delirate',
                    text: `Xin chào ${fullname}`,
                    attachDataUrls: true,
                    html: mailForm({
                        logo_link: process.env.LOGO_LINK || '',
                        caption: `Xác thực tài khoản từ Delirate`,
                        content: 
                        `
                            <img src="${qrcode}" />
                            <h5>Vui lòng quét QR code để xác thực tài khoản</h5>
                        `
                    })
                };

                sendMail(auth, options, (err) => {
                    console.log(err);
                })

                return res.json({
                    success: true,
                    status: 200,
                    msg: 'Account registed'
                })
            }
            catch (err) {
                return res.json({
                    success: false,
                    status: 500,
                    msg: err
                })
            }       
        })
    }
}

async function POST_Login(req, res, next) {
    const { username, password } = req.body;

    const my_account = await Account.findOne({username}).lean();
    
    if(!my_account) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Account invalid'
        })
    }
    else {
        if(my_account.status !== 'activated') {
            return res.json({
                success: false,
                status: 300,
                msg: 'Account not activated'
            })
        }
        
        bcrypt.compare(password, my_account.password, async function(error, result) {
            if(error) {
                return res.json({
                    success: false,
                    status: 501,
                    msg: error
                })
            }

            if(result) {
                const code = Math.floor(Math.random() * (9999 - 1000) + 1000);
                const token = jwt.sign({user: my_account, code: code}, secretKey);
                
                await new OTP({
                    email: my_account.email,
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
                        `
                    })
                };
            
                sendMail(auth, options, (err) => {
                    if(err)
                        console.log(err);
                });
            
                return res.json({
                    success: true,
                    status: 200,
                    msg: 'OTP sent',
                    token: token
                })

            }
            else {
                return res.json({
                    success: false,
                    status: 300,
                    msg: 'Incorrect password',
                })
            }
        })
    }
}

async function GET_Verify(req, res, next) {
    const { token } = req.params;

    jwt.verify(token, secretKey, async (error, decoded) => {
        if (error) {
            return res.json({
                success: false,
                status: 500,
                msg: error,
            });
        }

        return await Account.findByIdAndUpdate(decoded.id, { $set: { status: 'activated' } })
            .then((account) => {
                return res.json({
                    success: true,
                    status: 200,
                    msg: 'Account verified',
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