import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Account = new Schema(
	{
		email: { type: String, required: true, unique: true },
		hashed_email: { type: String, required: true},
		avatar: { type: String },
		password: { type: String, required: true },
		name: { type: String, required: true },
		location: { type: String, required: true },
		phone: { type: String, required: true },
		role: { type: String, required: true },
		status: { type: String, default: 'unverified' },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Account', Account);