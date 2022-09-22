import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import MiniGraph from '../MiniGraph'

const Coin = () => {
  const [coinData, setCoinData] = useState()
  const [graph, setGraph] = useState()
  const mounted = useRef(true)

  // const {id, rank, symbol, name, } = coinData
  const {coinId} = useParams()

  useEffect(() => {
    if(mounted.current) {
      mounted.current = false
      getData()
    }
  }, [])


  const getData = async () => {
    const res = await fetch(`https://api.coincap.io/v2/assets/${coinId}`)
    const data = await res.json()
    console.log(data.data)
    setCoinData(data.data)

    const graphRes = await fetch(`https://api.coincap.io/v2/assets/${coinId}/history?interval=d1`)
    const graphResData = await graphRes.json()
    const graphData = graphResData.data
    setGraph(graphData)
  }

  {coinData ? console.log(coinData) : console.log('no data 1')}

  return (
    
    <div className='coin-page-container'>
    {
      coinData ? (
        <>
      <h3 className="name">{coinData.id}</h3>
      <p className="rank">{coinData.rank}</p>
      <MiniGraph name={coinData.coinName} /> 
      <p className="price">{parseFloat(coinData.priceUsd.slice(0, 8))}</p>
      <p className="cap">{(parseInt(coinData.marketCapUsd) / 1000000000).toFixed(2) + 'B'}</p> 
      </>
      ) 
      :
      ( <p>loading...</p>)

    }
      {/* <img className="icon" src={iconAddress} alt="n/a"  /> */}
            
    </div>
  )
}

export default Coin
