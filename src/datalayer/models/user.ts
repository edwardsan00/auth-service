import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { UserType } from '../interfaces/user.interface'

const { Schema, model } = mongoose

const UserSchame = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String
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
	status: {
		type: String,
		'enum': ['actived', 'suspended', 'removed'],
		default: 'actived'
	},
	role: {
		type: Number,
		enum: [1,2,3],
		default: 1
	}
}, { timestamps: true } )

UserSchame.methods.encriptPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10)
	return bcrypt.hash(password, salt)
}

interface SchemaMethods extends UserType {
	encriptPassword: (password: string) => string
}

export default model<SchemaMethods & mongoose.Document>('User', UserSchame)
