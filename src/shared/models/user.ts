export type User = {
  _id: string;
  username: string;
  token: string;
  permissions: any[];
}

export type LoginInfoDto = {
  username: string;
  password: string;
}

export type ReponseResult<T> = {
  statusCode: number;
  data: T;
  message: string;
}

export type JWT = {
  access_token: string;
}
