import express from 'express'

const route: express.Router = express.Router()

// Devuelve true o false si esta logueado
route.get('/', (req: express.Request, resp: express.Response): void => {
	resp.send('API Auth')
})

// loguea al usuario
route.get('/login', (req: express.Request, resp: express.Response): void => {
	resp.send('API Login')
})

// Deslogura al usuario
route.get('/logout', (req: express.Request, resp: express.Response): void => {
	resp.send('API logout')
})

export default route
