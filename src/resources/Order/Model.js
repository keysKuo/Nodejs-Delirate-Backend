import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        ISBN_code: { type: String, required: true, unique: true },
        items: [
            {
                info: { type: mongoose.Types.ObjectId, ref: 'Item', required: true },
                qty: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true, default: 0 },
            },
        ],
        store: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
        customer: { type: mongoose.Types.ObjectId, ref: 'Customer', required: true },
        note: { type: String },
        total_price: { type: Number, required: true, default: 0 },
        status: {
            type: String,
            required: true,
            enum: ['Requested', 'Confirmed', 'Paid', 'Transiting', 'Shipping', 'Finished'],
            default: 'Requested'
        },
        payment_type: { type: String, required: true, enum: ['Cash', 'Banking', 'Crypto'] },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Order', Order);