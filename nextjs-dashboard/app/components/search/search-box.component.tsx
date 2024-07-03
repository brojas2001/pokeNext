import React from 'react'


export const SearchBox = ({ placeholder, handleChange}) => (

        <input
        className='w-[500px] text-center rounded-full place-items-center m-[10px] '
        type='search'
        placeholder={placeholder}
        onChange={handleChange}
    />
    
)

  