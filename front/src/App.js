import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Component/Home.js';
import About from './Component/About';
import Contact from './Component/Contact';
import './App.css'

function Navbar() {
  return (
    <>
      <Router>
        <div className="App">

          <ul className="App-header" id='ul-nb'>
            <li ><a>
              <Link to="/">Home</Link>
            </a>
            </li>
            <li><a>
              <Link to="/about">About Us</Link>
            </a>
            </li>
            <li><a>
              <Link to="/contact">Contact Us</Link>
            </a>
            </li>
            <button id='button'>Login/Register</button>
          </ul>

          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/about' element={< About />}></Route>
            <Route exact path='/contact' element={< Contact />}></Route>
          </Routes>

        </div>
      </Router>
    </>
  );
}
export default Navbar;