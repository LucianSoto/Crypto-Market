import './App.css';
import Nav from './components/Nav';
import Explore from './components/pages/Explore'
import { FaRegBell, FaEllipsisV } from 'react-icons/fa'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import Favorites from './components/pages/Favorites';
import SearchForm from './components/SearchForm';


function App() {

  let { id } = useParams()

  console.log(typeof(id))

  return (
    <>
      <Router>
        <header className="App-header"> 
          {/* h1 app title ? no need for mobile */}

        {/* React loader spinner: implement !!! Already added to package.json */}
        <div className="try">{id}</div>
          <div className="header-top">
            <FaEllipsisV className='header-icon'/>
            <h2>Track</h2> {/* title changes depending on page  */}
            <FaRegBell className='header-icon'/>
          </div>
          <SearchForm/>
          <p>ALL COINS</p>{/* this changes depending on page too  */}
        </header>
        <Routes>
          <Route path="/" element={<Explore/>}/>
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/coin" element />
        </Routes>
        <Nav/>
      </Router>
    </>
  );
}

export default App;
