type Status = 'actived' | 'suspended' | 'removed'
type Role = 1 | 2 | 3

export interface UserType {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  status?: Status;
  role?: Role;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCreate {
  data: UserType,
  token: string;
}

export interface UserMethos {
  create(user: UserType): Promise<UserCreate>
}