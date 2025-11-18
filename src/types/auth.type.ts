export type RegistrationRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber?: string
}

export type RegistrationResponse = {
  code: number
  message?: string
}

export type LoginRequest = {
  username: string
  password: string
}

export type UserToken = {
  accessToken: string
}

export type VerifyRequest = {
  username: string
  code: string
}
