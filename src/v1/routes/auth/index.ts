import express from 'express'
import jwt from 'jsonwebtoken'

import { UserType, UserLogin} from '../../../datalayer/interfaces/user.interface'
import { jwtKey } from '../../../datalayer/config'
import { validateCreate, validateLogin } from '../../middleware/validate'
import AuthJWT from '../../utils/authjwt'
import { User } from '../../controllers'

const route: express.Router = express.Router()

route.get('/info', async (req: express.Request, res: express.Response) => {
	try {
		const { authorization } = req.headers
		const token = authorization && authorization.split(' ')[1]

		if (!token)
			return res.status(401).json({ success: false, message: 'Auth error' })

		jwt.verify(token, jwtKey.accessTokenKey, (err: any, payload: any) => {
			if (err) return res.status(403).json({ error: err.message })
			return res.status(200).json({ success: true, userId: payload.userId })
		})
	} catch(error){

	} 
})

route.post('/validate', validateLogin, async (req: express.Request, res: express.Response) => {
	try {
		jwt.verify(req.refreshToken, jwtKey.refreshTokenKey, (error: any, payload: any) => {
			if (error)
				return res.status(403).json({ success: false, message: 'Invalid token' })
			const accessToken = AuthJWT.genAccessToken({ userId: payload.userId })
			return res.status(200).json({ accessToken })
		})
	} catch (error){
		return res.status(500).json({ success: false, message: error.message })
	}
})

route.post('/singup', async (req: express.Request, res: express.Response) => {
	try {
		const body: UserLogin = req.body
		const emailExist = await User.emailExist(body.email)
		if(!emailExist)
			return res.status(400).json({ success: false, message: 'El emil no esta registrado' })

		const successLogin = await User.singUp(body)

		if(typeof successLogin === 'string')
			return res.status(400).json({ success: false, message: successLogin})

		const { data, token: { accessToken, refreshToken } } = successLogin
		res.set('accessToken', accessToken)
		res.set('refreshToken', refreshToken)
		return res.json({
			success: true,
			data
		})

	} catch(error) {
		return res.status(500).json({ success: false, message: error.message })
	}
})

route.post('/singin', validateCreate, async (req: express.Request, res: express.Response) => {
	try {
		const body: UserType = req.body
		const emailExist = await User.emailExist(body.email)
		if(emailExist)
			return res.status(400).json({ success: false, message: 'El email ya esta registrado' })

		const { data, token: { accessToken, refreshToken } } = await User.create(body)
		
		res.set('accessToken', accessToken)
		res.set('refreshToken', refreshToken)
		return res.json({
			success: true,
			data
		})

	} catch(error){
		return res.status(500).json({ success: false, message: error.message})
	}
})

route.delete('/logout', validateLogin,  async (req: express.Request, res: express.Response) => {
	try {
		const success = await User.logOut(req.refreshToken)
		if(success)
			return res.status(200).json({ success: true })

	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
})

export default route
