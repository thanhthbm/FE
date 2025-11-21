import { useQuery } from '@tanstack/react-query'
import { locationApi } from '../apis/location.api'

export const useLocation = (selectedProvinceId: string) => {
  const provincesQuery = useQuery({
    queryKey: ['provinces'],
    queryFn: locationApi.getProvinces,
    staleTime: Infinity
  })

  const wardsQuery = useQuery({
    queryKey: ['wards', selectedProvinceId],
    queryFn: () => locationApi.getWards(selectedProvinceId),
    enabled: !!selectedProvinceId && selectedProvinceId !== '',
    staleTime: Infinity
  })

  return {
    provinces: provincesQuery.data || [],
    wards: wardsQuery.data || [],
    isLoadingProvinces: provincesQuery.isLoading,
    isLoadingWards: wardsQuery.isLoading
  }
}
