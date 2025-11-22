import { Address } from './address.type'

export interface Role {
  id: string
  roleCode: string
  roleDescription: string
  authority: string
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string | null
  email: string
  authorityList: Role[]
}

export type UserProfileConfig = Pick<UserProfile, 'firstName' | 'lastName' | 'phoneNumber'>
