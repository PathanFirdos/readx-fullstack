import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Container, Card, Button, Form } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-toastify/dist/ReactToastify.css";

import book1 from "./assets/book1.jpg";
import book2 from "./assets/book2.jpg";
import book3 from "./assets/book3.jpg";

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

const books = [
  {
    title: "Can We Be Strangers Again?",
    author: "Nikita Singh",
    description: "A moving story about love, heartbreak, and rediscovering oneself.",
    image: book3,
    price: 399,
    pdfUrl: "http://localhost:5000/books/Can-We-Be-Strangers-Again.pdf",
  },
  {
    title: "The Art of Mindful Reading",
    author: "Ella Berthoud",
    description: "Enhance your reading experience through mindfulness.",
    image: book2,
    price: 499,
    pdfUrl: "http://localhost:5000/books/Exploring_the_Cosmos_and_Introductory_As.pdf",
  },
  {
    title: "Exploring the Cosmos",
    author: "Neil deGrasse Tyson",
    description: "A journey into the mysteries of the universe.",
    image: book1,
    price: 599,
    pdfUrl: "/books/Exploring-the-Cosmos.pdf",
  },
];

const rentPercentages = {
  "1_week": 0.05,
  "2_weeks": 0.1,
  "3_weeks": 0.15,
  "1_month": 0.2,
};

const BookDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.title === decodeURIComponent(title));

  const [name, setName] = useState("");
  const [rentalDuration, setRentalDuration] = useState("1_week");
  const [submitted, setSubmitted] = useState(false);

  if (!book) {
    return (
      <Container className="py-5 text-center">
        <h2>Book not found.</h2>
      </Container>
    );
  }

  const calculateRent = () => {
    const percentage = rentPercentages[rentalDuration] || 0;
    // round up to avoid Razorpay “amount must be integer” issues
    return Math.ceil(book.price * percentage);
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

 const handlePayment = async () => {
  const ok = await loadRazorpayScript();
  if (!ok) {
    toast.error("❌ Razorpay SDK failed to load");
    return;
  }

  const rentAmount = Math.round(calculateRent());

  try {
    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: rentAmount,
        bookTitle: book.title,
        name: name, // ✅ use the actual state variable
      }),
    });

    const data = await res.json();

    if (!data.orderId) {
      toast.error("❌ Could not create order.");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_QAWdEHQiQCqssZ",
      amount: rentAmount * 100,
      currency: "INR",
      name: "ReadX Rentals",
      description: `Renting "${book.title}"`,
      order_id: data.orderId,
      handler: async () => {
        toast.success("✅ Payment Successful!");

        const vRes = await fetch(
          `http://localhost:5000/api/payment/verify-payment?transactionId=${data.orderId}&bookTitle=${book.title}`
        );
        const vData = await vRes.json();

      if (vData.verified) {
  setSubmitted(true);
  toast.success("📘 Book access unlocked!");

  // Store PDF URL in case user refreshes the page later
  localStorage.setItem("pdfToView", book.pdfUrl);

  // Navigate to the receipt page instead of directly to the PDF
  navigate("/receipt", {
    state: {
      name,
      bookTitle: book.title,
      amount: rentAmount,
      transactionId: data.orderId,
      date: new Date().toLocaleString(),
      fileUrl: book.pdfUrl, // optional, in case you want it on receipt too
    },
  });
} else {
  toast.info("⏳ Payment captured. Awaiting verification...");
}},
      prefill: {
        name: name, // ✅ use name from useState
      },
      theme: {
        color: "#4a90e2",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      console.error("Payment failed:", response.error);
      toast.error("❌ Payment failed. Please try again.");
    });
    rzp.open();
  } catch (error) {
    console.error("❌ Payment request failed:", error);
    toast.error("❌ Network error. Please try again.");
  }
};


  return (
    <Container className="py-4">
      <Card
        style={{
          width: "85%",
          maxWidth: "800px",
          margin: "auto",
          padding: "1.5rem",
          borderRadius: "20px",
          border: "4px solid #4a90e2",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        }}
      >
        <div className="d-flex flex-wrap align-items-center">
          <img
            src={book.image}
            alt={book.title}
            style={{ width: 200, height: 300, objectFit: "cover", borderRadius: 15, marginRight: 20 }}
          />

          <div style={{ flex: 1 }}>
          <h2 className="fw-bold text-dark">{book.title}</h2>
          <h5 className="text-muted mb-3">by {book.author}</h5>
          <p className="text-secondary">{book.description}</p>

          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
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

          <h4 className="text-primary mt-4">Rent: ₹{Math.round(calculateRent())}</h4>

          <Button
            variant="primary"
            className="my-3"
            onClick={handlePayment}
            disabled={!name}
          >
            💳 Pay with Razorpay
          </Button>

          {submitted && (
            <p className="mt-3 text-success fw-bold">
              ✅ Payment Verified! Enjoy your book.
            </p>
          )}
          </div>
        </div>
      </Card>

      <ToastContainer />
    </Container>
  );
};

export default BookDetails;


