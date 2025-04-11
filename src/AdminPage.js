import React, { useState } from "react";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    type: "audiobooks",
    category: "",
    title: "",
    image: "",
    price: "",
    mrp: "",
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // You’ll send this to backend later
    console.log("Submitted:", formData);
    alert("Book added!");
  };

  return (
    <div className="container mt-4">
      <h2>📥 Admin - Upload New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Type</label>
          <select name="type" className="form-control" onChange={handleChange}>
            <option value="audiobooks">Audiobook</option>
            <option value="ebooks">Ebook</option>
            <option value="comics">Comic</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Category</label>
          <input type="text" name="category" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" name="title" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Image URL</label>
          <input type="text" name="image" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="text" name="price" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>MRP</label>
          <input type="text" name="mrp" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default AdminPage;
