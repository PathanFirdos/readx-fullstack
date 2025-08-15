import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Footer'; // Adjust path based on your folder structure

const CancellationAndRefund = () => {
  return (
    <>
      <Container className="py-5">
        <h2 className="mb-4">Cancellation and Refund Policy</h2>
        <p>
          At ReadX, once a payment has been made and the book is downloaded, we do not offer
          cancellations or refunds. Please ensure that the book and rental duration are correct
          before proceeding with payment.
        </p>
        <p>
          If you experience any issues or have questions, feel free to contact our support team
          for assistance.
        </p>
      </Container>

      <Footer />
    </>
  );
};

export default CancellationAndRefund;

