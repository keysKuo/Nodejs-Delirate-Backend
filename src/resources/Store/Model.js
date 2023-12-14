import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Store = new Schema({
    owner: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, required: true},
    banner: { type: String, required: true },
    introduce: { type: String},
    tax_no: { type: String, required: true }
},
{
    timestamps: true
})

export default mongoose.model('Store', Store);