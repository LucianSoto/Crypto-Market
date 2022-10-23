import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import MiniGraph from '../MiniGraph'
import { BallTriangle } from 'react-loader-spinner'

const Coin = () => {
  const [coinData, setCoinData] = useState()
  const [graph, setGraph] = useState()
  const mounted = useRef(true)
  const [isLoading, setIsLoading] = useState(true)

  const {coinId} = useParams()

  useEffect(() => {
    if(mounted.current) {
      mounted.current = false
      getData()
    }
  }, [])


  const getData = async () => {
    //Get Coin Data
    const res = await fetch(`https://api.coincap.io/v2/assets/${coinId}`)
    const data = await res.json()
    setCoinData(data.data)
    //Get Coin Graph Data
    const graphRes = await fetch(`https://api.coincap.io/v2/assets/${coinId}/history?interval=d1`)
    const graphResData = await graphRes.json()
    const graphData = graphResData.data
    setGraph(graphData)
    setIsLoading(false)
  }

  console.log(coinData)


  return (
    <div className='coin-page-container'>
      { isLoading ? 
        <div 
          className="loader-cont" 
          style={{position: "fixed", top: "50%", left: "50%", transform:     "translate(-50%, -50%)"}}
        >
          <BallTriangle 
            className="spinner"
            height = "120"
            width = "120"
            radius = "5"
            color = 'white'
            ariaLabel = 'three-dots-loading'     
            wrapperStyle
            wrapperClass
            />
        </div> 
            :
        (<>
          <div className="name-icon">
            <img 
              className="icon" 
              src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/black/${coinData.symbol.toLowerCase()}.svg`} 
              onError={({currentTarget}) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src=`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/black/btc.svg`
              }}
              alt="Coin Icon"  
            />
            <h3 className="name">{coinData.id}</h3>
          </div>
          <div className="top-details">
            <p className="price">
            <span className='price-span'>$ </span>
              {coinData.priceUsd.slice(0, 8)}
              <span className='price-span'> USD</span>
            </p>
            <p className="change-percent">{coinData.changePercent24Hr.slice(0, 5)}</p>
           </div>
        <div className="chart-cont">
          <MiniGraph name={coinId} graphSmall={false} /> 
        </div>
        <p className="cap">{(parseInt(coinData.marketCapUsd) / 1000000000).toFixed(2) + 'B'}</p> 
        <p className="rank">{coinData.rank}</p>
        </>) 
    }
  </div>
  )
}

export default Coin
