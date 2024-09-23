import React, { useState, useEffect } from 'react';

const CustomizePrint = ({ data, pageCount, onNext, onBack, onDataChange }) => {
  const [printOptions, setPrintOptions] = useState(data);
  const [price, setPrice] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrintOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
    onDataChange({ ...printOptions, [name]: value });
  };

  const handleNext = () => {
    if (printOptions.color && printOptions.copies && printOptions.paperSize) {
      onNext();
    } else {
      alert('Please fill in all fields.');
    }
  };

  const calculatePrice = (options, pages) => {
    const pricePerPage = options.color === 'color' ? 5 : 2;
    const paperSizeCost = options.paperSize === 'A3' ? 2 : 0;
    const totalPrice = (pricePerPage + paperSizeCost) * pages * (options.copies || 1);
    return totalPrice;
  };

  useEffect(() => {
    setPrice(calculatePrice(printOptions, pageCount));
  }, [printOptions, pageCount]);

  return (
    <div>
      <h2>Customize Print</h2>
      <p>Number of pages: {pageCount}</p>
      <label>
        Color:
        <select name="color" value={printOptions.color || ''} onChange={handleChange}>
          <option value="">Select</option>
          <option value="color">Color</option>
          <option value="black-and-white">Black and White</option>
        </select>
      </label>
      <label>
        Number of Copies:
        <input
          type="number"
          name="copies"
          value={printOptions.copies || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Paper Size:
        <select name="paperSize" value={printOptions.paperSize || ''} onChange={handleChange}>
          <option value="">Select</option>
          <option value="A4">A4</option>
          <option value="A3">A3</option>
        </select>
      </label>
      <p>Total Price: ₹{price}</p>
      <button onClick={onBack}>Back</button>
      <button onClick={handleNext}>Continue</button>
    </div>
  );
};

export default CustomizePrint;