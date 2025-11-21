import React, { useState, useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { Loader2, Save } from 'lucide-react'
import { useLocation } from '../../hooks/useLocation'
import { useAddress } from '../../hooks/useAddress'
import { Address } from '../../types/address.type'
import SearchableSelect from '../SearchableSelect/SearchableSelect'
import { addressSchema, AddressSchema } from 'src/validations/address.schema'

interface AddressFormProps {
  initialData?: Address | null
  onSuccess: () => void
  onCancel: () => void
}

export default function AddressForm({ initialData, onSuccess, onCancel }: AddressFormProps) {
  const { addAddress, updateAddress, isAdding, isUpdating } = useAddress()

  const [provinceId, setProvinceId] = useState<string>('')
  const [wardId, setWardId] = useState<string>('')

  const { provinces, wards, isLoadingProvinces, isLoadingWards } = useLocation(provinceId)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<AddressSchema>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      receiverName: initialData?.receiverName || '',
      phoneNumber: initialData?.phoneNumber || '',
      province: initialData?.province || '',
      ward: initialData?.ward || '',
      detail: initialData?.detail || '',
      isDefault: initialData?.isDefault || false
    }
  })

  // Watch province để reset ward khi thay đổi
  const currentProvince = watch('province')

  useEffect(() => {
    if (initialData) {
      setValue('receiverName', initialData.receiverName)
      setValue('phoneNumber', initialData.phoneNumber)
      setValue('province', initialData.province)
      setValue('ward', initialData.ward)
      setValue('detail', initialData.detail)
      setValue('isDefault', initialData.isDefault)
    }
  }, [initialData, setValue])

  const onSubmit = (data: AddressSchema) => {
    if (initialData) {
      updateAddress(
        { id: initialData.id, body: data },
        {
          onSuccess: () => onSuccess()
        }
      )
    } else {
      addAddress(data, {
        onSuccess: () => onSuccess()
      })
    }
  }

  const provinceOptions = useMemo(
    () =>
      provinces.map((p: any) => ({
        label: p.full_name || p.name,
        value: String(p.id)
      })),
    [provinces]
  )

  const wardOptions = useMemo(
    () =>
      wards.map((w: any) => ({
        label: w.full_name || w.name,
        value: String(w.id)
      })),
    [wards]
  )

  const isLoading = isAdding || isUpdating

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
      {/* Tên & SĐT */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-gray-700'>Receiver Name</label>
          <Controller
            name='receiverName'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                className={`w-full p-2.5 border rounded-lg focus:outline-none transition-colors ${
                  errors.receiverName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-pink-500'
                }`}
              />
            )}
          />
          {errors.receiverName && <p className='text-xs text-red-500 mt-1'>{String(errors.receiverName.message)}</p>}
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-gray-700'>Phone number</label>
          <Controller
            name='phoneNumber'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type='tel'
                className={`w-full p-2.5 border rounded-lg focus:outline-none transition-colors ${
                  errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-pink-500'
                }`}
              />
            )}
          />
          {errors.phoneNumber && <p className='text-xs text-red-500 mt-1'>{String(errors.phoneNumber.message)}</p>}
        </div>
      </div>

      {/* ĐỊA CHÍNH */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-gray-700'>Province</label>
          <Controller
            name='province'
            control={control}
            render={({ field }) => (
              <SearchableSelect
                options={provinceOptions}
                value={provinceId}
                isLoading={isLoadingProvinces}
                onChange={(val) => {
                  setProvinceId(val)
                  setWardId('')
                  const name = provinces.find((p: any) => String(p.id) === val)?.full_name || ''
                  field.onChange(name)
                  setValue('ward', '')
                }}
                placeholder={field.value || 'Select province'}
              />
            )}
          />
          {errors.province && <p className='text-xs text-red-500 mt-1'>{String(errors.province.message)}</p>}
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-gray-700'>Ward</label>
          <Controller
            name='ward'
            control={control}
            render={({ field }) => (
              <SearchableSelect
                options={wardOptions}
                value={wardId}
                disabled={!provinceId}
                isLoading={isLoadingWards}
                onChange={(val) => {
                  setWardId(val)
                  const name = wards.find((w: any) => String(w.id) === val)?.full_name || ''
                  field.onChange(name)
                }}
                placeholder={field.value || 'Ward'}
              />
            )}
          />
          {errors.ward && <p className='text-xs text-red-500 mt-1'>{String(errors.ward.message)}</p>}
        </div>
      </div>

      {/* Chi tiết */}
      <div className='space-y-1.5'>
        <label className='text-sm font-medium text-gray-700'>Specific address</label>
        <Controller
          name='detail'
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={2}
              className={`w-full p-2.5 border rounded-lg focus:outline-none resize-none transition-colors ${
                errors.detail ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-pink-500'
              }`}
              placeholder='House number, street name, area...'
            />
          )}
        />
        {errors.detail && <p className='text-xs text-red-500 mt-1'>{String(errors.detail.message)}</p>}
      </div>

      <div className='flex items-center justify-end pt-2'>
        <Controller
          name='isDefault'
          control={control}
          render={({ field }) => (
            <label className='flex items-center gap-2 cursor-pointer group'>
              <input
                type='checkbox'
                checked={field.value}
                onChange={field.onChange}
                className='w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500 cursor-pointer'
              />
              <span className='text-sm text-gray-700 select-none group-hover:text-pink-600 transition-colors'>
                Set as default
              </span>
            </label>
          )}
        />
      </div>

      {/* Footer Buttons */}
      <div className='flex justify-end gap-3 pt-4 border-t border-gray-100'>
        <button
          type='button'
          onClick={onCancel}
          className='px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isLoading}
          className='flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-sm'
        >
          {isLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Save className='w-4 h-4' />}
          {initialData ? 'Save Changes' : 'Add Address'}
        </button>
      </div>
    </form>
  )
}
