import dotenv from 'dotenv';
import { hashMD5, loadContract } from '../../utils/index.js';
import Order from './Model.js';
import Customer from '../Customer/Model.js';
dotenv.config();


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
    
    let order = await Order.findOne({ ISBN_code: code }).lean();

    return res.json({
        success: true,
        status: 200,
        msg: 'Order found',
        data: order
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