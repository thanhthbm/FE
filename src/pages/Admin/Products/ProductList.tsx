import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  ImageField,
  TextInput,
  ReferenceInput,
  SelectInput
} from 'react-admin'

const productFilters = [
  <TextInput source='name' label='Search' alwaysOn />,
  <ReferenceInput source='categoryId' reference='category' label='Category'>
    <SelectInput optionText='name' />
  </ReferenceInput>
]

export const ProductList = () => (
  <List filters={productFilters}>
    <Datagrid rowClick='edit'>
      <TextField source='id' />
      <ImageField source='thumbnail' sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover' } }} />
      <TextField source='name' />
      <TextField source='brand' />
      <NumberField source='price' options={{ style: 'currency', currency: 'VND' }} />
      <TextField source='categoryName' label='Category' />
      <NumberField source='rating' />
      <BooleanField source='isNewArrival' />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
)
