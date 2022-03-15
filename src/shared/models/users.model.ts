export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  pfp?: string;
  roles: string[];
  username: string;
  password: string;
}

export type UpdateUserDto = {
  firstName?: string;
  lastName?: string;
  email?: string;
  pfp?: string;
  roles?: string[];
  username?: string;
  password?: string;
}

export type User = {
  _id: string;
  firstName: string;
  createdTime: string;
  updatedTime: string;
  lastName: string;
  email: string;
  username: string;
  roles: any[] | string;
}
