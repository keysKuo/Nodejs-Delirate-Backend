import express from 'express';
import cookie from 'cookie-parser';
import session from 'express-session';
// import { dirname } from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './config/database.js';
import router from './resources/routes.js';
import bodyParser from 'body-parser';
import useragent from 'express-useragent';
dotenv.config();

import Customer from './resources/Customer/Model.js';
import Order from './resources/Order/Model.js';
import Account from './resources/Account/Model.js';
import Checkout from './resources/Checkout/Model.js';
import { loadContract } from './utils/index.js';

const app = express();
const PORT = process.env.SERVER_PORT || 8080;
database.connect();

import stripeAPI from 'stripe';
import { GET_NearPaymentQR, GET_StripePaymentGateway, PUT_NearPaymentQR, PUT_StripePaymentGateWay } from './resources/Account/Resolver.js';

app.use(cors());
app.use(useragent.express());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src/public'));
app.use(express.json());
app.use(cookie('Origin'));
app.use(
    session({
        secret: 'nkeyskuo',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 30000000 },
    }),
);

router(app);

// const stripeGateway = stripeAPI('sk_test_51OEv6lLqoSvXr7Wa201ij0m5aWuB2CjGg3g32szb8grLYHwPShQFSyeeroV8n8ajzFVrJxBPB2FekYFq4AYROscc00nCuvAKGi');
let stripeGateway = stripeAPI(process.env.stripe_api);
let clientUrl = process.env.CLIENT_URL || 'http://192.168.1.7:3000';


async function HandleInfoCustomer(name, email, phone, address) {
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

    return customer;
}

// async function HandleStripeAPI(items, order_id, clientUrl) {
//     const lineItems = items.map((item) => {
//         const unitAmount = item.price * 100;

//         return {
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name: item.model,
//                     images: ['https://react.semantic-ui.com/images/wireframe/square-image.png'],
//                 },
//                 unit_amount: unitAmount,
//             },
//             quantity: item.quantity,
//         };
//     });

//     const session = await stripeGateway.checkout.sessions.create({
//         payment_method_types: ['card'],
//         mode: 'payment',
//         success_url: `${clientUrl}/stripe-success?order_id=${order_id}`,
//         cancel_url: `${clientUrl}/fail`,
//         line_items: lineItems,
//         //  Asking address in Stripe
//         billing_address_collection: 'required',
//     });
//     console.log('6.Stripe Payment Created');

//     return session.url;
// }

app.post('/checkout', async (req, res) => {
    const { store_id, name, email, phone, address, note, items, total_price, payment_type } = req.body;
    console.log('--------------- Calling Checkout API... -----------------');
    try {
        // Check Customer info
        let customer = await HandleInfoCustomer(name, email, phone, address);

        if (!customer) {
            return res.json({
                success: false,
                status: 500,
                msg: 'Error create customer',
            });
        }
        console.log('1.Checked Customer Info');

        // Check Store info
        let store = await Account.findOne({ _id: store_id, role: 'retailer' }).lean();
        if (!store) {
            return res.json({
                success: false,
                status: 404,
                msg: 'Error not found store',
            });
        }
        console.log('2.Checked Store Info');

        // Create new Order
        let order = await new Order({
            ISBN_code: 'QC' + Math.floor(Math.random() * (9999999 - 1000000) + 1000000),
            items: items.map((item) => {
                return {
                    info: item._id,
                    qty: item.quantity,
                    price: item.price,
                };
            }),
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
        console.log('3.Order Created');

        // Create new Checkout
        let checkout = await new Checkout({
            caption: 'Delirate checkout',
            trade_code: Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000),
            order: order._id,
            status: 'Waiting',
        }).save();

        if (!checkout) {
            return res.json({
                success: false,
                status: 400,
                msg: 'Error create checkout',
            });
        }
        console.log('4.Checkout Created');

        // Create new delivery by contract
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
        console.log('5.Delivery Created');

        // Handle Payment Type
        if(payment_type === 'Cash') {
            return res.json({
                success: true,
                status: 200,
                msg: 'Order Created',
                order_id: order._id,
                url: `${clientUrl}/success`,
            });
        }
        else if (payment_type === 'Banking') {
            return res.redirect(`/stripe-payment?order_id=${order._id}`)
        } 
        else if (payment_type === 'Crypto') {
            return res.redirect(`/near-payment?receiver=nkeyskuo196.testnet&order_id=${order._id}&amount=2`);
        }

        return res.json({
            success: false,
            status: 300,
            msg: 'Payment type Invalid',
        });

    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: error,
        });
    }
});



app.get('/stripe-payment', GET_StripePaymentGateway);
app.put('/stripe-success', PUT_StripePaymentGateWay);

app.get('/near-payment', GET_NearPaymentQR);
app.put('/near-payment', PUT_NearPaymentQR);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
