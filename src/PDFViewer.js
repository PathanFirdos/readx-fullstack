// src/PDFViewer.js
import React from "react";

const PDFViewer = ({ fileUrl }) => {
  if (!fileUrl) {
    return <p>❌ No PDF file specified.</p>;
  }

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      {/* 👇 disables toolbar/nav/scrollbars */}
      <iframe
        src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
        title="PDF Viewer"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};

export default PDFViewer;


