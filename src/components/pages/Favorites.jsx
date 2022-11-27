// import { params } from 'react-router-dom'
import { useEffect, useState, useRef } from "react"
import ListItem from "../ListItem"
import { BallTriangle } from 'react-loader-spinner'
// import Icon from 'react-crypto-icons'


const Favorites = () => {
  const mounted = useRef(false)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ favCoins, setFavCoins ] = useState([])

  useEffect(() => {
    if(mounted.current === false ) {
      fetchFavs()
      mounted.current = true
    }
  })

  const fetchFavs = () => {
    let currentFavs = [...JSON.parse(localStorage.getItem('favs'))]
    coinCalls(currentFavs)
  }

  const fetchData = async (fav) => {
    const res = await fetch(`https://api.coincap.io/v2/assets/${fav}`)
    const data = await res.json()
    setFavCoins(prevState => [...prevState, data.data])
  }

  const coinCalls = async (favs) => {
    console.log(favs, 'at fetch coins')
    await favs.map(fav => 
      fetchData(fav)
    )
    setIsLoading(prevState => !prevState)
  }

  return (
    <div className="favs-cont">
      <h4 style={{width: "100%", textAlign: "center", marginBottom: 20}}>Here are your favorite Coins</h4>
      <div className="list">
      { isLoading ? 
        <div 
            className="loader-cont" 
              style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
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
          favCoins.map(coin => (
          <ListItem
              // id={i}
              coinName={coin.id}
              symbol={coin.symbol}
              price={coin.priceUsd}
              rank={coin.rank}
              cap={coin.marketCapUsd}
            />
        ))
        
      }
      </div>
    </div>
  )
}

export default Favorites
