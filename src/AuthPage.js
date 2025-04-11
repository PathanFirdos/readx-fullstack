import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const AuthPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password && (isSignUp ? name : true)) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");

      const redirectPath = location.state?.from?.pathname || "/profile";
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg border-0 p-4" style={{ width: "350px" }}>
        <h3 className="text-center text-primary mb-3">
          {isSignUp ? "Create an Account" : "Login to ReadX"}
        </h3>

        <Form onSubmit={handleSubmit}>
          {isSignUp && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <Button
              variant="link"
              className="p-0 ms-1"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Login" : "Sign Up"}
            </Button>
          </small>
        </div>
      </Card>
    </Container>
  );
};

export default AuthPage;
