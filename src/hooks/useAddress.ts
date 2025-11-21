import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addressApi } from '../apis/address.api'
import { Address } from '../types/address.type'
import { toast } from 'react-toastify'

export const useAddress = () => {
  const queryClient = useQueryClient()

  const key = ['address']

  const addressQuery = useQuery({
    queryKey: key,
    queryFn: addressApi.getAddresses,
    staleTime: 1000 * 60 * 5
  })

  const addresses = addressQuery.data?.data.data || []

  const addMutation = useMutation({
    mutationFn: (body: Omit<Address, 'id'>) => addressApi.createAddress(body),
    onSuccess: () => {
      //fetch lai
      queryClient.invalidateQueries({
        queryKey: key
      })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Lỗi khi thêm địa chỉ')
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Omit<Address, 'id'> }) => addressApi.updateAddress(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key })
      toast.success('Cập nhật địa chỉ thành công')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Lỗi khi cập nhật')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => addressApi.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key })
      toast.success('Đã xóa địa chỉ')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể xóa địa chỉ này')
    }
  })

  const setDefaultMutation = useMutation({
    mutationFn: (id: string) => addressApi.setDefault(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key })
      toast.success('Đã thay đổi địa chỉ mặc định')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Lỗi khi đặt mặc định')
    }
  })

  return {
    addresses,
    isLoading: addressQuery.isLoading,

    addAddress: addMutation.mutate,
    updateAddress: updateMutation.mutate,
    deleteAddress: deleteMutation.mutate,
    setDefaultAddress: setDefaultMutation.mutate,

    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isSettingDefault: setDefaultMutation.isPending
  }
}
