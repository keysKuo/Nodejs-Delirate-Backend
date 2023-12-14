import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Checkout = new Schema({
    caption: { type: String, required: true },
    trade_code: { type: String, required: true },
    ISBN_code: { type: String, required: true },
    status: { type: String, required: true, enum: ['Waiting', 'Completed', 'Canceled']},
},
{
    timestamps: true
})

export default mongoose.model('Checkout', Checkout);