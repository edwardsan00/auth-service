import { AuthToken } from '../../v1/utils/authjwt'
type Status = 'actived' | 'suspended' | 'removed'
type Role = 1 | 2 | 3

export interface UserType {
  _id?: string,
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  status?: Status;
  role?: Role;
  createdAt?: string;
  updatedAt?: string;
  refreshToken?: string;
}

export interface UserData {
  data: UserType;
  token: AuthToken;
}

export interface UserLogin extends Pick<UserType, 'email' | 'password'> { }

export interface UserMethos {
  create(user: UserType): Promise<UserData>
  emailExist(email: string): Promise<boolean>
  singUp(login: UserLogin): Promise<UserData | string>
}