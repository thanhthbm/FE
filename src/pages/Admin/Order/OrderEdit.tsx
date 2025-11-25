import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  FormDataConsumer,
  useRecordContext
} from 'react-admin'

const statusChoices = [
  { id: 'PENDING', name: 'Pending' },
  { id: 'CONFIRMED', name: 'Confirmed' },
  { id: 'SHIPPING', name: 'Shipping' },
  { id: 'DELIVERED', name: 'Delivered' },
  { id: 'CANCELLED', name: 'Cancelled' }
]

const OrderTotal = () => {
  const record = useRecordContext()
  if (!record) return null
  return (
    <div style={{ margin: '1rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
      Total Amount: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.totalAmount)}
    </div>
  )
}

export const OrderEdit = () => (
  <Edit mutationMode='pessimistic'>
    <SimpleForm>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <TextInput source='id' disabled fullWidth label='Order ID' />
          <DateInput source='orderDate' disabled fullWidth />
          <SelectInput source='orderStatus' choices={statusChoices} fullWidth />
        </div>

        <div style={{ flex: 1 }}>
          <TextInput source='shippingAddress.receiverName' label='Receiver' disabled fullWidth />
          <TextInput source='shippingAddress.phoneNumber' label='Phone' disabled fullWidth />
          <TextInput source='shippingAddress.detail' label='Address' disabled multiline fullWidth />
        </div>
      </div>

      <h3 className='text-lg font-bold mt-4'>Order Items</h3>
      <p className='text-sm text-gray-500 mb-2'>* You can change quantity or remove items.</p>

      <ArrayInput source='orderItems' label=' '>
        <SimpleFormIterator>
          {/* Hiển thị thông tin sản phẩm (Read-only) */}
          <TextInput source='productName' label='Product' disabled />
          <TextInput source='variantName' label='Variant' disabled />

          {/* Giá tại thời điểm mua (Read-only để đảm bảo lịch sử) */}
          <NumberInput source='itemPrice' label='Price' disabled />

          {/* Cho phép sửa số lượng */}
          <NumberInput source='quantity' min={1} />

          {/* Tự động tính Subtotal dòng này */}
          <FormDataConsumer>
            {({ scopedFormData }) => (
              <div style={{ padding: '10px' }}>
                Subtotal: {(scopedFormData?.itemPrice * scopedFormData?.quantity || 0).toLocaleString()}
              </div>
            )}
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>

      <OrderTotal />
    </SimpleForm>
  </Edit>
)
