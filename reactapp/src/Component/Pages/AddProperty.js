import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Toast } from 'react-bootstrap';

function AddProperty() {
  const [showToast, setShowToast] = useState(false);
  const [property, setProperty] = useState({
    title: '',
    description: '',
    address: '',
    price: '',
    type: '',
    status: '',
    images: [],
    videos: [],
    features: [],
  });

  const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
  const createFormData = () => {
    const formData = new FormData();
    formData.append('title', property.title);
    formData.append('description', property.description);
    formData.append('address', property.address);
    formData.append('price', property.price);
    formData.append('type', property.type);
    formData.append('status', property.status);
    formData.append('agentId', userId);

    // Append each image file to the formData
    for (let i = 0; i < property.images.length; i++) {
      formData.append('images', property.images[i]);
    }

    // Append each video file to the formData
    for (let i = 0; i < property.videos.length; i++) {
      formData.append('videos', property.videos[i]);
    }

    // Append each feature to the formData
    for (let i = 0; i < property.features.length; i++) {
      formData.append('features', property.features[i]);
    }

    return formData;
  };

  const handleReset = () => {
    setProperty({
      title: '',
      description: '',
      address: '',
      price: '',
      type: '',
      status: '',
      images: [],
      videos: [],
      features: [],
    });

    // Reset file input fields
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = '';
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = createFormData();
    try {
      const response = await axios.post(
        'http://localhost:8080/properties',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // Handle successful response
      console.log(response.data);
      setShowToast(true);

      // Reset the form data
      handleReset();
    } catch (error) {
      // Log the error details
      console.error('AxiosError:', error);

      // Handle specific error cases
      if (error.response) {
        console.error('Response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    const files = Array.from(event.target.files);
    // Check if any files are selected
    if (files.length === 0) {
      return; // Do not update state if no files are selected
    }
    // Check if each image is within the allowed size limit (1 MB)
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 2048 * 2048) {
        event.target.value = '';
        alert('Image size should not exceed 2 MB');
        return; // Do not update state if any image exceeds the limit
      }
    }
    setProperty({ ...property, images: [...property.images, ...files] });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...property.images];
    updatedImages.splice(index, 1);
    setProperty({ ...property, images: updatedImages });
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
    setProperty({ ...property, videos: [file] });
  };


  const handleRemoveVideo = () => {
    setProperty({ ...property, videos: [] });
  };

  const handleFeaturesChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setProperty({ ...property, features: [...property.features, name] });
    } else {
      setProperty({
        ...property,
        features: property.features.filter((feature) => feature !== name),
      });
    }
  };

  return (
    <Container className='border-0 shadow rounded-3 p-sm-2' style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h4 className='mx-auto font-weight-bold card-title text-center mt-4 mb-3'>Add Your Property</h4>
      <Row className="justify-content-center">
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
          <Row>
            <Col md={6}>
              <Form.Group controlId="formImages">
                <Form.Label>Images *</Form.Label>
                <Form.Control
                  type="file"
                  name="images"
                  onChange={handleImageChange}
                  multiple
                  accept="image/*"
                  required
                />
                {property.images.length > 0 ? (
                  <div>
                    Selected Images:
                    <ul>
                      {property.images.map((image, index) => (
                        <li key={index}>
                          {image.name}
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleRemoveImage(index)}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>No image selected</div>
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
                  accept="video/*"
                  required
                />
                {property.videos.length > 0 ? (
                  <div>
                    Selected Videos:
                    <ul>
                      {property.videos.map((video, index) => (
                        <li key={index}>
                          {video.name}
                          <Button
                            variant="link"
                            size="sm"
                            onClick={handleRemoveVideo}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>No video selected</div>
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
              <Col xs={1}>
                <Button variant="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </Col>
              <Col xs={1}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Row>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={10000}
        autohide
        style={{ position: 'absolute', top: 3, right: 3 }}
        animation={true}
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Property added successfully</Toast.Body>
      </Toast>
    </Container>
  );
}

export default AddProperty;