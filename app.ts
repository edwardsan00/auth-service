import express from 'express'
import morgan from 'morgan'
import v1 from './src/v1'

const app: express.Application = express()

// middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Routes
app.use('/api/v1', v1)

export default app