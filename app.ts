import express from 'express'
import morgan from 'morgan'
import v1 from './src/v1'

const { NODE_ENV } = process.env

const app = express()

// middleware
NODE_ENV === 'development' ? app.use(morgan('dev')) : app.use(morgan('common'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Routes
app.use('/api/v1', v1)

export default app