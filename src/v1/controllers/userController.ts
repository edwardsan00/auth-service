import UserModel from '../../datalayer/models/user'
import { UserType, UserMethos, UserCreate } from '../../datalayer/interfaces/user.interface'
import AuthJWT from '../utils/authjwt'

class User implements UserMethos {
  async create(user: UserType): Promise<UserCreate>{
    const newUser = new UserModel(user)
    newUser.password = await newUser.encriptPassword(user.password)

    const data = await newUser.save()
    const token = await AuthJWT.genAuth({ id: data._id})

    return {
      data,
      token
    }
  }
}

export default new User()