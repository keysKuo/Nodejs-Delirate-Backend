import stripeAPI from 'stripe';
import dotenv from 'dotenv';
import Order from '../resources/Order/Model.js';


dotenv.config();

let stripeGateway = stripeAPI(process.env.STRIPE_API_KEY);
let clientUrl = process.env.CLIENT_URL || '';

async function createStripeSession(order_id) {
    try {
        const items = await Order.findById(order_id)
            .populate({ path: 'items', populate: { path: 'info' } })
            .then((order) => order.items)
            .catch((err) => {});

        const lineItems = items.map((item) => {
            const unitAmount = item.price * 100;

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.info.model,
                        images: ['https://react.semantic-ui.com/images/wireframe/square-image.png'],
                    },
                    unit_amount: unitAmount,
                },
                quantity: item.qty,
            };
        });

        const session = await stripeGateway.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${clientUrl}/stripe-success?order_id=${order_id}`,
            cancel_url: `${clientUrl}/fail`,
            line_items: lineItems,
            //  Asking address in Stripe
            billing_address_collection: 'required',
        });
        console.log('6.Stripe Payment Created');

        return session.url;
    } catch (error) {
        return undefined;
    }
}

export default createStripeSession;
