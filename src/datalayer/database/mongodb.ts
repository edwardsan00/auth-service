import mongoose from 'mongoose'
import { connections } from '../config'

const { mongo } = connections

mongoose.connect(mongo.uri,{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('Success Connection MongoDB'))
.catch((e) => console.log('Failed Connection MongoDB', e))