import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#2a5298', color: 'white', padding: '40px 0' }}>
      <Container>
        <Row className="text-center text-md-start">
          {/* About Us */}
          <Col md={4} className="mb-4">
            <h5>📚 About ReadX</h5>
            <p>
              ReadX is your all-in-one digital library. Discover audiobooks, ebooks, and comics—all free from your local public library.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-4">
            <h5>🔗 Quick Links</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><a href="/audiobooks" className="text-white text-decoration-none">Audiobooks</a></li>
              <li><a href="/ebooks" className="text-white text-decoration-none">Ebooks</a></li>
              <li><a href="/comics" className="text-white text-decoration-none">Comics</a></li>
              <li><a href="/profile?tab=account" className="text-white text-decoration-none">Your Account</a></li>
            </ul>
          </Col>

          {/* Contact & Social */}
          <Col md={4} className="mb-4">
            <h5>📞 Contact Us</h5>
            <p><FaEnvelope /> support@readx.com</p>
            <p><FaPhone /> +91 98765 43210</p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white fs-5"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white fs-5"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white fs-5"><FaInstagram /></a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} ReadX. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;

