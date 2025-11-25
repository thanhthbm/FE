import { Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, required } from 'react-admin'

// Hàm transform dữ liệu trước khi gửi đi (PUT)
const transform = (data: any) => {
  return {
    ...data,
    // Map từ 'categoryTypes' (có sẵn trong data do BE trả về) sang 'categoryTypeList' (DTO yêu cầu)
    categoryTypeList: data.categoryTypes
  }
}

export const CategoryEdit = () => (
  <Edit transform={transform}>
    <SimpleForm>
      <TextInput source='id' disabled />
      <TextInput source='name' validate={[required()]} fullWidth />
      <TextInput source='code' validate={[required()]} fullWidth />
      <TextInput source='description' multiline fullWidth />

      {/* Hiển thị list categoryTypes hiện có */}
      <ArrayInput source='categoryTypes' label='Sub Categories'>
        <SimpleFormIterator>
          {/* TextInput id hidden để biết là update item cũ */}
          <TextInput source='id' disabled hidden />
          <TextInput source='name' label='Name' validate={[required()]} />
          <TextInput source='code' label='Code' validate={[required()]} />
          <TextInput source='description' label='Description' />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
)
