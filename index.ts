import express from 'express'
import morgan from 'morgan'
import v1 from './v1'

const app: express.Application = express()
const router: express.Router = express.Router()

// middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Routes
app.use('/api/v1', v1)

app.listen(3000, () => {
	console.log('Corriendo en el puerto 3000')
})
