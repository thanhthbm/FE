import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  ImageInput,
  ImageField,
  required,
  FormDataConsumer
} from 'react-admin'

// Validate ảnh primary
const validateUniquePrimary = (values: any[]) => {
  if (!values || values.length === 0) return undefined
  const primaryCount = values.filter((v) => v.isPrimary).length
  if (primaryCount > 1) return 'Chỉ được chọn 1 ảnh làm ảnh đại diện (Primary)'
  if (primaryCount === 0) return 'Phải chọn 1 ảnh làm ảnh đại diện'
  return undefined
}

export const ProductCreate = () => (
  <Create redirect='list'>
    <SimpleForm>
      <TextInput source='name' validate={[required()]} fullWidth />

      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <TextInput source='slug' validate={[required()]} style={{ flex: 1 }} />
        <TextInput source='brand' validate={[required()]} style={{ flex: 1 }} />
        <NumberInput source='price' validate={[required()]} style={{ flex: 1 }} min={0} />
      </div>

      <TextInput source='description' multiline rows={3} fullWidth />

      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <ReferenceInput source='categoryId' reference='category' style={{ flex: 1 }}>
          <SelectInput optionText='name' label='Category' validate={[required()]} fullWidth />
        </ReferenceInput>

        <FormDataConsumer style={{ flex: 1 }}>
          {({ formData, ...rest }) => (
            <ReferenceInput
              source='categoryTypeId'
              reference='category-type'
              filter={formData.categoryId ? { 'category.id': formData.categoryId } : {}}
              enableGetChoices={({ q }) => !!formData.categoryId}
              {...rest}
            >
              <SelectInput
                optionText='name'
                label='Category Type'
                validate={[required()]}
                fullWidth
                disabled={!formData.categoryId}
              />
            </ReferenceInput>
          )}
        </FormDataConsumer>
      </div>

      <h3 className='text-lg font-bold mt-4 mb-2'>Product Variants</h3>
      <ArrayInput source='variants' label=' '>
        <SimpleFormIterator inline>
          <TextInput source='color' label='Color' validate={[required()]} helperText='e.g. Red, Blue' />
          <TextInput source='size' label='Size' validate={[required()]} helperText='e.g. S, M, XL, 42' />
          <NumberInput source='stockQuantity' label='Stock' validate={[required()]} min={0} />
        </SimpleFormIterator>
      </ArrayInput>

      <h3 className='text-lg font-bold mt-4 mb-2'>Product Images</h3>
      <ArrayInput source='productResources' label=' ' validate={validateUniquePrimary}>
        <SimpleFormIterator inline>
          <ImageInput source='url' label='Upload' accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }} isRequired>
            <ImageField source='src' title='title' />
          </ImageInput>
          <TextInput source='name' label='Alt Text' defaultValue='product-img' />
          <BooleanInput source='isPrimary' label='Primary?' />
        </SimpleFormIterator>
      </ArrayInput>

      <BooleanInput source='isNewArrival' />
    </SimpleForm>
  </Create>
)
