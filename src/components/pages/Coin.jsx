import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

const Coin = () => {
  const [coinData, setCoinData] = useState()
  const mounted = useRef(true)

  const {coinName, symbol, price, rank, cap} = coinData
  const {coinId} = useParams()
  const thisCoin = ''

  useEffect(() => {
    if(mounted.current) {
      mounted.current = false
      getData()
    }
  }, [])


  const getData = async () => {
    const res = await fetch(`https://api.coincap.io/v2/assets/${coinId}`)
    const data = await res.json()
    // console.log(data)
    setCoinData(data.data)
    // query
  }


  return (
    <div className='single-coin'>
      {/* <p className="rank">{rank}</p> */}
        {/* <img className="icon" src={iconAddress} alt="n/a"  /> */}
        {/* <div className="names-div"> */}
          <h3 className="name">{coinId}</h3>
          {/* <p className="symbol">{symbol}</p> */}
        {/* </div> */}
        {/* <MiniGraph name={coinName} /> */}
        {/* <div className="prices"> */}
          {/* <p className="price">{parseFloat(price.slice(0, 8))}</p> */}
          {/* <p className="cap">{(parseInt(cap) / 1000000000).toFixed(2) + 'B'}</p> */}
        {/* </div>  */}
    </div>
  )
}

export default Coin
