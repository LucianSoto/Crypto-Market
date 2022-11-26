import { useEffect, useRef, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
Legend } from 'recharts'

const MiniGraph = ({name, graphSmall}) => {
  const mounted = useRef(true)
  const [graphData, setGraphData] = useState([])
  const [fillChart, setFillChart] = useState(0)
  
  useEffect(() => {
    if(mounted.current) {
      mounted.current = false
      getGraphData()
    }
  })

  name = name.replace(/\s/g, "-")

  const getGraphData = async () => {
    const res = await fetch(`https://api.coincap.io/v2/assets/${name}/history?interval=d1`)
    const resData = await res.json()
    const data = resData.data
    
    //make it so it only retrieves the 1st day of each month
    for(let i = 200; i <= data.length - 1;  i++) {
      graphData.push({
        time: i, 
        uv: parseFloat(data[i].priceUsd.slice(0,7))
      })
    }
  }     

  const renderChart = () => {
    setFillChart("100%")
  }

  setTimeout(renderChart, 600)

  const responsiveContainerStyles = {
    small : {
      height: 70,

    },
    large : {
      height: 400,
    }
  }

  return (
     <>
      <ResponsiveContainer width={fillChart} height={graphSmall ?
        responsiveContainerStyles.small.height  
        : responsiveContainerStyles.large.height
      }>
        <AreaChart
          width={80}
          height={70}
          data={graphData}
          margin={{
            top: 5,
            right: 5,
            bottom: 15,
            left: 5
          }}
          style={{zIndex: -1}}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#07767a" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#07767a" stopOpacity={0}/>
            </linearGradient>
    {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient> */}
          </defs>
          <Area
            dot={false}
            type='monotone'
            dataKey="uv"
            stroke='#1ca1a6'
            activeDot='none'
            fillOpacity={1} 
            fill='url(#colorUv)'
          /> 
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default MiniGraph
