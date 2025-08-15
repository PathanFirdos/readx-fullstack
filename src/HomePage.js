import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import book1 from "./assets/book1.jpg";
import book2 from "./assets/book2.jpg";
import book3 from "./assets/book3.jpg";
import book4 from "./assets/book4.jpg";
import book5 from "./assets/book5.jpg";
import book6 from "./assets/book6.jpg";
import book7 from "./assets/book7.jpg";
import book8 from "./assets/book8.jpg";
import book9 from "./assets/book9.jpg";
import book10 from "./assets/book10.jpg";
import book11 from "./assets/book11.jpg";
import book12 from "./assets/book12.jpg";
import book13 from "./assets/book13.jpg";
import book14 from "./assets/book14.jpg";
import book15 from "./assets/book15.jpg";

// Sample Book Data
const audiobooks = [
  {
    title: "Can We Be Strangers Again?",
    description: "A deep dive into relationships.",
    image: book3,
    price: "₹200",
    mrp: "₹249",
  },
  {
    title: "Digital Detox",
    description: "Unplug and recharge your life.",
    image: book4,
    price: "₹150",
    mrp: "₹199",
  },
  {
    title: "The Power of Pause",
    description: "Harness the strength of silence.",
    image: book5,
    price: "₹210",
    mrp: "₹260",
  },
  {
    title: "Talk Less, Say More",
    description: "A guide to powerful conversations.",
    image: book6,
    price: "₹170",
    mrp: "₹220",
  },
  {
    title: "Whispers of the Mind",
    description: "Explore the depths of inner voice.",
    image: book7,
    price: "₹190",
    mrp: "₹230",
  },
];


const ebooks = [
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
    title: "The Silent Path",
    description: "Walking through the lanes of peace.",
    image: book8,
    price: "₹160",
    mrp: "₹199",
  },
  {
    title: "Mind over Matter",
    description: "The science of willpower and resilience.",
    image: book9,
    price: "₹200",
    mrp: "₹245",
  },
  {
    title: "Ink and Insight",
    description: "A writer's journey into wisdom.",
    image: book10,
    price: "₹175",
    mrp: "₹210",
  },
];


// Comics
const comics = [
  {
    title: "Waves of Imagination",
    description: "Let your creativity flow.",
    image: book11,
    price: "₹175",
    mrp: "₹210",
  },
  {
    title: "The Hidden Hero",
    description: "A superhero's untold story.",
    image: book12,
    price: "₹160",
    mrp: "₹200",
  },
  {
    title: "Captain Quantum",
    description: "Time-bending battles across the multiverse.",
    image: book13,
    price: "₹190",
    mrp: "₹240",
  },
  {
    title: "Galaxy Raiders",
    description: "Space pirates, epic quests, cosmic chaos.",
    image: book14,
    price: "₹210",
    mrp: "₹260",
  },
  {
    title: "The Shadow Ninja",
    description: "Silent strikes, legendary fights.",
    image: book15,
    price: "₹170",
    mrp: "₹220",
  },
];


const categories = [
  { title: "🔥 Popular Audiobooks", books: audiobooks },
  { title: "📖 Popular Ebooks", books: ebooks },
  { title: "🦸‍♂️ Popular Comics", books: comics },
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
                      <span className="fw-bold text-success">{book.price}</span>{" "}
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
export const ProtectedRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};
export default HomePage;