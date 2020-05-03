import jwt from 'jsonwebtoken'

interface Payload {
  id: string
}

const secretKey: string = process.env.ACCESS_TOKEN_SECRET || ''

class AuthJWT {
  async genAuth(payload: Payload): Promise<string> {
    return jwt.sign(payload,secretKey, { expiresIn: '15m' })
  }
}

export default new AuthJWT()