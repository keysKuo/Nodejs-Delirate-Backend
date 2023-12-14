import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Item = new Schema({
    sku: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    desc: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, default: 0},
    origin: { type: String, required: true },
    image: { type: String, required: true },
    distributor: { type: mongoose.Types.ObjectId, ref: 'Store', required: true }
},
{
    timestamps: true
})

export default mongoose.model('Item', Item);