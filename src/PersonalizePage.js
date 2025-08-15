import React, { useState } from "react";
import { Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";
import './PersonalizePage.css'; // Import the new CSS file

const categoriesList = [
  "Fiction", "Non-fiction", "Self-help", "Science", "Biography",
  "Romance", "Mystery", "Fantasy", "Comics", "Children", "History", "Business"
];

const PersonalizePage = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleCategory = (category) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleContinue = () => {
    if (selected.length >= 5) {
      // Save personalization status to localStorage
      localStorage.setItem("hasPersonalized", "true");

      // Navigate to the home page
      navigate("/home");
    } else {
      alert("Please select at least 5 categories to continue.");
    }
  };

  const resetSelection = () => {
    setSelected([]);
  };

  return (
    <Container className="text-center mt-4" style={{ maxWidth: "700px" }}>
      <FaLightbulb size={40} color="#facc15" />
      <h2 className="my-3 fw-bold" style={{ fontSize: "1.8rem" }}>
        Personalize Your Experience
      </h2>
      <p className="text-muted mb-4" style={{ fontSize: "1rem" }}>
        Select <strong>at least 5 categories</strong> to get personalized book recommendations.
      </p>

      <div className="row g-3">
        {categoriesList.map((category) => (
          <div className="col-6" key={category}>
            <Card
              onClick={() => toggleCategory(category)}
              className={`p-3 text-center shadow-sm rounded-3 fw-medium category-card ${
                selected.includes(category) ? "selected-category" : "unselected-category"
              }`}
            >
              {category}
            </Card>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
        <Button
          variant="light"
          disabled={selected.length < 5}
          onClick={handleContinue}
          className="px-4 py-2 fw-semibold rounded-pill continue-btn"
        >
          Continue
        </Button>

        <Button
          variant="light"
          onClick={resetSelection}
          className="px-4 py-2 fw-semibold rounded-pill reset-btn"
        >
          Reset
        </Button>
      </div>
    </Container>
  );
};

export default PersonalizePage;
