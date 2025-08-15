// src/Receipt.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Card } from "react-bootstrap";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, bookTitle, amount, transactionId, date } = location.state || {};

  if (!name || !bookTitle || !amount || !transactionId || !date) {
    return <p className="text-danger text-center">❌ Missing receipt details.</p>;
  }

  const handleViewPDF = () => {
    const fileUrl = localStorage.getItem("pdfToView");
    if (!fileUrl) {
      alert("PDF not found.");
      return;
    }

    navigate("/view-pdf", { state: { fileUrl } });
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow">
        <h2 className="text-center text-success">🧾 Payment Receipt</h2>
        <hr />
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Book:</strong> {bookTitle}</p>
        <p><strong>Amount Paid:</strong> ₹{amount}</p>
        <p><strong>Transaction ID:</strong> {transactionId}</p>
        <p><strong>Date:</strong> {date}</p>

        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleViewPDF}>
            📘 View PDF
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Receipt;

