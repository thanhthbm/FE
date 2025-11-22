import React, { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { Loader2, Save, User } from 'lucide-react'

import { userProfileSchema, UserProfileSchema } from '../../validations/user.schema'
import { userApi } from 'src/apis/user.api'

export default function Profile() {
  const queryClient = useQueryClient()

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: userApi.getProfile,
    staleTime: 1000 * 60 * 5
  })

  const profile = profileData?.data.data

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty }
  } = useForm<UserProfileSchema>({
    resolver: yupResolver(userProfileSchema) as any,
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: ''
    }
  })

  useEffect(() => {
    if (profile) {
      setValue('firstName', profile.firstName)
      setValue('lastName', profile.lastName)
      setValue('phoneNumber', profile.phoneNumber || '')
    }
  }, [profile, setValue])

  const updateMutation = useMutation({
    mutationFn: (body: UserProfileSchema) => userApi.updateProfile(body as any),
    onSuccess: () => {
      toast.success('Profile updated successfully')
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to update profile'
      toast.error(msg)
    }
  })

  const onSubmit = (data: UserProfileSchema) => {
    updateMutation.mutate(data)
  }

  if (isLoading) {
    return (
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-10 flex justify-center min-h-[400px] items-center'>
        <Loader2 className='w-8 h-8 text-pink-600 animate-spin' />
      </div>
    )
  }

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]'>
      <div className='px-6 py-5 border-b border-gray-100 bg-gray-50/50'>
        <h2 className='text-lg font-bold text-gray-900'>My Profile</h2>
        <p className='text-sm text-gray-500 mt-1'>Manage and protect your account</p>
      </div>

      <div className='p-6 md:p-8'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex flex-col items-center gap-4 md:w-1/3 md:border-r md:border-gray-100 pr-0 md:pr-8'>
            <div className='w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-sm flex items-center justify-center overflow-hidden relative group cursor-pointer'>
              <User className='w-16 h-16 text-gray-400' />
              <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                <span className='text-white text-xs font-medium'>Change</span>
              </div>
            </div>
            <div className='text-center'>
              <p className='text-sm text-gray-500'>Email (Read-only)</p>
              <p className='font-medium text-gray-900 truncate max-w-[200px]'>{profile?.email}</p>
            </div>
          </div>

          <div className='flex-1'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 max-w-lg'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>First Name</label>
                  <input
                    type='text'
                    {...register('firstName')}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                      errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-pink-500'
                    }`}
                    placeholder='John'
                  />
                  {errors.firstName && <p className='text-xs text-red-500'>{errors.firstName.message}</p>}
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>Last Name</label>
                  <input
                    type='text'
                    {...register('lastName')}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                      errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-pink-500'
                    }`}
                    placeholder='Doe'
                  />
                  {errors.lastName && <p className='text-xs text-red-500'>{errors.lastName.message}</p>}
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>Phone Number</label>
                <input
                  type='tel'
                  {...register('phoneNumber')}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-pink-100 ${
                    errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-pink-500'
                  }`}
                  placeholder='0912...'
                />
                {errors.phoneNumber && <p className='text-xs text-red-500'>{errors.phoneNumber.message}</p>}
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>Email Address</label>
                <input
                  type='email'
                  value={profile?.email || ''}
                  disabled
                  className='w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                />
                <p className='text-xs text-gray-400'>To change your email, please contact support.</p>
              </div>

              <div className='pt-4'>
                <button
                  type='submit'
                  disabled={updateMutation.isPending || !isDirty}
                  className='flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow disabled:bg-gray-300 disabled:cursor-not-allowed'
                >
                  {updateMutation.isPending ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <Save className='w-4 h-4' />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
