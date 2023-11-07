import dotenv from 'dotenv';
import { encryptAES, decryptAES, loadContract, mailForm } from '../../utils/index.js';
import Order from './Model.js';
import Customer from '../Customer/Model.js';
import {  sendMail } from 'sud-libs';
import QRCODE from 'qrcode';

dotenv.config();

const auth = {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_PASSWORD,
};

async function POST_CheckOut(req, res, next) {
    const { payment_type } = req.body;

    if(payment_type === 'Cash') {
        next();
    }
}

/**
 * Description: Create a new Order
 * Request:     POST /order/create
 * Send:        JSON data which contains items, name, phone, email, address , note, total_cost, payment_type
 * Receive:     200 if success, otherwise fail
 */
async function POST_CreateOrder(req, res, next) {
    const { items, name, phone, email, address , note, total_cost, payment_type } = req.body;

    try {
        let exist_customer = await Customer.findOne({
            email
        })
        
        let customer = exist_customer || await new Customer({
            name, phone, email, address
        }).save();
    
        if(!customer) {
            return res.json({
                success: false,
                status: 400,
                msg: 'Error create customer'
            })
        }
    
        let order = await new Order({
            ISBN_code: 'QC' + Math.floor(Math.random() * (9999999 - 1000000) + 1000000),
            items, customer, note, total_cost, payment_type,
            status: payment_type !== 'Cash' ? 'Confirmed' : 'Requested'
        }).save();
    
        if(!order) {
            return res.json({
                success: false,
                status: 400,
                msg: 'Error create order',
            });
        }

        return res.json({
            success: true,
            status: 200,
            msg: 'Order Created',
            data: order
        })
    } 
    catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: error
        })
    }
}

/**
 * Description: Get order information
 * Request:     GET /order/get_order_info/:code
 * Send:        JSON data which is ISBN_code as params
 * Receive:     200 if success, otherwise fail
 */
async function GET_OrderInfo(req, res, next) {
    
    const { code } = req.params;
    
    let order = await Order.findOne({ ISBN_code: code })
        .select({ _id: 0, __v: 0 })
        .populate({
            path: 'items',
            select: '-_id -__v',
            populate: { path: 'info', select: '-item_id -_id -__v -updatedAt -createdAt' },
        })
        .lean();

    // console.log(encrypted);
    // let encrypted = encryptAES(code, 'nkeyskuo');
    // let qrcode = await QRCODE.toDataURL(encrypted);

    // const options = {
    //     from: auth.user,
    //     to: 'nkeyskuo124@gmail.com',
    //     subject: 'Xác thực tài khoản từ Delirate',
    //     text: `Xin chào nkeys`,
    //     attachDataUrls: true,
    //     html: mailForm({
    //         logo_link: process.env.LOGO_LINK || '',
    //         caption: `Xác thực tài khoản từ Delirate`,
    //         content: `
    //             <img src="${qrcode}" />
    //         `
    //     }),
    // };

    // sendMail(auth, options, (err) => {
    //     if (err) console.log(err);
    // });

    return res.json({
        success: true,
        status: 200,
        msg: 'Order found',
        data: order,
    })
}




/**
 * Description: Get orders by customer
 * Request:     GET /order/get_orders_by_customer/:customer_id
 * Send:        JSON data which is customer_id as params
 * Receive:     200 if success, otherwise fail
 */
async function GET_OrdersByCustomer(req, res, next) {
    const { customer_id } = req.params;
    
    let orders = await Order.find({ customer: customer_id }).lean();

    return res.json({
        success: true,
        status: 200,
        msg: 'Orders found',
        data: orders
    })
}

export { POST_CreateOrder, GET_OrderInfo, GET_OrdersByCustomer, POST_CheckOut }