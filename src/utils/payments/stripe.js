import stripeAPI from 'stripe';
import dotenv from 'dotenv';
import Order from '../../resources/Order/Model.js';


dotenv.config();

let stripeGateway = stripeAPI(process.env.STRIPE_API_KEY);
let clientUrl = process.env.CLIENT_URL || '';

async function createStripeSession(code) {
    try {
        var items = []
            await Order.find({ISBN_code: code})
                .populate({ path: 'items', populate: { path: 'info' } })
                .then((orders) => orders.forEach(order => {
                    order.items.forEach(item => {
                        items.push(item);
                    })
                }))
                .catch((err) => {});
        
        // console.log(items);
        const lineItems = items.map((item) => {
            const unitAmount = Math.round(item.price * 100);

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
            success_url: `${clientUrl}/stripe-success?code=${code}`,
            cancel_url: `${clientUrl}/fail`,
            line_items: lineItems,
            //  Asking address in Stripe
            billing_address_collection: 'required',
        });
        console.log('6.Stripe Payment Created');

        return session.url;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

export default createStripeSession;
