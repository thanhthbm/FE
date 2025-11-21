import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addressApi } from '../apis/address.api'
import { Address } from '../types/address.type'
import { toast } from 'react-toastify'

export const useAddress = () => {
  const queryClient = useQueryClient()

  const key = ['addresses']

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
      toast.error(error.response?.data?.message || 'Error adding address')
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Omit<Address, 'id'> }) => addressApi.updateAddress(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key })
      toast.success('Address updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error updating address')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => addressApi.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key })
      toast.success('Address deleted')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Cannot delete this address')
    }
  })

  const setDefaultMutation = useMutation({
    mutationFn: (id: string) => addressApi.setDefault(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key })
      toast.success('Default address changed')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error setting default address')
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
