import bcrypt from 'bcryptjs'
import UserModel from '../../datalayer/models/user'
import { UserType, UserLogin, UserMethos, UserData } from '../../datalayer/interfaces/user.interface'
import AuthJWT from '../utils/authjwt'

interface UpdateToken {
  userId: string;
  refreshToken: string;
}
class User implements UserMethos {
  async create(user: UserType): Promise<UserData>{
    const newUser = new UserModel(user)
    newUser.password = await newUser.encriptPassword(user.password)

    const data = await newUser.save()
    const token = await AuthJWT.genAuth({ userId: data._id})

    await this.updateToken({ userId: data._id, refreshToken: token.refreshToken })

    return {
      data,
      token
    }
  }

  async emailExist(email: string): Promise<boolean> {
    const user: UserType | null = await UserModel.findOne({ email: email }).lean()
      return Boolean((user && user._id))
  }

  async singUp({ email, password }: UserLogin): Promise<UserData | string> {
    const user: UserType | null = await UserModel.findOne({ email: email }).lean()

    if(user && user._id){
      const { password: passwordHash } = user
      const samePassword = await bcrypt.compare(password, passwordHash)
      if(!samePassword)
        return 'Contraseña incorrecta'

      const token = await AuthJWT.genAuth({ userId: user._id })

      await this.updateToken({ userId: user._id, refreshToken: token.refreshToken })

      return {
        data: user,
        token
      }
    }

    return "User don't exist"
  }

  async logOut(refreshToken: string): Promise<boolean>{
    const user = await UserModel.findOneAndUpdate({ refreshToken: refreshToken }, { $set: { refreshToken: null } })
    if(user && user._id)
      return true
    throw new Error('Faild to logout')
  }

  async updateToken({ userId, refreshToken}: UpdateToken): Promise<boolean>{
    const user = await UserModel.findByIdAndUpdate({ _id: userId }, { $set: { refreshToken } })
    if(user && user._id)
      return true
    throw new Error('Faild excuted')
  }

  async validRefreshToken(refreshToken: string): Promise<boolean> {
    const user: UserType | null = await UserModel.findOne({ refreshToken: refreshToken}).lean()
    return Boolean(user && user._id)
  }
}

export default new User()