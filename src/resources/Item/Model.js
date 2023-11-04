import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Item = new Schema({
    item_id: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    desc: { type: String, required: true },
    brand: { type: String, required: true },
    origin: { type: String, required: true },
    image: { type: String, required: true },
    distributor: { type: String, required: true }
},
{
    timestamps: true
})

export default mongoose.model('Item', Item);