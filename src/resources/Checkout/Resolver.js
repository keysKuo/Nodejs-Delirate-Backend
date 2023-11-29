import dotenv from 'dotenv';
dotenv.config();

import Checkout from './Model.js';

async function POST_CreateCheckout(req, res, next) {
    const order_id = req.order_id;
    
    let checkout = await new Checkout({
        caption: 'Delirate checkout',
        trade_code: Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000),
        order: order_id,
        status: 'Waiting'
    }).save();

    if(checkout) {
        return res.json({
            success: true,
            status: 200,
            msg: 'Order Created'
        })
    }

    return res.json({
        success: false,
        status: 500,
        msg: 'Error occurred'
    })
}

async function GET_CheckoutInfo(req, res, next) {
    const { order_id } = req.params;

    let checkout = await Checkout.findOne({order: order_id})
    .populate({path: 'order'})
    .lean();

    if(checkout) {
        return res.json({
            success: true,
            status: 200,
            data: checkout
        })
    }

    return res.json({
        success: false,
        status: 404,
        msg: 'Checkout not found'
    })
}

export { POST_CreateCheckout, GET_CheckoutInfo }