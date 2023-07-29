import React from 'react';
import { Accordion, Container } from 'react-bootstrap';

function Faq() {
  return (
    <Container fluid className="border-0 shadow rounded-3 my-5 p-4 p-sm-5" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', minHeight: '300px' }}>
      <h1 style={{ textAlign: "center" }}>Frequently Asked Questions</h1>
      <Accordion className="mt-5 p-10" style={{ margin: "100px" }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            How do I list a property for sale or rent?
          </Accordion.Header>
          <Accordion.Body>
            To list a property, navigate to the "Listings" section and click on the "Add New Listing" button. Fill in the necessary details such as property type, location, price, and description. You can also upload photos and specify additional features. Once all the information is provided, submit the listing to make it available to potential buyers or tenants.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            How can I search for properties?
          </Accordion.Header>
          <Accordion.Body>
            To search for properties, use the search functionality on the homepage or navigate to the "Properties" section. Enter your desired location, property type, price range, and any other relevant filters. The system will display matching listings based on your search criteria. You can further refine your search by sorting the results or using advanced filters.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Can I save my favorite listings?
          </Accordion.Header>
          <Accordion.Body>
            Yes, you can save listings as favorites for future reference. When viewing a listing, click on the "Save as Favorite" button. The listing will be added to your saved favorites list, which you can access from your account dashboard. This feature allows you to easily keep track of properties that caught your interest.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            How can I contact the property owner or agent?
          </Accordion.Header>
          <Accordion.Body>
            On each listing page, you will find the contact information of the property owner or the associated real estate agent. This usually includes their name, phone number, and email address. Feel free to reach out to them directly to inquire about the property, schedule a viewing, or ask any questions you may have.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            How can I update or remove my listing?
          </Accordion.Header>
          <Accordion.Body>
            If you need to update or remove a listing, log in to your account and navigate to the "My Listings" section. Locate the listing you wish to modify or delete and choose the appropriate action. You can edit the listing details, add or remove photos, update the price, or mark the property as sold or rented. If you want to remove the listing entirely, select the "Delete" option.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            What payment options are available for property transactions?
          </Accordion.Header>
          <Accordion.Body>
            The available payment options may vary depending on the seller or real estate agency. Common payment methods include bank transfers, checks, or online payment platforms. It's recommended to discuss the preferred payment method with the property owner or agent during the negotiation process. Ensure that you follow secure and reliable payment practices when completing property transactions.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            Can I get assistance with legal or financial matters related to real estate?
          </Accordion.Header>
          <Accordion.Body>
            While the real estate management system provides property listing and search features, it's important to seek professional assistance for legal or financial matters. Consider consulting a real estate attorney or a financial advisor for expert advice on topics such as contracts, property taxes, mortgage options, or any other legal or financial concerns you may have.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default Faq;