import { GET_OrderInfo, POST_CreateOrder, GET_OrdersByCustomer, PUT_UpdateOrder, GET_OrdersInfoByStore, GET_VerifyOrigin } from "./Resolver.js";
import express from 'express';
import Order from './Model.js';
import { POST_CreateCheckout } from "../Checkout/Resolver.js";

const router = express.Router();

router.post('/create', POST_CreateOrder, POST_CreateCheckout);
router.get('/get_order_info/:code', GET_OrderInfo);
router.get('/get_orders_by_customer/:customer_id', GET_OrdersByCustomer);
router.get('/get_orders_by_store/:store_id', GET_OrdersInfoByStore);
router.put('/tracking_delivery/:id', PUT_UpdateOrder);

router.get('/check-payment/:id', async (req, res, next) => {
    const { id } = req.params;

    await Order.findById(id)
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

router.get('/verify_origin/:code', GET_VerifyOrigin);

export default router