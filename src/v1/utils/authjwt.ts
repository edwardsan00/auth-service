import jwt from 'jsonwebtoken'
import { jwtKey } from '../../datalayer/config'

interface Payload {
  userId: string
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

const { accessTokenKey, refreshTokenKey } = jwtKey

class AuthJWT {
  async genAuth(payload: Payload): Promise<AuthToken> {
    return {
      accessToken: this.genAccessToken(payload),
      refreshToken: this.genRefreshToken(payload)
    }
  }

  genAccessToken(payload: Payload): string{
    return jwt.sign(payload, accessTokenKey, { expiresIn: 60 * 60 * 24  })
  }

  genRefreshToken(payload: Payload): string {
    return jwt.sign(payload, refreshTokenKey)
  }
}

export default new AuthJWT()