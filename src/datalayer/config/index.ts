interface MongoConnection {
  uri: string;
}

interface ConnectionsType {
  mongo: MongoConnection
}

export const connections: ConnectionsType = {
  mongo: {
    uri: process.env.MONGODB_CONNECTION || ''
  }
}