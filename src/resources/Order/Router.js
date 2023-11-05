import { GET_OrderInfo, POST_CreateOrder, GET_OrdersByCustomer } from "./Resolver.js";
import express from 'express';

const router = express.Router();

router.post('/create', POST_CreateOrder);
router.get('/get_order_info/:code', GET_OrderInfo);
router.get('/get_orders_by_customer/:customer_id', GET_OrdersByCustomer);

export default router