import { useEffect } from 'react'
import Icon from 'react-crypto-icons'

const ListItem = ({ rank, name, symbol, price, cap }) => {

  const iconName = symbol.toLowerCase()
  console.log(price < 1 ? Math.floor(price) : price, )
  
  return (
    <div className='list-item list-item-grid' >
      <p className="rank">{rank}</p>
      {/* <svg height={20}> */}
      <Icon name="eth" size={20} className="crypto-icon"/>
      {/* </svg> */}
      <p className="name">{}</p>
      <p className="symbol">{symbol}</p>
      {/* <div className="grap"></div> */}
      <p className="price">{price}</p>
      {/* cut the string for price  */}
      <p className="cap">{cap}</p>
    </div>
  )
}

export default ListItem
