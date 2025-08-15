import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Button, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle } from "react-icons/fa";

import WelcomePage from "./WelcomePage"; 
import PersonalizePage from "./PersonalizePage";
import AuthPage from "./AuthPage";
import PDFViewer from './PDFViewer';
import ViewPDF from "./ViewPDF";
import Receipt from "./Receipt";
import ProfilePage from "./ProfilePage";
import BookDetails from "./BookDetails";
import AudiobooksPage from "./AudiobooksPage";
import EbooksPage from "./EbooksPage";
import ComicsPage from "./ComicsPage";
import AdminPage from './AdminPage';
import Success from "./Success"; 
import Cancel from "./Cancel";   
import book1 from "./assets/book1.jpg";
import book2 from "./assets/book2.jpg";
import book3 from "./assets/book3.jpg";
import Footer from "./Footer"; 
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import CancellationAndRefund from './CancellationAndRefund';
import ShippingAndDelivery from './ShippingAndDelivery';
import ContactUs from './ContactUs';
import { UserProvider } from "./UserContext"; 
import WishlistPage from './WishlistPage';
import OrdersPage from './OrdersPage';
import HomePage from './HomePage';

// Protected route wrapper
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/auth" replace />
  );
};

const ReadXApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Access userRole from localStorage
  const userRole = localStorage.getItem('userRole');

  const location = useLocation();
  const navigate = useNavigate();

  const handleProfileNav = (tab) => {
    if (isLoggedIn) {
      navigate(`/profile/${tab}`);
    } else {
      navigate("/auth", { state: { redirectTo: `/profile/${tab}` } });
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredBooks = [
    { title: "Book 1" },
    { title: "Book 2" },
    { title: "Book 3" },
  ].filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const NotFound = () => (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist. Go back to <Navigate to="/" />.</p>
    </div>
  );

  return (
    <>
      {/* 🔒 Hide Navbar on Login page */}
      {location.pathname !== "/auth" && (
        <Navbar expand="lg" style={{ backgroundColor: "#2a5298", padding: "10px 0" }} variant="dark" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/" className="text-white fs-4" style={{ fontWeight: "bold" }}>📖 ReadX</Navbar.Brand>
            <div className="mx-auto d-flex justify-content-center" style={{ flex: 1 }}>
              <Form className="d-flex" style={{ width: "60%" }}>
                <FormControl 
                  type="search" 
                  placeholder="Search Books" 
                  className="me-2" 
                  aria-label="Search" 
                  style={{ borderRadius: "20px", padding: "10px" }} 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Button variant="outline-light" style={{ borderRadius: "20px", padding: "10px" }}>Search</Button>
              </Form>
            </div>
            <NavDropdown
  title="Discover"
  id="browse-dropdown"
  className="fs-5"
  style={{
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
    borderRadius: '8px',
    padding: '8px 16px',
    color: 'white',
    fontWeight: 'bold',
  }}
>
  <NavDropdown.Item as={Link} to="/audiobooks">Audiobooks</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/ebooks">Ebooks</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/comics">Comics</NavDropdown.Item>
</NavDropdown>

            <Nav className="ms-auto">
              {isLoggedIn ? (
                <Nav.Link
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    setIsLoggedIn(false);
                    navigate("/");
                  }}
                  className="text-white fs-5"
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/auth" className="text-white fs-5">
                  Login
                </Nav.Link>
              )}
              {/* 👤 Profile Dropdown */}
              <NavDropdown title={<FaUserCircle size={28} />} id="profile-dropdown" align="end" menuVariant="dark" className="text-white fs-5">
                <NavDropdown.Item onClick={() => handleProfileNav("account")}>Your Account</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleProfileNav("orders")}>Your Orders</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleProfileNav("wishlist")}>Wishlist</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleProfileNav("password")}>Change Password</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      )}

      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn
              ? localStorage.getItem("hasPersonalized") === "true"
                ? <Navigate to="/home" replace />
                : <Navigate to="/personalize" replace />
              : <WelcomePage />
          }
        />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/personalize" element={isLoggedIn && localStorage.getItem("hasPersonalized") !== "true" ? (
          <PersonalizePage />
        ) : (
          <Navigate to="/home" replace />
        )} />
        <Route path="/book/:title" element={<BookDetails />} />
          <Route
  path="/view-pdf"
  element={
    isLoggedIn ? <ViewPDF /> : <Navigate to="/auth" replace />
  }
/>
<Route path="/receipt" element={<Receipt />} />

        <Route path="/audiobooks" element={<AudiobooksPage />} />
        <Route path="/ebooks" element={<EbooksPage />} />
        <Route path="/comics" element={<ComicsPage />} />

        <Route path="/profile/:tab" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ProfilePage /></ProtectedRoute>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/cancellation-refund" element={<CancellationAndRefund />} />
        <Route path="/shipping-delivery" element={<ShippingAndDelivery />} />
        <Route path="/contact-us" element={<ContactUs />} />
        
        {/* Admin Route: Only accessible if the user is an admin */}
        <Route path="/admin" element={isLoggedIn && userRole === "admin" ? <AdminPage /> : <Navigate to="/" replace />} />
        
        <Route path="/auth" element={<AuthPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-cancel" element={<Cancel />} />
        
        {/* Custom 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer always visible except on auth and profile pages */}
      {location.pathname !== "/auth" && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <UserProvider>
      <ReadXApp />
    </UserProvider>
  );
}