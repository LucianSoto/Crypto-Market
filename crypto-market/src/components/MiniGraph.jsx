import { useEffect, useRef, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
Legend } from 'recharts'

const MiniGraph = ({name}) => {
  const mounted = useRef(true)
  const [graphData, setGraphData] = useState([])

  useEffect(() => {
    if(mounted.current) {
      mounted.current = false
      
      getGraphData()
    }
  })

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

  return (
    // <ResponsiveContainer width="100%" height="100%">
    <>
      <AreaChart
        width={100}
        height={70}
        data={graphData}
        margin={{
          top: 15,
          right: 10,
          bottom: -15,
          left: -40
        }}
        style={{zIndex: -1}}
      >
        <XAxis dataKey="time" tick={false}  />
        <YAxis tick={false}/>
        <Area
          dot={false}
          type='monotone'
          dataKey="uv"
          stroke='#8884d8'
          activeDot='none'
        /> 

      </AreaChart>
    </>
    // </ResponsiveContainer>
  )
}

export default MiniGraph
