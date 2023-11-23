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
import { loadContract } from './utils/index.js';

const app = express();
const PORT = process.env.SERVER_PORT || 8080;
database.connect();

import stripeAPI from "stripe";
import { GET_NearPaymentQR, POST_NearPaymentQR } from './resources/Account/Resolver.js';

app.use(cors());
app.use(useragent.express());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('src/public'));
app.use(express.json());
app.use(cookie('Origin'));
app.use(session({
    secret: 'nkeyskuo',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30000000 }
}))

router(app);

// const stripeGateway = stripeAPI('sk_test_51OEv6lLqoSvXr7Wa201ij0m5aWuB2CjGg3g32szb8grLYHwPShQFSyeeroV8n8ajzFVrJxBPB2FekYFq4AYROscc00nCuvAKGi');
let stripeGateway = stripeAPI(process.env.stripe_api);
let DOMAIN = process.env.CLIENT_URL || 'http://192.168.1.7:3000';
let SERVER_DOMAIN = process.env.SERVER_URL || 'http://192.168.1.7:8080' 

app.post('/checkout', async (req, res) => {
    const { store_id, name, email, phone, address, note, items, total_price, payment_type } = req.body;
    
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

        let store = await Account.findOne({_id: store_id, role: 'retailer'}).lean();
        if(!store) {
            return res.json({
                success: false,
                status: 404,
                msg: 'Error not found store'
            })
        }
        
        let order = await new Order({
            ISBN_code: 'QC' + Math.floor(Math.random() * (9999999 - 1000000) + 1000000),
            items: items.map(item => {
                return {
                    info: item._id,
                    qty: item.quantity,
                    price: item.price
                }
            }),
            customer, note, total_price, payment_type, store,
            status: payment_type !== 'Cash' ? 'Confirmed' : 'Requested'
        }).save();
    
        if(!order) {
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
                _note: "Created delivery",
                _image: "https://picsum.photos/100/100",
                _location: "Store address",
                _track_signer: store_id,
            },
        });
        
        var url = `${DOMAIN}/success`
        console.log('pass contract');


        if(payment_type === 'Banking') {
            const lineItems = items.map((item) => {
                const unitAmount = item.price * 100;
        
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.model,
                            images: ['https://react.semantic-ui.com/images/wireframe/square-image.png']
                        },
                        unit_amount: unitAmount, 
                    },
                    quantity: item.quantity,
                };
            });
        
            const session = await stripeGateway.checkout.sessions.create({
                payment_method_types: ['card'], 
                mode: 'payment',
                success_url: `${DOMAIN}/stripe-success?order_id=${order._id}`,
                cancel_url: `${DOMAIN}/fail`,
                line_items: lineItems,
                //  Asking address in Stripe
                billing_address_collection: 'required'
            });
            console.log('pass stripe')

            url = session.url;
        }else if(payment_type === 'Crypto') {
            return res.redirect(`/near-payment?receiver=nkeyskuo196.testnet&order_id=${order._id}&amount=2`)
        }

        return res.json({
            success: true,
            status: 200,
            msg: 'Order Created',
            order_id: order._id,
            url: url
        })
    } 
    catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: error
        })
    }
});

app.put('/stripe-success', async (req, res, next) => {
    const { order_id } = req.query;

    await Order.findByIdAndUpdate(order_id, { $set: { status: 'Paid'} })
        .then(order => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Stripe paid'
            })
        })
        .catch(err => {
            return res.json({
                success: false,
                status: 404,
                msg: 'Stripe unpaid'
            })
        })
})

app.get('/near-payment', GET_NearPaymentQR)
app.post('/near-payment', POST_NearPaymentQR)





app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})