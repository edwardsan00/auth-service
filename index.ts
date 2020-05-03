require('dotenv').config()
require('./src/datalayer/database/mongodb')
import app from './app'

const { PORT } = process.env

const main = async () => {
	try {
		app.listen(PORT)
		console.log('App runing in port:', PORT)
	} catch(e){
		console.log('Error in server', e)
	}
}

main()
