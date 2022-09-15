import { useEffect, useState, useRef } from 'react'
import ListItem from '../ListItem'
import { Audio } from 'react-loader-spinner'

const Explore = () => {
  const [listData, setListData] = useState([])
  const [chartDataList, setChartDataList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const mounted = useRef(true)

  useEffect(() => { 
    if(mounted.current) {
      mounted.current = false
      getData()
    }
  }, [])

  const getData = async () => {
    const response = await fetch('https://api.coincap.io/v2/assets?limit=9', {
      method: "GET",
    }) 
    const chartResponse = await fetch('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1')
    const data = await response.json()
    setListData(data.data)

  }


  return (
    <>
    <div className='explore-div'>
        {
          isLoading ? 
          <Audio 
            height = "80"
            width = "80"
            radius = "9"
            color = 'white'
            ariaLabel = 'three-dots-loading'     
            wrapperStyle
            wrapperClass
          /> :
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
