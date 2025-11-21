import React from 'react'
import Select, { StylesConfig } from 'react-select'
import { Loader2 } from 'lucide-react'

interface Option {
  label: string
  value: string
}

interface SearchableSelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  isLoading?: boolean
  disabled?: boolean
  className?: string
}

const SearchableSelect = ({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  isLoading = false,
  disabled = false,
  className
}: SearchableSelectProps) => {
  const selectedOption = options.find((option) => option.value === value) || null

  const customStyles: StylesConfig<Option, false> = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '40px',
      borderColor: state.isFocused ? '#ec4899' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 1px #ec4899' : 'none',
      '&:hover': {
        borderColor: '#ec4899'
      }
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 99999
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 99999
    })
  }

  if (isLoading) {
    return (
      <div className='w-full h-10 px-4 py-2 flex items-center gap-2 border border-gray-300 rounded-lg bg-gray-50'>
        <Loader2 className='h-4 w-4 animate-spin' />
        <span className='text-sm text-gray-500'>Loading...</span>
      </div>
    )
  }

  return (
    <Select
      value={selectedOption}
      onChange={(option) => option && onChange(option.value)}
      options={options}
      placeholder={placeholder}
      isDisabled={disabled}
      isSearchable
      isClearable={false}
      className={className}
      styles={customStyles}
      menuPortalTarget={document.body}
      menuPosition='fixed'
      noOptionsMessage={() => 'No result found'}
    />
  )
}

export default SearchableSelect
