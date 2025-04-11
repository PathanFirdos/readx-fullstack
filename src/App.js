
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import React, { useState } from "react";
import { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Button, Card, Form, Carousel, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle, FaSignInAlt } from "react-icons/fa";
import AuthPage from "./AuthPage";
import ProfilePage from "./ProfilePage";
import BookDetails from "./BookDetails"; // Import BookDetails page
import AudiobooksPage from "./AudiobooksPage";
import EbooksPage from "./EbooksPage";
import ComicsPage from "./ComicsPage";
import AdminPage from './AdminPage';
import Success from "./Success"; 
import Cancel from "./Cancel";   
import book1 from "./assets/book1.jpg";
import book2 from "./assets/book2.jpg";
import book3 from "./assets/book3.jpg";
 

// Sample Book Data
const books = [
  {
    title: "Can We Be Strangers Again?",
    description: "A deep dive into relationships.",
    image: book3,
    price: "₹200",
    mrp: "₹249",
  },
  {
    title: "The Art of Mindful Reading",
    description: "Enhance your reading experience through mindfulness.",
    image: book2,
    price: "₹180",
    mrp: "₹230",
  },
  {
    title: "Exploring the Cosmos",
    description: "A journey into the mysteries of the universe.",
    image: book1,
    price: "₹220",
    mrp: "₹280",
  },
  {
    title: "Digital Detox",
    description: "Unplug and recharge your life.",
    image: book1,
    price: "₹150",
    mrp: "₹199",
  },
  {
    title: "Waves of Imagination",
    description: "Let your creativity flow.",
    image: book2,
    price: "₹175",
    mrp: "₹210",
  },
];


const categories = [
  { title: "🔥 Popular Audiobooks", books: books },
  { title: "📖 Popular Ebooks", books: books },
  { title: "🦸‍♂️ Popular Comics", books: books }
];

const WelcomeBanner = () => {
  const navigate = useNavigate();
  return (
    <div 
      className="text-center py-5 mt-4"
      style={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        color: "white",
        borderRadius: "12px",
        margin: "0 auto",
        maxWidth: "90%",
      }}
    >
      <h3 className="mb-4">Books, videos, and music - all free from your public library!</h3>
      <div className="d-flex justify-content-center gap-3">
        <Button variant="outline-light" onClick={() => navigate('/auth')}>Login</Button>
        <Button variant="primary" onClick={() => navigate('/auth')}>Sign Up</Button>
      </div>
    </div>
  );
};


// **HomePage**
export const HomePage = () => {
  return (
    <Container fluid className="px-0">
    <WelcomeBanner />
    {categories.map((category, index) => (
      <div key={index} className="px-3" style={{ width: "100%" }}>
        <h3 className="mt-5 text-primary text-center">{category.title}</h3>
        <div
          className="mt-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1.5rem",
            padding: "0 2rem",
          }}
        >
          {category.books.map((book, idx) => (
            <Card
              key={idx}
              className="shadow-sm border-0 overflow-hidden"
              style={{ width: "100%" }}
            >
              <Link
                to={`/book/${encodeURIComponent(book.title)}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card.Img
                  variant="top"
                  src={book.image}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body className="text-center">
  <Card.Title>{book.title}</Card.Title>
  <div>
    <span className="fw-bold text-success">{book.price}</span>
    {" "}
    <span className="text-muted">
      M.R.P: <span className="text-decoration-line-through">{book.mrp}</span>
    </span>
  </div>
</Card.Body>

              </Link>
            </Card>
          ))}
        </div>
      </div>
    ))}
  </Container>
  
  );
};




// Protected route wrapper


const ProtectedRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};


// **Main App**
const ReadXApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleProfileNav = (tab) => {
    if (isLoggedIn) {
      navigate(`/profile?tab=${tab}`);
    } else {
      navigate("/auth", { state: { redirectTo: `/profile?tab=${tab}` } });
    }
  };
  

  return (
    <>
      {/* 🔒 Hide Navbar on Login page */}
      {location.pathname !== "/auth" && (
        <Navbar expand="lg" style={{ backgroundColor: "#2a5298", padding: "10px 0" }} variant="dark" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/" className="text-white fs-4" style={{ fontWeight: "bold" }}>📖 ReadX</Navbar.Brand>
            <div className="mx-auto d-flex justify-content-center" style={{ flex: 1 }}>
              <Form className="d-flex" style={{ width: "60%" }}>
                <FormControl type="search" placeholder="Search Books" className="me-2" aria-label="Search" style={{ borderRadius: "20px", padding: "10px" }} />
                <Button variant="outline-light" style={{ borderRadius: "20px", padding: "10px" }}>Search</Button>
              </Form>
            </div>

            <NavDropdown title="Discover" id="browse-dropdown" menuVariant="dark" className="fs-5">
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
              <NavDropdown
                title={<FaUserCircle size={28} />}
                id="profile-dropdown"
                align="end"
                menuVariant="dark"
                className="text-white fs-5"
              >
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
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:title" element={<BookDetails />} />
        <Route path="/audiobooks" element={<AudiobooksPage />} />
<Route path="/ebooks" element={<EbooksPage />} />
<Route path="/comics" element={<ComicsPage />} />
<Route path="/admin" element={<AdminPage />} />
        <Route path="/auth" element={<AuthPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-cancel" element={<Cancel />} />
      </Routes>
    </>
  );
};

const AppWithRouter = () => (
  <Router>
    <ReadXApp />
  </Router>
);

export default AppWithRouter;