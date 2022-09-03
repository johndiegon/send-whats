import { AddressType } from "./AddressType"

export interface ClientApiType {
  id?: string
  name?: string
  lastName?: string
  docNumber?: string
  docType?: number
  email?: string
  address?: AddressType
  phone?: string[]
  idUser?: string
  user?: UserApiType
  status?: number
}

export interface ClientStoreType extends ClientApiType {
  user: UserStoreType
}

export interface UserApiType extends UserType {
  token?: string
}

export interface UserStoreType extends UserType {
  token: string
  signed: boolean
  limitLoggedIn: number
}

export interface UserType {
  id?: string
  login?: string
  password?: string
  role: string  
}


export interface NewPassWordType {
  email: string,
  password: string,
  oldPassword: string
}

