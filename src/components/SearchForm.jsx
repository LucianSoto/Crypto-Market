import React from 'react'
import { FaSistrix } from 'react-icons/fa'

// change text align when typing

const SearchForm = () => {
  return (
    <div className='search-form'>
      <input 
        type="text" 
        placeholder='Search Crypto'
      />
      <FaSistrix className='search-icon'/>
      {/* <div className="search-button">Search</div> */}
      {/* 
        
      */}
    </div>
  )
}

export default SearchForm
