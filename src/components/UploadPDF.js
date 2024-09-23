import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import { useAuth0 } from '@auth0/auth0-react';

const UploadPDF = ({ onNext, onDataChange }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const countPdfPages = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    return pdfDoc.getPageCount();
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const pages = await countPdfPages(file);
      setPageCount(pages);
      onDataChange({ file, pageCount: pages });
      setPdfPreview(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleNext = () => {
    if (pdfFile) {
      onNext();
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/pdf',
  });

  const dropzoneStyle = {
    border: '2px dashed #cccccc',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px',
  };

  const pdfPreviewStyle = {
    border: '1px solid #cccccc',
    borderRadius: '5px',
    padding: '10px',
    width: '250px',
    height: '250px',
    overflow: 'auto',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
  };

  if (!isAuthenticated) {
    return (
      <div style={containerStyle}>
        <p>Please log in to upload a PDF file.</p>
        <button style={buttonStyle} onClick={() => loginWithRedirect()}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div {...getRootProps({ style: dropzoneStyle })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a PDF file here, or click to select one</p>
      </div>
      {pdfPreview && (
        <div style={{ marginTop: '20px' }}>
          <iframe src={pdfPreview} style={pdfPreviewStyle} title="PDF Preview"></iframe>
          <p style={{ marginTop: '10px' }}>Number of pages: {pageCount}</p>
        </div>
      )}
      <button style={buttonStyle} onClick={handleNext}>Next</button>
    </div>
  );
};

export default UploadPDF;