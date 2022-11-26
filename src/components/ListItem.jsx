import { useState, useEffect, useRef } from 'react'
import MiniGraph from './MiniGraph'
import { Link } from 'react-router-dom'


const ListItem = ({ rank, coinName, symbol, price, cap }) => {
  const [iconName, setIconName] = useState()
  const mounted = useRef(true)



  return (
    <Link to={`/coin/${coinName = coinName.replace(/-/g, " ")}`} className='list-item list-item-grid' >
        <p className="rank">{rank}</p>
        <img 
        className="icon" 
        src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/black/${symbol.toLowerCase()}.svg`} 
        onError={({currentTarget}) => {
          currentTarget.onerror = null // prevents looping
          currentTarget.src=`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/black/btc.svg`
        }}
        alt="n/a"  
      />
        <div className="names-div">
          <p className="name">{coinName}</p>
          <p className="symbol">{symbol}</p>
        </div>
        <MiniGraph name={coinName} graphSmall={true} />
        <div className="prices">
          <p className="price">{parseFloat(price.slice(0, 8))}</p>
          <p className="cap">{(parseInt(cap) / 1000000000).toFixed(2) + 'B'}</p>
        </div>  
    </Link>
  )
}

export default ListItem
