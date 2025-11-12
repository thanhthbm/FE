import React from 'react'

const GoogleButton = () => {
  return (
    <button
      type='button'
      className='w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-md text-sm font-medium mb-6 hover:shadow-sm'
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 533.5 544.3' className='w-5 h-5' aria-hidden>
        <path
          fill='#4285F4'
          d='M533.5 278.4c0-17.7-1.6-35-4.7-51.7H272v98h147.4c-6.4 34.5-25.9 63.7-55.3 83.3v68h89.3c52.2-48 82.1-118.9 82.1-197.6z'
        />
        <path
          fill='#34A853'
          d='M272 544.3c74.4 0 136.9-24.6 182.6-66.8l-89.3-68c-25 17-57 27.1-93.2 27.1-71.6 0-132.4-48.3-154.2-113.1h-91v70.9C80.4 486.9 166 544.3 272 544.3z'
        />
        <path
          fill='#FBBC05'
          d='M117.8 326.5c-5.9-17.7-9.3-36.6-9.3-56s3.4-38.3 9.3-56V143.6h-91C8.6 190 0 230.4 0 270.5s8.6 80.5 26.8 126.9l91-70.9z'
        />
        <path
          fill='#EA4335'
          d='M272 107.7c39.9 0 75.9 13.7 104.2 40.6l78-78C406.2 24 343.7 0 272 0 166 0 80.4 57.4 26.8 143.6l91 70.9C139.6 156 200.4 107.7 272 107.7z'
        />
      </svg>
      Continue With Google
    </button>
  )
}

export default GoogleButton
