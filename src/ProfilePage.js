import React, { useEffect } from "react";
import { useUser } from "./UserContext"; // Import the useUser hook
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "./assets/settings.png"; // replace with your logo path

const ProfilePage = () => {
  const { isLoggedIn } = useUser(); // Get the login state
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams(); // Get the dynamic tab parameter from the URL

  // Handle tab change
  const handleTabChange = (newTab) => {
    navigate(`/profile/${newTab}`);
  };

  // Check if the current tab is active based on the URL
  const isActive = (tabName) => location.pathname.includes(tabName);

  // Menu items for profile tabs
  const menuItems = [
    { key: "settings", label: "Personal Settings", icon: <i className="bi bi-person-gear fs-3 text-danger" /> },
    { key: "orders", label: "My Orders", icon: <i className="bi bi-box-seam fs-3 text-danger" /> },
    { key: "wishlist", label: "My Wishlist", icon: <i className="bi bi-heart fs-3 text-danger" /> },
    { key: "certificates", label: "My Gift Certificates", icon: <i className="bi bi-gift fs-3 text-danger" /> },
    { key: "address", label: "My Address", icon: <i className="bi bi-geo-alt fs-3 text-danger" /> },
    { key: "password", label: "Change Password", icon: <i className="bi bi-lock fs-3 text-danger" /> },
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <img src={logo} alt="Logo" height="80" className="mb-2" />
        <h3 className="text-danger">My Account</h3>
      </div>

      <Row xs={1} sm={2} md={3} className="g-4 justify-content-center">
        {menuItems.map((item) => (
          <Col key={item.key} className="d-flex justify-content-center">
            <Card
              className={`text-center p-3 shadow-sm border-0 ${isActive(item.key) ? 'bg-light' : 'hover-shadow'}`}
              style={{ width: "200px", cursor: "pointer" }}
              onClick={() => handleTabChange(item.key)}
            >
              <div className="mb-2">{item.icon}</div>
              <div className="fw-semibold text-dark">{item.label}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-4">
        <h4>{tab ? tab : "Welcome to your profile!"}</h4>
        {/* Add dynamic content based on the selected tab */}
      </div>
    </Container>
  );
};

export default ProfilePage;
