import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, required } from 'react-admin'

export const CategoryCreate = () => (
  <Create redirect='list'>
    <SimpleForm>
      <TextInput source='name' validate={[required()]} fullWidth />
      <TextInput source='code' validate={[required()]} fullWidth />
      <TextInput source='description' multiline fullWidth />

      {/* Dùng source="categoryTypeList" đúng với DTO của Backend khi tạo mới */}
      <ArrayInput source='categoryTypeList' label='Sub Categories (Category Types)'>
        <SimpleFormIterator>
          <TextInput source='name' label='Name' validate={[required()]} />
          <TextInput source='code' label='Code' validate={[required()]} />
          <TextInput source='description' label='Description' />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
)
