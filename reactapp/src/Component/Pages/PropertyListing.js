import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Pagination, Row, Spinner, Toast } from "react-bootstrap";
import { FaHeart, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from '../UserProvider';

function PropertyListing() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedFeature, setSelectedFeature] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userRole } = useContext(UserContext);
  const [favouriteProperties, setFavouriteProperties] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleFeatureChange = (event) => {
    setSelectedFeature(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://8080-dfafaaeeddfbcddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/properties");
        if (response.data.length === 0) {
          setLoading(true);
        } else {
          setProperties(response.data);
          setLoading(false);
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching properties.");
        setShowToast(true);
      }
    };

    fetchData();
  }, []);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        if (userRole === "buyer") {
          const response = await axios.get(
            `https://8080-dfafaaeeddfbcddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/favourites/user?userId=${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.data && response.data.length > 0) {
            setFavouriteProperties(response.data);
          }
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching favourite properties.");
        setShowToast(true);
      }
    };

    fetchFavourites();
  }, [userRole, userId]);

  const isPriceInRange = (price, range) => {
    switch (range) {
      case "0-500000":
        return price <= 500000;
      case "500001-1000000":
        return price > 500000 && price <= 1000000;
      case ">1000001-10000000":
        return price > 1000000;
      default:
        return true;
    }
  };

  const filteredProperties = properties.filter((property) => {
    const keywordMatch =
      property.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      property.description.toLowerCase().includes(searchKeyword.toLowerCase());

    const locationMatch =
      selectedLocation === "All" || property.address.toLowerCase().includes(selectedLocation.toLowerCase());

    const typeMatch = selectedType === "All" || property.type.toLowerCase() === selectedType.toLowerCase();
    const featureMatch =
      selectedFeature === "All" || property.features.some(feature => feature.toLowerCase() === selectedFeature.toLowerCase());
    const priceMatch =
      selectedPriceRange === "All" || isPriceInRange(property.price, selectedPriceRange);

    return keywordMatch && locationMatch && typeMatch && featureMatch && priceMatch;
  });

  const pageSize = 9;
  const totalPages = Math.ceil(filteredProperties.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const propertiesToDisplay = filteredProperties.slice(startIndex, endIndex);

  const handleFavouriteClick = async (propertyId) => {
    try {
      const favourite = favouriteProperties.find((fav) => fav.propertyId === propertyId);
      if (favourite) {
        // Property is already in favourites, so remove it
        await axios.delete(`https://8080-dfafaaeeddfbcddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/favourites?favId=${favourite.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFavouriteProperties((prevFavourites) =>
          prevFavourites.filter((fav) => fav.propertyId !== propertyId)
        );
        setSuccessMessage("Property removed from favourites.");
        setShowToast(true);
      } else {
        // Property is not in favourites, so add it
        const response = await axios.post("https://8080-dfafaaeeddfbcddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/favourites", {
          userId: userId,
          propertyId: propertyId,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFavouriteProperties((prevFavourites) => [...prevFavourites, response.data]);
        setSuccessMessage("Property added to favourites.");
        setShowToast(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing your request.");
      setShowToast(true);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '75vh', // Adjust this if needed
        }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Row className="mb-5 align-items-center">
        <Form>
          <Row>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Search by title or description..."
                value={searchKeyword}
                onChange={handleSearch}
              />
            </Col>
            <Col md={2}>
              <Form.Control
                as="select"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="All">All Locations</option>
                <option value="Chennai">Chennai</option>
                <option value="Karur">Karur</option>
                <option value="Bengaluru">Bengaluru</option>
              </Form.Control>
            </Col>
            <Col md={2}>
              <Form.Control
                as="select"
                value={selectedType}
                onChange={handleTypeChange}
              >
                <option value="All">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
              </Form.Control>
            </Col>
            <Col md={2}>
              <Form.Control
                as="select"
                value={selectedFeature}
                onChange={handleFeatureChange}
              >
                <option value="All">All Features</option>
                <option value="Swimming Pool">Swimming Pool</option>
                <option value="Garden">Garden</option>
                <option value="Garage">Garage</option>
                <option value="Balcony">Balcony</option>
                <option value="Patio">Patio</option>
                <option value="Fire Place">Fire place</option>
                <option value="Laundry Room">Laundry Room</option>
                <option value="Security System">Security System</option>
              </Form.Control>

            </Col>
            <Col md={3}>
              <Form.Control
                as="select"
                value={selectedPriceRange}
                onChange={handlePriceRangeChange}
              >
                <option value="All">All Prices</option>
                <option value="0-500000">Up to 500,000</option>
                <option value="500001-1000000">500,001 to 1,000,000</option>
                <option value=">1000001-10000000">1,000,001 and above</option>
              </Form.Control>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row xs={12}>
        {propertiesToDisplay.map((property) => (
          <Col md={4} key={property.id}>
            <Card className="mb-3" style={{ height: '400px' }}>
              <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                <Card.Img
                  variant="top"
                  src={`${property.imageUrls[0]}`}
                  alt={property.title}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <Card.Body>
                <Card.Title className="text-truncate mb-2">
                  {property.title}
                </Card.Title>
                <Card.Text className="text-truncate mb-2" style={{ height: '70px', whiteSpace: 'pre-wrap', textAlign: 'justify' }}>
                  {property.description.padEnd(40)}
                </Card.Text>
                <Row className="justify-content-between">
                  <Col md="auto">
                    <Card.Text>
                      <FaRupeeSign className="me-1" />
                      Price: {property.price}
                    </Card.Text>
                  </Col>
                  <Col md="6">
                    <Card.Text className="text-truncate">
                      <FaMapMarkerAlt className="me-1" />
                      {property.address}
                    </Card.Text>
                  </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                  <Col sm="5">
                    <Button as={Link} variant="light" size='sm' to={`/PropertyDescription/${property.id}`}>View Details</Button>
                  </Col>
                  <Col sm='auto'>
                    {userRole === "buyer" && (
                      <Card.Text>
                        {favouriteProperties && favouriteProperties.length > 0 && favouriteProperties.some(
                          (fav) => fav.propertyId === property.id
                        ) ? (
                          <FaHeart
                            color="red"
                            onClick={() => handleFavouriteClick(property.id)}
                            style={{ cursor: "pointer" }}
                            className="bounce"
                          />
                        ) : (
                          <FaHeart
                            color="gray"
                            onClick={() => handleFavouriteClick(property.id)}
                            style={{ cursor: "pointer" }}
                            className="pulse"
                          />
                        )}
                      </Card.Text>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={`page-${index + 1}`}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Favourites</strong>
        </Toast.Header>
        <Toast.Body>
          {successMessage && <span style={{ color: 'green' }}>{successMessage}</span>}
          {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
        </Toast.Body>
      </Toast>
    </>
  );
}

export default PropertyListing;