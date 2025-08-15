import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PasswordPage = () => {
  return (
    <Container className="py-4">
      <h3>Change Password</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formOldPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control type="password" placeholder="Enter current password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="Enter new password" />
        </Form.Group>
        <Button variant="warning" type="submit">
          Update Password
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

export default PasswordPage;
