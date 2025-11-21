import React, { useState } from 'react'
import { Plus, Pencil, Trash2, MapPin, Phone, Star, Loader2 } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addressApi } from '../../apis/address.api'
import { toast } from 'react-toastify'
import AddressForm from '../../components/AddressForm/AddressForm'
import { Address } from '../../types/address.type'

export default function AddressBook() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  // 1. Fetch Data
  const { data, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: addressApi.getAddresses,
    staleTime: 1000 * 60 * 5
  })

  const addresses = data?.data?.data || []

  const deleteMutation = useMutation({
    mutationFn: addressApi.deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
      toast.success('Đã xóa địa chỉ')
    },
    onError: () => toast.error('Không thể xóa địa chỉ này')
  })

  const setDefaultMutation = useMutation({
    mutationFn: addressApi.setDefault,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
      toast.success('Đã đổi địa chỉ mặc định')
    }
  })

  // Handlers
  const handleDelete = (id: string) => {
    if (window.confirm('Bạn chắc chắn muốn xóa địa chỉ này?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleEdit = (addr: Address) => {
    setEditingAddress(addr)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingAddress(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingAddress(null)
  }

  if (isLoading) {
    return (
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-10 flex justify-center'>
        <Loader2 className='w-8 h-8 text-pink-600 animate-spin' />
      </div>
    )
  }

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]'>
      {/* Header */}
      <div className='px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50'>
        <div>
          <h2 className='text-lg font-bold text-gray-900'>Sổ địa chỉ</h2>
          <p className='text-sm text-gray-500 mt-1'>Quản lý địa chỉ giao hàng và thanh toán</p>
        </div>
        <button
          onClick={handleAddNew}
          className='flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow'
        >
          <Plus className='w-4 h-4' />
          Thêm địa chỉ mới
        </button>
      </div>

      {/* List Content */}
      <div className='p-6'>
        {addresses.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200'>
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3'>
              <MapPin className='w-6 h-6 text-gray-400' />
            </div>
            <p className='font-medium'>Bạn chưa lưu địa chỉ nào.</p>
            <button onClick={handleAddNew} className='text-pink-600 hover:underline text-sm mt-1 font-medium'>
              Thêm ngay
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`group relative border rounded-xl p-5 transition-all duration-200 bg-white flex flex-col
                  ${
                    addr.isDefault
                      ? 'border-pink-200 shadow-sm ring-1 ring-pink-50'
                      : 'border-gray-200 hover:border-pink-200 hover:shadow-md'
                  }
                `}
              >
                <div className='flex justify-between items-start mb-3'>
                  <div className='flex items-center gap-2'>
                    {addr.isDefault && (
                      <span className='flex items-center gap-1 bg-pink-50 text-pink-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-pink-100'>
                        Default
                      </span>
                    )}
                  </div>

                  <div className='flex gap-1'>
                    <button
                      onClick={() => handleEdit(addr)}
                      className='p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                      title='Chỉnh sửa'
                    >
                      <Pencil className='w-4 h-4' />
                    </button>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                      title='Xóa'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>

                {/* Address Info */}
                <div className='space-y-1 mb-4 flex-1'>
                  <p className='font-medium text-gray-900'>{addr.receiverName}</p>
                  <p className='text-gray-600 text-sm leading-relaxed line-clamp-2'>{addr.detail}</p>
                  <p className='text-gray-600 text-sm'>
                    {addr.ward}, {addr.province}
                  </p>
                </div>

                {/* Phone */}
                <div className='flex items-center gap-2 text-sm text-gray-500 pt-3 border-t border-gray-50'>
                  <Phone className='w-4 h-4' />
                  <span className='font-medium font-mono'>{addr.phoneNumber}</span>
                </div>

                {/* Set Default Button (Nếu chưa phải mặc định) */}
                {!addr.isDefault && (
                  <button
                    onClick={() => setDefaultMutation.mutate(addr.id)}
                    className='mt-3 w-full py-2 text-xs font-medium text-gray-500 bg-gray-50 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors border border-transparent hover:border-pink-100'
                  >
                    Đặt làm mặc định
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center p-4 px-4 sm:px-0' style={{ zIndex: 100 }}>
          {/* Backdrop - CHO PHÉP CLICK XUYÊN QUA */}
          <div
            className='absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200'
            style={{ zIndex: 100, pointerEvents: 'auto' }}
            onClick={handleCloseModal}
            onMouseDown={(e) => {
              // Chỉ đóng modal nếu click trực tiếp vào backdrop
              if (e.target === e.currentTarget) {
                handleCloseModal()
              }
            }}
          />

          {/* Modal Content */}
          <div
            className='relative bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-in zoom-in-95 duration-200 mx-4 flex flex-col max-h-[85vh]'
            style={{ zIndex: 101, pointerEvents: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center flex-shrink-0'>
              <h3 className='text-lg font-bold text-gray-900'>
                {editingAddress ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
              </h3>
              <button
                onClick={handleCloseModal}
                className='text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-100 p-1.5 rounded-full transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center'
              >
                ×
              </button>
            </div>

            <div className='p-6 overflow-y-auto flex-1'>
              <AddressForm initialData={editingAddress} onSuccess={handleCloseModal} onCancel={handleCloseModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
