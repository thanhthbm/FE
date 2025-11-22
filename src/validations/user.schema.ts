import * as yup from 'yup'

export const userProfileSchema = yup.object({
  firstName: yup.string().required('First name is required').max(50, 'Maximum length is 50 characters'),
  lastName: yup.string().required('Last name is required').max(50, 'Maximum length is 50 characters'),
  phoneNumber: yup
    .string()
    .nullable()
    .notRequired()
    .test('is-phone', 'Invalid phone number', (val) => {
      if (!val) return true
      return /^[0-9]{10,11}$/.test(val)
    })
})

export type UserProfileSchema = yup.InferType<typeof userProfileSchema>