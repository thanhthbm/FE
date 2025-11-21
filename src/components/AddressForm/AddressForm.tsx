import React, { useState, useEffect, useMemo } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Loader2, Save } from 'lucide-react'
import { useLocation } from '../../hooks/useLocation'
import { Address } from '../../types/address.type'
import { addressApi } from '../../apis/address.api'
import SearchableSelect from '../SearchableSelect/SearchableSelect'

interface AddressFormProps {
  initialData?: Address | null
  onSuccess: () => void
  onCancel: () => void
}

export default function AddressForm({ initialData, onSuccess, onCancel }: AddressFormProps) {
  const queryClient = useQueryClient()

  // STATE: Quản lý ID để call API lấy danh sách con
  const [provinceId, setProvinceId] = useState<string>('')
  const [wardId, setWardId] = useState<string>('')

  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    receiverName: '',
    phoneNumber: '',
    province: '',
    ward: '',
    detail: '',
    isDefault: false
  })

  // HOOK: Lấy data địa chính
  const { provinces, wards, isLoadingProvinces, isLoadingWards } = useLocation(provinceId)

  // FILL DATA KHI EDIT
  useEffect(() => {
    if (initialData) {
      setFormData({
        receiverName: initialData.receiverName,
        phoneNumber: initialData.phoneNumber,
        province: initialData.province,
        ward: initialData.ward,
        detail: initialData.detail,
        isDefault: initialData.isDefault
      })
    }
  }, [initialData])

  // MUTATION
  const mutation = useMutation({
    mutationFn: (body: Omit<Address, 'id'>) => {
      return initialData ? addressApi.updateAddress(initialData.id, body) : addressApi.createAddress(body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
      toast.success(initialData ? 'Đã cập nhật địa chỉ' : 'Đã thêm địa chỉ mới')
      onSuccess()
    },
    onError: () => toast.error('Lỗi khi lưu địa chỉ')
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.province || !formData.ward) {
      toast.warn('Vui lòng chọn đầy đủ Tỉnh/Thành và Quận/Huyện')
      return
    }
    mutation.mutate(formData)
  }

  const provinceOptions = useMemo(
    () => provinces.map((p: any) => ({ label: p.full_name || p.name, value: p.id })),
    [provinces]
  )

  const wardOptions = useMemo(() => wards.map((w: any) => ({ label: w.full_name || w.name, value: w.id })), [wards])

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      {/* Tên & SĐT */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-gray-700'>Tên người nhận</label>
          <input
            type='text'
            className='w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition-colors'
            value={formData.receiverName}
            onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
            required
            placeholder='Nguyễn Văn A'
          />
        </div>
        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-gray-700'>Số điện thoại</label>
          <input
            type='tel'
            className='w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition-colors'
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            required
            placeholder='0912...'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-gray-700'>Tỉnh / Thành phố</label>
          <SearchableSelect
            options={provinceOptions}
            value={provinceId}
            isLoading={isLoadingProvinces}
            onChange={(val) => {
              setProvinceId(val)
              setWardId('')
              // Tìm tên dựa trên ID để lưu vào formData
              const name = provinces.find((p: any) => p.id === val)?.full_name || ''
              setFormData((prev) => ({ ...prev, province: name, ward: '' }))
            }}
            placeholder={formData.province || 'Chọn Tỉnh/Thành'}
          />
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-gray-700'>Quận / Huyện</label>
          <SearchableSelect
            options={wardOptions}
            value={wardId}
            disabled={!provinceId}
            isLoading={isLoadingWards}
            onChange={(val) => {
              setWardId(val)
              const name = wards.find((w: any) => w.id === val)?.full_name || ''
              setFormData((prev) => ({ ...prev, ward: name }))
            }}
            placeholder={formData.ward || 'Chọn Quận/Huyện'}
          />
        </div>
      </div>

      {/* Chi tiết */}
      <div className='space-y-1.5'>
        <label className='text-sm font-medium text-gray-700'>Địa chỉ cụ thể</label>
        <textarea
          rows={2}
          className='w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 resize-none transition-colors'
          placeholder='Số nhà, tên đường, khu vực...'
          value={formData.detail}
          onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
          required
        />
      </div>

      <div className='flex items-center justify-end pt-2'>
        <label className='flex items-center gap-2 cursor-pointer group'>
          <input
            type='checkbox'
            checked={formData.isDefault}
            onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
            className='w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500 cursor-pointer'
          />
          <span className='text-sm text-gray-700 select-none group-hover:text-pink-600 transition-colors'>
            Đặt làm địa chỉ mặc định
          </span>
        </label>
      </div>

      {/* Footer Buttons */}
      <div className='flex justify-end gap-3 pt-4 border-t border-gray-100'>
        <button
          type='button'
          onClick={onCancel}
          className='px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
        >
          Hủy bỏ
        </button>
        <button
          type='submit'
          disabled={mutation.isPending}
          className='flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-sm'
        >
          {mutation.isPending ? <Loader2 className='w-4 h-4 animate-spin' /> : <Save className='w-4 h-4' />}
          {initialData ? 'Lưu thay đổi' : 'Thêm địa chỉ'}
        </button>
      </div>
    </form>
  )
}
