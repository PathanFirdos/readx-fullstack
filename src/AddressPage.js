import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddressPage = () => {
  return (
    <Container className="py-4">
      <h3>Your Address</h3>
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
        <Button variant="primary" type="submit">
          Save Address
        </Button>
      </Form>
      <Link to="/profile">
        <Button variant="secondary" className="mt-3 ms-2">
          Back to Profile
        </Button>
      </Link>
    </Container>
  );
};

export default AddressPage;
