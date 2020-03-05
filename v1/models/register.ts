import { Schema, model } from 'mongoose'

const schemaRegister = new Schema({
	name: {
		first: String,
		last: String
	},
	email: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	createAt: {
		type: Date,
		default: Date.now()
	},
	updateAt: {
		type: Date,
		default: Date.now()
	},
	status: Boolean
})

export default model('Register', schemaRegister)
