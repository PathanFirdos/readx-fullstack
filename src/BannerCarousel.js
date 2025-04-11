import React from 'react';
import { Link } from 'react-router-dom';
import './BannerCarousel.css'; // we'll style it next

const BannerCarousel = ({ books }) => {
  return (
    <div className="banner-carousel">
      {books.map((book, index) => (
        <Link key={index} to={`/book/${encodeURIComponent(book.title)}`} className="banner-item">
          <img src={book.image} alt={book.title} className="banner-image" />
        </Link>
      ))}
    </div>
  );
};

export default BannerCarousel;
