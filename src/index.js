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
import morgan from 'morgan';
dotenv.config();

import Customer from './resources/Customer/Model.js';
import Order from './resources/Order/Model.js';
import Account from './resources/Account/Model.js';
import Checkout from './resources/Checkout/Model.js';
import Item from './resources/Item/Model.js';

import { loadContract, sendNear } from './utils/index.js';

const app = express();
const PORT = process.env.SERVER_PORT || 8080;
database.connect();

import stripeAPI from 'stripe';
import {
    GET_NearPaymentQR,
    GET_StripePaymentGateway,
    PUT_NearPaymentQR,
    PUT_StripePaymentGateWay,
} from './resources/Account/Resolver.js';

app.use(cors());
app.use(useragent.express());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src/public'));
app.use(express.json());
app.use(cookie('Origin'));
app.use(morgan('dev'));
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

function groupByField(arr, field) {
    return arr.reduce((groups, item) => {
        const key = item[field];
        (groups[key] = groups[key] || []).push(item);
        return groups;
    }, {});
}

app.post('/checkout', async (req, res) => {
    const { name, email, phone, address, note, items, total_price, payment_type } = req.body;
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
        let packages = groupByField(items, 'store')
        
        // return res.json(packages)
        console.log('2.Checked Store Info');

        const ISBN_code = 'QC' + Math.floor(Math.random() * (99999999 - 10000000) + 10000000);

        for (const key in packages) {
            var total = 0;
            await new Order({
                ISBN_code: ISBN_code,
                items: packages[key].map(item => {
                    total += item.price;
                    return {
                        info: item._id,
                        qty: item.quantity,
                        price: item.price
                    }
                }),
                customer,
                note,
                payment_type,
                total_price: (total * 1.1).toFixed(2),
                store: key,
                status: payment_type !== 'Cash' ? 'Confirmed' : 'Requested',
            }).save()
        };

        console.log('3.Order Created');

        // Create new Checkout
        let checkout = await new Checkout({
            caption: 'Delirate checkout',
            trade_code: Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000),
            ISBN_code: ISBN_code,
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
                _isbn_code: ISBN_code, // FK order _isbn_code
                _sender: "Delirate",
                _receiver: customer._id,
                _status: "Ready",
                _note: 'Package delivered',
                _image: '',
                _location: 'Store address',
                _track_signer: "nkeyskuo196@testnet",
            },
        });
        console.log('5.Delivery Created');

        // Handle Payment Type
        if (payment_type === 'Cash') {
            return res.json({
                success: true,
                status: 200,
                msg: 'Order Created',
                code: ISBN_code,
                url: `${clientUrl}/success`,
            });
        } else if (payment_type === 'Banking') {
            return res.redirect(`/stripe-payment?code=${ISBN_code}`);
        } else if (payment_type === 'Crypto') {
            return res.redirect(
                `/near-payment?code=${ISBN_code}&amount=${(total_price * 0.9).toFixed(2)}`,
            );
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

app.get('/test_sendNear', async (req, res, next) => {
    const result = await sendNear();

    return res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
