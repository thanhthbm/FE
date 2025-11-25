import { List, Datagrid, TextField, DateField, NumberField, SelectField, EditButton, FunctionField } from 'react-admin'

const statusChoices = [
  { id: 'PENDING', name: 'Chờ xử lý' },
  { id: 'CONFIRMED', name: 'Đã xác nhận' },
  { id: 'SHIPPING', name: 'Đang giao' },
  { id: 'DELIVERED', name: 'Đã giao' },
  { id: 'CANCELLED', name: 'Đã hủy' }
]

export const OrderListAdmin = () => (
  <List sort={{ field: 'orderDate', order: 'DESC' }}>
    <Datagrid rowClick='edit'>
      <TextField source='id' label='Order ID' />
      <DateField source='orderDate' showTime />

      {/* Hiển thị tên người nhận từ object shippingAddress */}
      <TextField source='shippingAddress.receiverName' label='Customer' />

      <NumberField source='totalAmount' options={{ style: 'currency', currency: 'VND' }} />

      <SelectField source='orderStatus' choices={statusChoices} />

      <EditButton />
    </Datagrid>
  </List>
)
