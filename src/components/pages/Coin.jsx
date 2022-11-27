import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import MiniGraph from '../MiniGraph'
import { BallTriangle } from 'react-loader-spinner'
import { FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'

const Coin = () => {
  const [coinData, setCoinData] = useState()
  const [graph, setGraph] = useState()
  const mounted = useRef(true)
  const [isLoading, setIsLoading] = useState(true)
  const [favPopUp, setFavPopUp] = useState(false)
  const [isFav, setIsFav] = useState(false)

  const {coinId} = useParams()



  useEffect(() => {
    if(mounted.current) {
      mounted.current = false
      getData()
      getFavs()
    }
  }, [])

  // useEffect(()=> {
  //   'in effect'
  //   if(favPopUp) {
  //     setTimeout(()=> {
  //       setIsFav(true)
  //       setFavPopUp(prevState => !prevState)
  //       console.log(favPopUp)
  //     }, 2000)
  //   }
  // }, [favPopUp])

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

  const getFavs = () => {
    let currentFavs = []
    if(localStorage.getItem('favs') === null) {
      return
    } else {
      currentFavs = [...JSON.parse(localStorage.getItem('favs'))]
      if (currentFavs.includes(coinId) ) {
      setIsFav(prevState => !prevState) 
      } else { 
        return  
      }
    }
  }

  const addToFavs = (e) => {
    e.preventDefault()
    let currentFavs = []
    if(localStorage.getItem('favs') === null ) {
      localStorage.setItem('favs', JSON.stringify([coinId]))
      setIsFav(prevState => !prevState)
      // setFavPopUp(prevState => !prevState)
    } else {
      currentFavs = [...JSON.parse(localStorage.getItem('favs'))]
      if(currentFavs.includes(coinId)){
        return
      } else {
        currentFavs.push(coinId)
        localStorage.setItem('favs', JSON.stringify(currentFavs))
        setIsFav(prevState => !prevState)
        // setFavPopUp(prevState => !prevState)
      }
    }
  }

  const removeFav = (e) => {
    e.preventDefault()
    let currentFavs = []
    currentFavs = [...JSON.parse(localStorage.getItem('favs'))]
    currentFavs = currentFavs.filter(coin => coin !== coinId)
    localStorage.setItem('favs', JSON.stringify(currentFavs))
    setIsFav(prevState => !prevState)
  }

  return (
    <>
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
            <div className="coin-name-icon-heart">
              <img 
                className="icon" 
                src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/black/${coinData.symbol.toLowerCase()}.svg`} 
                onError={({currentTarget}) => {
                  currentTarget.onerror = null // prevents looping
                  currentTarget.src=`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/black/btc.svg`
                }}
                alt="Coin Icon"  
              />
              <h3 className="coin-name">{coinData.id}</h3>
              {
                isFav ?
                <FaHeart 
                  className='coin-heart'
                  id={coinData.id}
                  onClick={(e)=> removeFav(e)}
                />
                :
                <FiHeart 
                  id={coinData.id}
                  className='coin-heart' 
                  onClick={(e) => addToFavs(e)}
                  />
              }
            </div>
            <div className="top-details">
              <p className="coin-price">
              <span className='price-span'>$ </span>
                {coinData.priceUsd.slice(0, 8)}
                <span className='price-span'> USD</span>
              </p>
              <p className="change-percent">%{coinData.changePercent24Hr.slice(0, 5)}</p>
            </div>
            <div className="graph-times">
              <p>1D</p>
              <p>1W</p>
              <p>1M</p>
              <p>3M</p>
              <p>6M</p>
              <p>1Y</p>
            </div>
            <div className="coin-chart-cont">
              <MiniGraph name={coinId} graphSmall={false} /> 
            </div>
            <div className="bottom-cont">
              <div className=''>
                <p className='info-label'>Market Cap</p>
                <p className="bottom-info">{(parseInt(coinData.marketCapUsd) / 1000000000).toFixed(2) + 'B'}</p> 
              </div>
              <div className=''>
                <p className='info-label'>Rank</p>
                <p className="bottom-info">#{coinData.rank}</p>
              </div>
            </div>
          </>) 
      }
      {
        favPopUp ?
        <div className="fav-popup">
          <h4>{coinData.id} has been added to favorites.</h4>
        </div>
        :
        null
      }
    </div>
  </>
  )
}

export default Coin
