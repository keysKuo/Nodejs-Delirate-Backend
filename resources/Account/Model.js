import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Account = new Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		fullname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		role: { type: String, required: true },
		status: { type: String, default: 'unverified' },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Account', Account);