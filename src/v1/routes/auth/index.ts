import express from 'express'

import { UserType } from '../../../datalayer/interfaces/user.interface'
import { validateCreate } from '../../middleware/validate'
import { User } from '../../controllers'

const route: express.Router = express.Router()


route.get('/singup', (req: express.Request, res: express.Response): void => {
	res.send('API Login')
})

route.get('/logout', (req: express.Request, res: express.Response): void => {
	res.send('API logout')
})

route.post('/singin', validateCreate, async (req: express.Request, res: express.Response) => {
	try {
		const body: UserType = req.body
		const { data, token } = await User.create(body)
		
		res.set('accessToken', token)
		return res.json({
			success: true,
			data
		})

	} catch(error){
		return res.status(500).json({ success: false, message: error.message})
	}


	res.send('singin')
})

export default route
