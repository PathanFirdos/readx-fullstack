// OrdersPage.js
import React from "react";
import { Container, ListGroup } from "react-bootstrap";

const OrdersPage = () => {
  return (
    <Container className="py-4">
      <h3>Your Orders</h3>
      <ListGroup>
        <ListGroup.Item>Order #1001 - ₹249 - Delivered</ListGroup.Item>
        <ListGroup.Item>Order #1002 - ₹199 - In Transit</ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default OrdersPage;
