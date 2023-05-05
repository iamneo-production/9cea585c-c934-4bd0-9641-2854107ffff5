import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import './App.css'
  
class App extends Component {
  render() {
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
}
export default App