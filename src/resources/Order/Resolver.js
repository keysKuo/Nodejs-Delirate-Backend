import dotenv from 'dotenv';
import { encryptAES } from '../../utils/crypto/crypto.js';
import Order from './Model.js';
import Customer from '../Customer/Model.js';
import Account from '../Account/Model.js';
import { loadContract } from '../../utils/index.js';

dotenv.config();

const apiUrl = process.env.API_URL || 'http://192.168.1.7:8080';
const secretKey = 'nkeyskuo';

const auth = {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_PASSWORD,
};

async function POST_CheckOut(req, res, next) {
    const { payment_type } = req.body;

    if (payment_type === 'Cash') {
        next();
    }
}

/**
 * Description: Create a new Order
 * Request:     POST /order/create
 * Send:        JSON data which contains items, name, phone, email, address , note, total_price, payment_type
 * Receive:     200 if success, otherwise fail
 */
async function POST_CreateOrder(req, res, next) {
    const { store_id, items, name, phone, email, address, note, total_price, payment_type } = req.body;

    try {
        let exist_customer = await Customer.findOne({
            email,
        });

        let customer =
            exist_customer ||
            (await new Customer({
                name,
                phone,
                email,
                address,
            }).save());

        if (!customer) {
            return res.json({
                success: false,
                status: 400,
                msg: 'Error create customer',
            });
        }

        let store = await Account.findOne({ _id: store_id, role: 'retailer' }).lean();

        if (!store) {
            return res.json({
                success: false,
                status: 404,
                msg: 'Error not found store',
            });
        }

        let order = await new Order({
            ISBN_code: 'QC' + Math.floor(Math.random() * (9999999 - 1000000) + 1000000),
            items,
            customer,
            note,
            total_price,
            payment_type,
            store,
            status: payment_type !== 'Cash' ? 'Confirmed' : 'Requested',
        }).save();

        if (!order) {
            return res.json({
                success: false,
                status: 400,
                msg: 'Error create order',
            });
        }

        const contract = await loadContract();
        await contract.create_delivery({
            args: {
                _isbn_code: order.ISBN_code, // FK order _isbn_code
                _sender: store_id,
                _receiver: customer._id,
                _status: order.status,
                _note: 'Created delivery',
                _image: 'https://picsum.photos/100/100',
                _location: 'Store address',
                _track_signer: store_id,
            },
        });

        console.log('pass contract');
        req.order_id = order._id;
        next();
        // return res.json({
        //     success: true,
        //     status: 200,
        //     msg: 'Order Created',
        //     data: order
        // })
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: error,
        });
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
    });
}

/**
 * Description: Get orders by customer
 * Request:     GET /order/get_orders_by_customer/:customer_id
 * Send:        JSON data which is customer_id as params
 * Receive:     200 if success, otherwise fail
 */
async function GET_OrdersByCustomer(req, res, next) {
    const { customer_id } = req.params;
    console.log(customer_id);
    let orders = await Order.find({ customer: customer_id })
        .select({ _id: 0, __v: 0 })
        .populate({
            path: 'items',
            select: '-_id -__v',
            populate: { path: 'info', select: '-item_id -_id -desc -__v -updatedAt -createdAt' },
        })
        .populate({
            path: 'store',
            select: 'name location createdAt',
        })
        .populate({
            path: 'customer',
        })
        .sort({ createdAt: -1 })
        .lean();

    orders = orders.map((order) => {
        let encrypted = encryptAES(apiUrl + `/order/get_order_info/${order.ISBN_code}`, secretKey);
        return {
            ...order,
            link: encrypted,
            createdDate: order.createdAt.toLocaleDateString('vi-vn'),
            createdDateTime: order.createdAt.toLocaleString('vi-vn')
        };
    });

    return res.json({
        success: true,
        status: 200,
        msg: 'Orders found',
        data: orders,
    });
}

async function GET_VerifyOrigin(req, res, next) {
    const { code } = req.params;

    try {
        const contract = await loadContract();
        let delivery_info = await contract.get_delivery_info({
            _isbn_code: code,
        });

        const items = await Order.findOne({ ISBN_code: code })
            .select({ items: 1 })
            .populate({ path: 'items', populate: 'info' })
            .then((order) => {
                return order.items;
            });

        return res.json({
            success: true,
            status: 200,
            data: {
                ...delivery_info,
                items: items,
            },
        });
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            msg: error,
            data: {},
        });
    }
}

async function PUT_UpdateOrder(req, res, next) {
    const { code } = req.params;
    const { status, note, location, track_signer } = req.body;

    // const file = req.file;
    // if(!file) {
    //     return res.json({
    //         success: false,
    //         status: 300,
    //         msg: 'Image not found'
    //     })
    // }

    try {
        let order = await Order.findOne({ ISBN_code: code });
        order.status = status || order.status;
        await order.save();

        const contract = await loadContract();
        await contract.tracking_delivery({
            args: {
                _isbn_code: code,
                _status: status,
                _note: note,
                _image: 'file.filename',
                _location: location,
                _track_signer: track_signer,
            },
        });

        return res.json({
            success: true,
            status: 200,
            msg: 'Tracking success',
        });
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: 'Tracking fail',
        });
    }
}

// For Store's Admin only
async function GET_OrdersInfoByStore(req, res, next) {
    const { store_id } = req.params;

    let orders = await Order.find({ store: store_id })
        .select({ _id: 0, __v: 0 })
        .populate({
            path: 'items',
            select: '-_id -__v',
            populate: { path: 'info', select: '-item_id -_id -__v -updatedAt -createdAt' },
        })
        .populate({
            path: 'store',
            select: 'name location createdAt',
        })
        .populate({
            path: 'customer',
        })
        .sort({ createdAt: -1 })
        .lean();

    orders = orders.map((order) => {
        let encrypted = encryptAES(apiUrl + `/order/verify_origin/${order.ISBN_code}`, secretKey);
        return {
            ...order,
            link: encrypted,
            createdAt: order.createdAt.toLocaleString('vi-vn'),
        };
    });

    return res.json({
        success: true,
        status: 200,
        data: orders,
    });
}

export {
    POST_CreateOrder,
    GET_OrderInfo,
    GET_OrdersByCustomer,
    POST_CheckOut,
    GET_VerifyOrigin,
    PUT_UpdateOrder,
    GET_OrdersInfoByStore,
};
