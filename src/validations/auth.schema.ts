import * as yup from 'yup'

export const loginSchema = yup
  .object({
    username: yup.string().email('Email is not valid').required('Email must not be empty'),
    password: yup.string().required('Please fill in password')
  })
  .required()

export const registerSchema = yup
  .object({
    firstName: yup.string().required('First name must not be empty'),
    lastName: yup.string().required('Last name must not be empty'),
    email: yup.string().required('Email must not be empty'),
    password: yup.string().min(8, 'Password length must be greater than 8').required('Password must not be empty'),
    phoneNumber: yup.string().notRequired().nullable()
  })
  .required()
