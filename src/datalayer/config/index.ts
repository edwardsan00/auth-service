interface MongoConnection {
  uri: string;
}

interface ConnectionsType {
  mongo: MongoConnection
}

export interface AuthTokenKey {
  accessTokenKey: string;
  refreshTokenKey: string
}

export const connections: ConnectionsType = {
  mongo: {
    uri: process.env.MONGODB_CONNECTION || ''
  }
}

export const jwtKey: AuthTokenKey = {
  accessTokenKey: process.env.ACCESS_TOKEN_SECRET || '',
  refreshTokenKey: process.env.REFRESH_TOKEN_SECRET || ''
}