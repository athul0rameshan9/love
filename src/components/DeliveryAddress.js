import React, { useState } from 'react';

const DeliveryAddress = ({ data, onNext, onBack, onDataChange }) => {
  const [address, setAddress] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
    onDataChange({ ...address, [name]: value });
  };

  const handleNext = () => {
    if (address.street && address.city && address.zip) {
      onNext();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
      <h2>Delivery Address</h2>
      <label>
        Street:
        <input
          type="text"
          name="street"
          value={address.street || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          value={address.city || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        ZIP Code:
        <input
          type="text"
          name="zip"
          value={address.zip || ''}
          onChange={handleChange}
        />
      </label>
      <button onClick={onBack}>Back</button>
      <button onClick={handleNext}>Continue</button>
    </div>
  );
};

export default DeliveryAddress;