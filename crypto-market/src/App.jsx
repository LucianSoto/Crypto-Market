import './App.css';
import Nav from './components/Nav';
import Explore from './components/pages/Explore'
import { FaRegBell, FaEllipsisV } from 'react-icons/fa'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Favorites from './components/pages/Favorites';
import SearchForm from './components/SearchForm';

function App() {
  return (
    <>
      <Router>
        <header className="App-header"> 
          <FaEllipsisV className='header-icon'/>
          <h1>Crypto Watch App</h1>
          <FaRegBell className='header-icon'/>
        </header>
        <SearchForm/>
        <Routes>
          <Route path="/" element={<Explore/>}/>
          <Route path="/favorites" element={<Favorites/>} />
        </Routes>
        <Nav/>
      </Router>
    </>
  );
}

export default App;
