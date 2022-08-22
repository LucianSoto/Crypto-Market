import { useState, useEffect, useRef } from 'react'
import MiniGraph from './MiniGraph'

const ListItem = ({ rank, coinName, symbol, price, cap }) => {
  const [iconName, setIconName] = useState()
  const mounted = useRef(true)
  const symbolLC = symbol.toLowerCase()

  useEffect(()=> {
    if(mounted.current) {
      mounted.current = false
      setIconSource()
    }
  })

   const iconAddress = `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/black/${iconName}.svg`

  const setIconSource = () => {
    const res = fetch(`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/black/${symbolLC}.svg`)
      .then((res)=> {
        if(res.status === 200) {
          setIconName(symbolLC)
        } else {
          setIconName('btc')
        } 
      }) 
  }
  
  return (
    <div className='list-item list-item-grid' >
      <p className="rank">{rank}</p>
      <img className="icon" src={iconAddress} alt="n/a"  />
      <div className="names-div">
        <p className="name">{coinName}</p>
        <p className="symbol">{symbol}</p>
      </div>
      <MiniGraph name={coinName} />
      <div className="prices">
        <p className="price">{parseFloat(price.slice(0, 8))}</p>
        <p className="cap">{(parseInt(cap) / 1000000000).toFixed(2) + 'B'}</p>
      </div>  
    </div>
  )
}

export default ListItem
