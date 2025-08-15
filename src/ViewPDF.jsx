// src/ViewPDF.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PDFViewer from "./PDFViewer";

const ViewPDF = () => {
  const location = useLocation();
  const fileUrl = location.state?.fileUrl || localStorage.getItem("pdfToView");

  useEffect(() => {
  window.scrollTo(0, 0); // Scroll to top on load

  if (!fileUrl) {
    console.warn("⚠️ No PDF URL found in state or localStorage.");
  }
}, [fileUrl]);

  return (
    <>
      <h2 className="text-center mt-3">📘 View PDF</h2>
      <div className="mt-4">
        {fileUrl ? (
          <PDFViewer fileUrl={fileUrl} />
        ) : (
          <p className="text-danger text-center">❌ No PDF file specified.</p>
        )}
      </div>
    </>
  );
};

export default ViewPDF;

