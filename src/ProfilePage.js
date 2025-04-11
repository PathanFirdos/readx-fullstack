import React, { useState, useEffect } from "react";
import { Container, Tab, Tabs, ListGroup, Form, Button, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();

  // Function to extract query param (like ?tab=wishlist)
  const getTabFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("tab") || "orders"; // default to 'orders' tab
  };

  const [key, setKey] = useState(getTabFromQuery());

  // Sync tab change if URL changes
  useEffect(() => {
    const currentTab = getTabFromQuery();
    setKey(currentTab);
  }, [location.search]);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4 text-primary">👤 Your Profile</h2>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 justify-content-center" fill>
        <Tab eventKey="orders" title="Your Orders">
          <ListGroup>
            <ListGroup.Item>Order #1001 - ₹249 - Delivered</ListGroup.Item>
            <ListGroup.Item>Order #1002 - ₹199 - In Transit</ListGroup.Item>
          </ListGroup>
        </Tab>

        <Tab eventKey="wishlist" title="Wishlist">
          <ListGroup>
            <ListGroup.Item>📘 The Art of Mindful Reading</ListGroup.Item>
            <ListGroup.Item>📕 Can We Be Strangers Again?</ListGroup.Item>
          </ListGroup>
        </Tab>

        <Tab eventKey="address" title="Your Address">
          <Form>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control type="text" placeholder="123 Main St" />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="Mumbai" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formZip">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control type="text" placeholder="400001" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary">Save Address</Button>
          </Form>
        </Tab>

        <Tab eventKey="password" title="Change Password">
          <Form>
            <Form.Group className="mb-3" controlId="formOldPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" placeholder="Enter current password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" />
            </Form.Group>
            <Button variant="warning">Update Password</Button>
          </Form>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProfilePage;

