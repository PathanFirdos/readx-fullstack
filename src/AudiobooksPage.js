// src/AudiobooksPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AudiobooksPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/audiobooks/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Audiobooks</h2>
      {categories.map((category, idx) => (
        <div key={idx} className="mb-4">
          <h4>{category.title}</h4>
          <div className="d-flex flex-wrap gap-4">
            {category.books.map((book, index) => (
              <div key={index} style={{ width: "200px" }}>
                <img
                  src={book.image}
                  alt={book.title}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <h6 className="mt-2">{book.title}</h6>
                <p>
                  <strong>{book.price}</strong>{" "}
                  <del style={{ color: "gray" }}>{book.mrp}</del>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudiobooksPage;


