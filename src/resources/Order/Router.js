import { GET_OrderInfo, POST_CreateOrder, GET_OrdersByCustomer, PUT_UpdateOrder, GET_OrdersInfoByStore, GET_VerifyOrigin } from "./Resolver.js";
import express from 'express';

const router = express.Router();

router.post('/create', POST_CreateOrder);
router.get('/get_order_info/:code', GET_OrderInfo);
router.get('/get_orders_by_customer/:customer_id', GET_OrdersByCustomer);
router.get('/get_orders_by_store/:store_id', GET_OrdersInfoByStore);
router.put('/tracking_delivery/:code', PUT_UpdateOrder);

router.get('/verify_origin/:code', GET_VerifyOrigin);

export default router