import { GET_OrderInfo, POST_CreateOrder, GET_OrdersByCustomer, PUT_UpdateOrder, GET_OrdersInfoByStore, GET_VerifyOrigin } from "./Resolver.js";
import express from 'express';
import Order from './Model.js';
import { POST_CreateCheckout } from "../Checkout/Resolver.js";
import upload from "../../middlewares/multer.js";

const router = express.Router();

/**
 * Description: Create new Order and Checkout
 * Request:     POST /order/create
 * Send:        JSON object which contains store_id, items, name, phone, email, address , note, total_price, payment_type
 * Receive:     200 if success, otherwise fail
 */
router.post('/create', POST_CreateOrder, POST_CreateCheckout);

/**
 * Description: Get orer info by ISBN_code
 * Request:     GET /order/get_order_info/:code
 * Send:        ISBN code as request params
 * Receive:     Order info if success, otherwise fail
 */
router.get('/get_order_info/:code', GET_OrderInfo);


/**
 * Description: Get orers list by customer_id
 * Request:     GET /order/get_orders_by_customer/:customer_id
 * Send:        Customer id as request params
 * Receive:     Orders list if success, otherwise fail
 */
router.get('/get_orders_by_customer/:customer_id', GET_OrdersByCustomer);


/**
 * Description: Get orers list by store_id
 * Request:     GET /order/get_orders_by_store/:store_id
 * Send:        Store id as request params
 * Receive:     Orders list if success, otherwise fail
 */
router.get('/get_orders_by_store/:store_id', GET_OrdersInfoByStore);


/**
 * Description: Tracking delivery by ISBN code
 * Request:     PUT /order/tracking_delivery/:code
 * Send:        ISBN code as request params
 * Receive:     200 if success, otherwise fail
 */
router.put('/tracking_delivery/:code', upload.single('file'), PUT_UpdateOrder);

/**
 * Description: Verify origin of order by ISBN code
 * Request:     GET /verify_origin/:code
 * Send:        ISBN code as request params
 * Receive:     200 if success, otherwise fail
 */
router.get('/verify_origin/:code/:customer_id', GET_VerifyOrigin);


/**
 * Description: Check payment status
 * Request:     GET /order/check-payment/:id
 * Send:        Order id as request params
 * Receive:     200 if success, otherwise fail
 */
router.get('/check-payment/:code', async (req, res, next) => {
    const { code } = req.params;

    await Order.findOne({ISBN_code: code})
        .then(order => {
            if(order.status === 'Paid') {
                return res.json({
                    success: true,
                    status: 200,
                    msg: 'Order paid'
                })
            }
            
            return res.json({
                success: false,
                status: 300,
                msg: 'Order unpaid'
            })
        })
        .catch(err => {
            return res.json({
                success: false,
                status: 404,
                msg: err
            })
        })
})



export default router