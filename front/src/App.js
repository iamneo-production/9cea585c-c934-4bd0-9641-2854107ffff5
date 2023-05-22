import * as React from 'react';
import Navheader from "./Component/Navbar";
import Navfooter from "./Component/Footer";
import { Container, Row } from 'react-bootstrap';
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
        <Container>
          <Row>
            <Navheader />
          </Row>
          <Row>
    <h1>Heading</h1>
          </Row>
        </Container>
        <Container>
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
        </Container>
        <Container>
          <Row>
            <Navfooter />
          </Row>
        </Container>
      </HashRouter>
import * as React from 'react';
import Navheader from "./Component/Navbar";
import Navfooter from "./Component/Footer";
import { Container, Row } from 'react-bootstrap';
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
        <Container>
          <Row>
            <Navheader />
          </Row>
          <Row>
    <h1>Heading</h1>
          </Row>
        </Container>
        <Container>
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
        </Container>
        <Container>
          <Row>
            <Navfooter />
          </Row>
        </Container>
      </HashRouter>
    </div>
  );
}


export default Example;