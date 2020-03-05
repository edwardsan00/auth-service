import express, { response } from 'express'
import auth from './routes/auth'

const route: express.Router = express.Router()

route.use('/auth', auth)

export default route
