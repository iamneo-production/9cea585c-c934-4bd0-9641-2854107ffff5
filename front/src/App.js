import * as React from 'react';
import Navheader from "./Component/Navbar";
import Navfooter from "./Component/Footer";
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import About from './Component/About';
import Contact from './Component/Contact';
import Session from './Component/Session';
import PropertyListing from './Component/PropertyListing';
import Profile from './Component/Profile';
import AddProperty from './Component/AddProperty';
import FavProperty from './Component/FavProperty';
function Example() {
  return (
    <div>
      <HashRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navheader />

          <div style={{ flex: '1', paddingTop: '60px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Contact" element={<Contact />} />
              <Route exact path="/Propertylisting" element={<PropertyListing />} />
              <Route exact path="/Addproperty" element={<AddProperty />} />
              <Route exact path="/Favproperty" element={<FavProperty />} />
              <Route exact path="/Profile" element={<Profile />} />
              <Route path="/Session" element={<Session />} />
            </Routes>
          </div>
          <Navfooter />
        </div>
      </HashRouter>
    </div>
  );
}


export default Example;