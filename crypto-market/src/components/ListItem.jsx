
const ListItem = ({ rank, coinName, symbol, price, cap }) => {

  const iconName = symbol.toLowerCase()
  const iconAddress = `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/black/${iconName}.svg`
  return (
    <div className='list-item list-item-grid' >
      <p className="rank">{rank}</p>
      <img className="icon" src={iconAddress} alt="" />
      <div className="names-div">
        <p className="name">{coinName}</p>
        <p className="symbol">{symbol}</p>
      </div>
      <div className="graph">GRAPH</div>
      <div className="prices">
        <p className="price">{parseFloat(price.slice(0, 8))}</p>
        <p className="cap">{(parseInt(cap) / 1000000000).toFixed(2) + 'B'}</p>
      </div>  
    </div>
  )
}

export default ListItem
