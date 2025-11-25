import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin'

export const CategoryList = () => (
  <List>
    <Datagrid rowClick='edit'>
      <TextField source='id' />
      <TextField source='name' />
      <TextField source='code' />
      <TextField source='description' />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
)
