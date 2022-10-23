import React from 'react'
import { Link } from 'react-router-dom'
import { FaChartLine, FaHeart } from 'react-icons/fa'

const Nav = () => {
  return (
    <nav className='nav'>
      <Link to="/crypto-market" className='nav-link'>
        <FaChartLine/>
        <p>Explore</p>
      </Link>
      <p className="logo">CWA</p>
      <Link to="/favorites" className='nav-link'>
        <FaHeart/>
        <p>Favorites</p>
      </Link>
    </nav>
  )
}

export default Nav
