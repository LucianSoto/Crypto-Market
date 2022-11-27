import './App.css';
import Nav from './components/Nav';
import Explore from './components/pages/Explore'
import { FaRegBell, FaEllipsisV } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import Favorites from './components/pages/Favorites'
import Coin from './components/pages/Coin';

function App() {
  let params = useParams()

  console.log(params)
  return (
    <>
      <Router>
        <header className="App-header"> 
          {/* h1 app title ? no need for mobile */}

        {/* React loader spinner: implement !!! Already added to package.json */}
        {/* <div className="try">{id}</div> */}
          <div className="header-top">
            <FaEllipsisV className='header-icon'/>
            <h2>Track</h2> {/* title changes depending on page  */}
            <FaHeart className='header-icon'/>
          </div>
        </header>
        <Routes> 
          <Route exact path="/crypto-market"  element={<><Explore/></>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/coin/:coinId" element={<Coin/>} />
        </Routes>
        <Nav/>
      </Router>
    </>
  );
}

export default App;
