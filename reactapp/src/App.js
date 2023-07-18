import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ArrowScroller from './Component/ArrowScroller';
import BuyerProfile from './Component/Buyer/BuyerProfile';
import FavoriteProperty from './Component/Buyer/FavoriteProperty';
import Contact from './Component/Contact/Contact';
import Faq from './Component/Contact/Faq';
import HelpCenter from './Component/Contact/HelpCenter';
import Navfooter from './Component/Layout/Footer';
import Header from './Component/Layout/Header';
import About from './Component/Pages/About';
import AddProperty from './Component/Pages/AddProperty';
import EditProperty from './Component/Pages/EditProperty';
import Home from './Component/Pages/Home';
import Payment from './Component/Pages/Payment';
import PropertyDescription from './Component/Pages/PropertyDescription';
import PropertyListing from './Component/Pages/PropertyListing';
import Session from './Component/Pages/Session';
import SellerProfile from './Component/Seller/SellerProfile';
import { UserContext } from './Component/UserProvider';

// Import admin components
import AdminSidebar from './Component/Admin/AdminSidebar';
import AgentList from './Component/Admin/AgentList';
import Dashboard from './Component/Admin/Dashboard';
import PropertyList from './Component/Admin/PropertyList';
import QueryList from './Component/Admin/QueryList';
import UserList from './Component/Admin/UserList';

function App() {
  const { userRole } = useContext(UserContext);

  return (
    <HashRouter>
      <Header />
      {userRole !== 'admin' && (
        <Container style={{ marginTop: '20px', marginBottom: '20px', minHeight: '550px' }}>
          <Routes>
            {(userRole === 'guest' || userRole === 'buyer' || userRole === 'seller') && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Propertylisting" element={<PropertyListing />} />
                <Route path="/PropertyDescription/:id" element={<PropertyDescription />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/HelpCenter" element={<HelpCenter />} />
                <Route path="/Faq" element={<Faq />} />
              </>
            )}
            {userRole === 'guest' && <Route path="/Session" element={<Session />} />}
            {userRole === 'buyer' && (
              <>
                <Route path="/BuyerProfile/*" element={<BuyerProfile />} />
                <Route path="/Payment" element={<Payment />} />
                <Route path="/Favproperty" element={<FavoriteProperty />} />
              </>
            )}
            {userRole === 'seller' && (
              <>
                <Route path="/Addproperty" element={<AddProperty />} />
                <Route path="/SellerProfile/*" element={<SellerProfile />} />
                <Route path="/EditProperty" element={<EditProperty />} />
              </>
            )}
            <Route path="*" element={<Home />} />
          </Routes>
        </Container>
      )}

      {userRole === 'admin' && (
        <Container fluid>
          <Row>
            <Col lg={2} className="shadow-sm" style={{ backgroundColor: '#333' }}>
              <AdminSidebar />
            </Col>
            <Col lg={10}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/AgentList" element={<AgentList />} />
                <Route path="/PropertyList" element={<PropertyList />} />
                <Route path="/QueryList" element={<QueryList />} />
                <Route path="/UserList" element={<UserList />} />
                <Route path="/Addproperty" element={<AddProperty />} />
                <Route path="/EditProperty" element={<EditProperty />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      )}
      <Navfooter />
      <ArrowScroller />
    </HashRouter>
  );
}

export default App;
