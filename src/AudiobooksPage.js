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
    <div className="container-fluid mt-4">
  <h2>Audiobooks</h2>
  {categories.map((category, idx) => (
    <div key={idx} className="mb-5">
      <h4>{category.title}</h4>
      <div className="row">
        {category.books.map((book, index) => (
          <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
            <img
              src={book.image}
              alt={book.title}
              className="img-fluid rounded"
              style={{ height: "250px", objectFit: "cover", width: "100%" }}
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


