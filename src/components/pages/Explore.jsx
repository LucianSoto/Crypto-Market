import { useEffect, useState, useRef } from 'react'
import ListItem from '../ListItem'
import { BallTriangle } from 'react-loader-spinner'
import SearchForm from '../SearchForm'

const Explore = () => {
  const [listData, setListData] = useState([])
  const [chartDataList, setChartDataList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const mounted = useRef(true)

  useEffect(() => { 
    if(mounted.current) {
      mounted.current = false
      getData()
    }
  }, [isLoading])

  const getData = async () => {
    const response = await fetch('https://api.coincap.io/v2/assets?limit=9', {
      method: "GET",
    }) 
    const chartResponse = await fetch('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1')
    const data = await response.json()
    setListData(data.data)
    setIsLoading(false)
  }


  return (
    <>
    <div className='explore-div'>
    <SearchForm/>
    <h4>ALL COINS</h4>{/* this changes depending on page too  */}
        {
          isLoading ? 
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
          <div className="list">
          {listData.map((item) => (
            <ListItem
              // id={i}
              coinName={item.id}
              symbol={item.symbol}
              price={item.priceUsd}
              rank={item.rank}
              cap={item.marketCapUsd}
            />
          ))}
          </div>
        }
    </div>
  </>
  )
}

export default Explore
