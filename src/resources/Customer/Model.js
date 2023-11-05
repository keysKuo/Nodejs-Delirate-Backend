import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Customer = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
},
{
    timestamps: true
})

export default mongoose.model('Customer', Customer);