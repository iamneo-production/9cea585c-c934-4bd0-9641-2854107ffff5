import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function EditProperty() {
  const location = useLocation();
  const { propertyData } = location.state;
  const [property, setProperty] = useState(propertyData);
  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const Navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...property.imageUrls];
    updatedImages.splice(index, 1);
    setProperty((prevProperty) => ({
      ...prevProperty,
      imageUrls: updatedImages,
    }));
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = [...property.videoUrls];
    updatedVideos.splice(index, 1);
    setProperty((prevProperty) => ({
      ...prevProperty,
      videoUrls: updatedVideos,
    }));
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    const files = Array.from(event.target.files);
    // Check if any files are selected
    if (files.length === 0) {
      return; // Do not update state if no files are selected
    }
    // Check if each image is within the allowed size limit (2 MB)
    for (const file of files) {
      if (file.size > 2 * 1024 * 1024) {
        event.target.value = '';
        alert('Image size should not exceed 2 MB');
        return; // Do not update state if any image exceeds the limit
      }
    }
    setNewImages(files);
  };

  const handleVideoChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    // Check if a file is selected
    if (!file) {
      return; // Do not update state if no file is selected
    }
    // Check if the video is within the allowed size limit (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      // Clear the selected files in the file input field
      event.target.value = '';
      alert('Video size should not exceed 5 MB');
      return; // Do not update state if the video exceeds the limit
    }
    setNewVideos([file]);
  };

  const handleFeaturesChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setProperty((prevProperty) => ({
        ...prevProperty,
        features: [...prevProperty.features, name],
      }));
    } else {
      setProperty((prevProperty) => ({
        ...prevProperty,
        features: prevProperty.features.filter((feature) => feature !== name),
      }));
    }
  };

  const handleReset = () => {
    setProperty(propertyData);
    setNewImages([]);
    setNewVideos([]);

    // Reset file input fields
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = '';
    });
  };
  const createFormData = () => {
    const formData = new FormData();
    formData.append('id', property.id);
    formData.append('title', property.title);
    formData.append('price', property.price);
    formData.append('description', property.description);
    formData.append('address', property.address);
    formData.append('status', property.status);
    formData.append('type', property.type);

    newImages.forEach((image) => {
      formData.append('images', image);
    });

    newVideos.forEach((video) => {
      formData.append('videos', video);
    });

    property.imageUrls.forEach((imageUrl) => {
      formData.append('imageUrls', imageUrl);
    });

    property.videoUrls.forEach((videoUrl) => {
      formData.append('videoUrls', videoUrl);
    });

    property.features.forEach((feature) => {
      formData.append('features', feature);
    });
    return formData;
  };

  const userRole = localStorage.getItem('userRole');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = createFormData();
    try {
      await axios.put(
        `https://8080-dfafaaeeddfbcddcfcdcebdafbeaeaadbdbabf.project.examly.io/properties`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (userRole === 'admin')
        Navigate('/PropertyList');
      else
        Navigate("/SellerProfile/YourProperty");
    } catch (error) {
      console.error('AxiosError:', error);

    }
  };


  return (
    <>
      <Container className='border-0 shadow rounded-3 p-sm-2' style={{ marginTop: '20px', marginBottom: '20px' }}>
        <h4 className='mx-auto font-weight-bold card-title text-center mt-4 mb-3'>Edit Property</h4>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      name="title"
                      value={property.title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formPrice">
                    <Form.Label>Price *</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      name="price"
                      value={property.price}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Description *</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter description"
                      name="description"
                      value={property.description}
                      onChange={handleChange}
                      maxLength={200}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formAddress">
                    <Form.Label>Address *</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter address"
                      name="address"
                      value={property.address}
                      onChange={handleChange}
                      maxLength={100}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formStatus">
                    <Form.Label>Status *</Form.Label>
                    <div>
                      <Form.Check
                        type="radio"
                        label="Rent"
                        name="status"
                        value="rent"
                        checked={property.status === 'rent'}
                        onChange={handleChange}
                        required
                      />
                      <Form.Check
                        type="radio"
                        label="Sell"
                        name="status"
                        value="sell"
                        checked={property.status === 'sell'}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formType">
                    <Form.Label>Type *</Form.Label>
                    <div>
                      <Form.Check
                        type="radio"
                        label="House"
                        name="type"
                        value="house"
                        checked={property.type === 'house'}
                        onChange={handleChange}
                        required
                      />
                      <Form.Check
                        type="radio"
                        label="Villa"
                        name="type"
                        value="villa"
                        checked={property.type === 'villa'}
                        onChange={handleChange}
                        required
                      />
                      <Form.Check
                        type="radio"
                        label="Apartment"
                        name="type"
                        value="apartment"
                        checked={property.type === 'apartment'}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formImages">
                    <Form.Label>Images *</Form.Label>
                    <Form.Control
                      type="file"
                      name="images"
                      onChange={handleImageChange}
                      multiple
                      accept="image/*"
                    />
                    <div className="mt-3">
                      <h6>Selected Images:</h6>
                      <Row>
                        {property.imageUrls.length > 0 &&
                          property.imageUrls.map((imageUrl, index) => (
                            <Col xs={4} key={imageUrl} className="mb-3">
                              <Card>
                                <Card.Img
                                  src={`${imageUrl}`}
                                  alt={imageUrl}
                                />
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={() => handleRemoveImage(index)}
                                >
                                  Remove
                                </Button>
                              </Card>
                            </Col>
                          ))}
                      </Row>
                    </div>
                    {newImages.length > 0 && (
                      <div className="mt-3">
                        <h6>New Images:</h6>
                        <Row>
                          {newImages.map((image, index) => (
                            <Col xs={4} key={image.name} className="mb-3">
                              <Card>
                                <Card.Img
                                  src={URL.createObjectURL(image)}
                                  alt={image.name}
                                />
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={() =>
                                    setNewImages((prevImages) =>
                                      prevImages.filter((_, i) => i !== index)
                                    )
                                  }
                                >
                                  Remove
                                </Button>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formVideos">
                    <Form.Label>Videos *</Form.Label>
                    <Form.Control
                      type="file"
                      name="videos"
                      onChange={handleVideoChange}
                      multiple
                      accept="video/*"
                    />
                    <div className="mt-3">
                      <h6>Selected Videos:</h6>
                      <Row>
                        {property.videoUrls.length > 0 &&
                          property.videoUrls.map((videoUrl, index) => (
                            <Col xs={6} key={videoUrl} className="mb-3">
                              <Card>
                                <Card.Body>
                                  <video
                                    controls
                                    style={{
                                      width: '100%',
                                      maxHeight: '250px',
                                    }}
                                  >
                                    <source
                                      src={`${videoUrl}`}
                                      type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                  <Button
                                    variant="link"
                                    size="sm"
                                    onClick={() => handleRemoveVideo(index)}
                                  >
                                    Remove
                                  </Button>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                      </Row>
                    </div>
                    {newVideos.length > 0 && (
                      <div className="mt-3">
                        <h6>New Videos:</h6>
                        <Row>
                          {newVideos.map((video) => (
                            <Col xs={6} key={video.name} className="mb-3">
                              <Card>
                                <Card.Body>
                                  <video
                                    controls
                                    style={{
                                      width: '100%',
                                      maxHeight: '250px',
                                    }}
                                  >
                                    <source
                                      src={URL.createObjectURL(video)}
                                      type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                  <Button
                                    variant="link"
                                    size="sm"
                                    onClick={() => setNewVideos([])}
                                  >
                                    Remove
                                  </Button>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group controlId="formFeatures">
                  <Form.Label>Features *</Form.Label>
                  <Row>
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="Swimming Pool"
                        name="Swimming Pool"
                        checked={property.features.includes('Swimming Pool')}
                        onChange={handleFeaturesChange}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Garden"
                        name="Garden"
                        checked={property.features.includes('Garden')}
                        onChange={handleFeaturesChange}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Garage"
                        name="Garage"
                        checked={property.features.includes('Garage')}
                        onChange={handleFeaturesChange}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="Balcony"
                        name="Balcony"
                        checked={property.features.includes('Balcony')}
                        onChange={handleFeaturesChange}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Patio"
                        name="Patio"
                        checked={property.features.includes('Patio')}
                        onChange={handleFeaturesChange}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Fire Place"
                        name="Fire Place"
                        checked={property.features.includes('Fire Place')}
                        onChange={handleFeaturesChange}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="Laundry Room"
                        name="Laundry Room"
                        checked={property.features.includes('Laundry Room')}
                        onChange={handleFeaturesChange}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Security System"
                        name="Security System"
                        checked={property.features.includes('Security System')}
                        onChange={handleFeaturesChange}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
              <Form.Group>
                <Row className="justify-content-center p-3">
                  <Col xs={2}>
                    <Button variant="secondary" onClick={handleReset}>
                      Reset
                    </Button>
                  </Col>
                  <Col xs={2}>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Col>
                  <Col xs={2}>
                    <Button variant="secondary" onClick={() => window.history.back()}>
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EditProperty;
