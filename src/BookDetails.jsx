

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Form } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import book1 from "./assets/book1.jpg";
import book2 from "./assets/book2.jpg";
import book3 from "./assets/book3.jpg";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXX"); // your real public key


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

  const handleRentNow = async () => {
    const amount = calculateRent();
  
    const stripe = await stripePromise;
  
    try {
      const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: book.title,
          price: amount,
          rentalDuration,
        }),
      });
  
      const session = await response.json();
  
      if (session.id) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        alert("Payment session creation failed.");
      }
    } catch (error) {
      alert("An error occurred while starting the payment session.");
      console.error(error);
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
    <Container className="py-5">
      <Card className="shadow-lg p-4 border-0 rounded" style={{ maxWidth: "800px", margin: "auto" }}>
        <div className="d-flex flex-wrap align-items-center">
          <img
            src={book.image}
            alt={book.title}
            className="rounded me-4 mb-3"
            style={{ width: "250px", height: "350px", objectFit: "cover" }}
          />
          <div>
            <h2>{book.title}</h2>
            <h5 className="text-muted">by {book.author}</h5>
            <p className="mt-3">{book.description}</p>

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

            <h4 className="text-primary">
              Rent: ₹{calculateRent().toFixed(2)}
            </h4>

            <Button variant="success" onClick={handleRentNow}>
              Rent Now
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default BookDetails;
