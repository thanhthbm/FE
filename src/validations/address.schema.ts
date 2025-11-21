import * as yup from 'yup'

const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/

export const addressSchema = yup.object({
  receiverName: yup.string().required('Receiver name is required'),
  phoneNumber: yup.string().required('Phone number is required').matches(phoneRegExp, 'Phone number is not valid'),
  province: yup.string().required('Province is required'),
  ward: yup.string().required('Ward/District is required'),
  detail: yup.string().required('Specific address is required'),
  isDefault: yup.boolean().required()
})

export type AddressSchema = yup.InferType<typeof addressSchema>
