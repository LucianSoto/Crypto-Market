import React, { useState } from 'react'
import { FaSistrix } from 'react-icons/fa'

// change text align when typing

const SearchForm = ({ searchCoin }) => {
  const [input, setInput] = useState('')

  const handleKeyDown = (e) => {
    if(e.keyCode === 13) {
      searchCoin(input)
    }
  }

  return (
    <div className='search-form'>
      <input 
        type="text" 
        placeholder='Search Crypto'
        onChange={(e)=> setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <FaSistrix className='search-icon'/>
      {/* <div className="search-button">Search</div> */}
      {/* 
        
      */}
    </div>
  )
}

export default SearchForm
