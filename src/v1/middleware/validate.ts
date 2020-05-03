import express from 'express'
import Joi from '@hapi/joi'

export const validateCreate = async (req: express.Request, res: express.Response, next: Function) => {
  try {  
    const schema = Joi.object({
      firstName: Joi.string().min(4).max(20).pattern(new RegExp('^[a-zA-Z]+$')).required().error(new Error('Debe tener entre 4 y 20 caracteres, no contener numeros')),
      lastName: Joi.string().min(4).max(20).pattern(new RegExp('^[a-zA-Z]+$')).error(new Error('No se permiten numeros en el apellido')),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().error(new Error('Email incorrecto')),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).error(new Error('Debe tener entre 3 y 30 caracteres')),
      repeatPassword: Joi.valid(Joi.ref('password')).required().error(new Error('La contraseña no conincide')),
      status: Joi.string().valid('actived').error(new Error('El status debe ser actived')),
      role: Joi.number().valid(1, 2).error(new Error('Puedes asignar roles 1 y 2'))
    })

    await schema.validateAsync(req.body)
    next()

  } catch(error) {
    return res.json({ success: false, message: error.message })
  }
}