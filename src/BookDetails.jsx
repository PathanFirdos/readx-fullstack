import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { Container, Card, Button, Form } from "react-bootstrap";
import book1 from "./assets/book1.jpg";
import book2 from "./assets/book2.jpg";
import book3 from "./assets/book3.jpg";

const books = [
  {
    title: "Can We Be Strangers Again?",
    author: "Nikita Singh",
    description: "A moving story about love, heartbreak, and rediscovering oneself.",
    image: book3,
    price: 399,
  },
  {
    title: "The Art of Mindful Reading",
    author: "Ella Berthoud",
    description: "Enhance your reading experience through mindfulness.",
    image: book2,
    price: 499,
  },
  {
    title: "Exploring the Cosmos",
    author: "Neil deGrasse Tyson",
    description: "A journey into the mysteries of the universe.",
    image: book1,
    price: 599,
  },
];

const BookDetails = () => {
  const { title } = useParams();
  const book = books.find((b) => b.title === decodeURIComponent(title));
  const [rentalDuration, setRentalDuration] = useState("1_week");
  const [formData, setFormData] = useState({ name: "", transactionId: "" });
  const [submitted, setSubmitted] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const rentPercentages = {
    "1_week": 0.05,
    "2_weeks": 0.1,
    "3_weeks": 0.15,
    "1_month": 0.2,
  };

  const calculateRent = () => {
    const percentage = rentPercentages[rentalDuration] || 0;
    return book.price * percentage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/payment/submit-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          transactionId: formData.transactionId,
          bookTitle: book.title,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Payment submitted:", data);
        setSubmitted(true);
        toast.success("✅ Payment submitted successfully!");
      } else {
        console.error("Submission failed:", data);
        alert("Failed to submit payment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("Server error while submitting payment.");
    }
  };

  if (!book) {
    return (
      <Container className="py-5 text-center">
        <h2>Book not found.</h2>
      </Container>
    );
  }

  return (
    <Container
      className="py-4"
      style={{
        backgroundImage: "url('/bg-pattern.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Card
        className="book-card"
        style={{
          width: "85%",
          maxWidth: "800px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "1.5rem",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          border: "4px solid #4a90e2",
        }}
      >
        <div className="d-flex flex-wrap align-items-center">
          <img
            src={book.image}
            alt={book.title}
            style={{
              width: "200px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "15px",
              marginRight: "20px",
            }}
          />
          <div style={{ flex: 1 }}>
            <h2 className="fw-bold text-dark">{book.title}</h2>
            <h5 className="text-muted mb-3">by {book.author}</h5>
            <p className="text-secondary">{book.description}</p>

            <Form.Group className="mb-3" controlId="rentalDuration">
              <Form.Label>Select Rental Duration</Form.Label>
              <Form.Select
                value={rentalDuration}
                onChange={(e) => setRentalDuration(e.target.value)}
              >
                <option value="1_week">1 Week</option>
                <option value="2_weeks">2 Weeks</option>
                <option value="3_weeks">3 Weeks</option>
                <option value="1_month">1 Month</option>
              </Form.Select>
            </Form.Group>

            <h4 className="text-primary mt-4">
              Rent: ₹{calculateRent().toFixed(2)}
            </h4>

            <Button
              variant="primary"
              className="my-3"
              onClick={() => setShowPaymentOptions(true)}
            >
              💳 Rent Now
            </Button>

            {showPaymentOptions && (
              <div className="my-3">
                <h5 className="text-dark">Choose a Payment Option:</h5>
                <div className="d-flex gap-3 flex-wrap">
                <a
  href={`upi://pay?pa=merchant@upi&pn=BookRental&am=${calculateRent().toFixed(2)}&cu=INR`}
  style={{ textDecoration: 'none' }}
>
  <Button variant="outline-info">
    📲 Pay with PhonePe
  </Button>
</a>


                  <Button
                    variant="outline-success"
                    onClick={() => {
                      const upiURL = `upi://pay?pa=merchant@upi&pn=BookRental&am=${calculateRent().toFixed(2)}&cu=INR`;
                      window.location.href = upiURL;
                    }}
                  >
                    💰 Pay with Google Pay
                  </Button>
                </div>
              </div>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Transaction ID / UPI Ref No</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={formData.transactionId}
                  onChange={(e) =>
                    setFormData({ ...formData, transactionId: e.target.value })
                  }
                />
              </Form.Group>

              <Button type="submit" variant="success">
                I Have Paid
              </Button>
            </Form>

            {submitted && (
              <>
                <p className="mt-3 text-success fw-bold">
                  ✅ Payment Submitted! We’ll verify and unlock access shortly.
                </p>
                <Button
                  variant="primary"
                  className="mt-3"
                  href={`/books/${encodeURIComponent(book.title)}.pdf`}
                  download
                >
                  📥 Download Book PDF
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </Container>
  );
};

export default BookDetails;
