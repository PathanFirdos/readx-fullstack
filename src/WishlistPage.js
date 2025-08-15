import React from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  return (
    <Container className="py-4">
      <h3>Your Wishlist</h3>
      <ListGroup>
        <ListGroup.Item>📘 The Art of Mindful Reading</ListGroup.Item>
        <ListGroup.Item>📕 Can We Be Strangers Again?</ListGroup.Item>
      </ListGroup>
      <Link to="/profile">
        <Button variant="secondary" className="mt-3">
          Back to Profile
        </Button>
      </Link>
    </Container>
  );
};

export default WishlistPage;
