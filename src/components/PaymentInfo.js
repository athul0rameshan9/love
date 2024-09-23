import React, { useState, useEffect } from 'react';

const PaymentInfo = ({ data, onBack, onSubmit, onDataChange }) => {
  const [paymentInfo, setPaymentInfo] = useState(data.paymentInfo || {});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Store payment info in local storage whenever it changes
    localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
  }, [paymentInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    onDataChange({ ...data, paymentInfo: { ...paymentInfo, [name]: value } });
  };

  const validate = () => {
    const newErrors = {};
    if (!paymentInfo.name) newErrors.name = 'Name is required';
    if (!paymentInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(paymentInfo.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!paymentInfo.contact) {
      newErrors.contact = 'Contact is required';
    } else if (!/^\d{10}$/.test(paymentInfo.contact)) {
      newErrors.contact = 'Contact number is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay key ID
      amount: 50000, // Amount in paise (50000 paise = 500 INR)
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      image: 'https://your-logo-url.com/logo.png',
      handler: function (response) {
        try {
          // Handle successful payment here
          alert('Payment successful!');
          onSubmit();
        } catch (error) {
          // Handle errors that occur after payment initiation
          console.error('Error during payment handling:', error);
          alert('An error occurred during payment processing. Please try again.');
          setIsLoading(false); // Reset loading state
          window.scrollTo(0, 0); // Scroll to top on error
        }
      },
      prefill: {
        name: paymentInfo.name,
        email: paymentInfo.email,
        contact: paymentInfo.contact,
      },
      notes: {
        address: 'Your Company Address',
      },
      theme: {
        color: '#F37254',
      },
      method: {
        netbanking: true,
        card: true,
        wallet: true,
        upi: true,
      },
      modal: {
        ondismiss: function () {
          // Handle the case when the payment modal is closed without completing the payment
          alert('Payment process was interrupted. Please try again.');
          setIsLoading(false); // Reset loading state
          window.scrollTo(0, 0); // Scroll to top on error
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true); // Set loading state
      try {
        handlePayment();
      } catch (error) {
        console.error('Error during payment submission:', error);
        alert('An error occurred during payment submission. Please try again.');
        setIsLoading(false); // Reset loading state
        window.scrollTo(0, 0); // Scroll to top on error
      }
    } else {
      alert('Please correct the errors in the form.');
      window.scrollTo(0, 0); // Scroll to top on validation error
    }
  };

  const handle401Error = () => {
    alert('Your session has expired. Please log in again.');
    setIsLoading(false); // Reset loading state
    window.scrollTo(0, 0); // Scroll to top on error
    // Redirect to login page or show login modal
  };

  useEffect(() => {
    // Example of handling 401 error globally
    const handleGlobalErrors = (event) => {
      if (event.detail.status === 401) {
        handle401Error();
      }
    };

    window.addEventListener('error', handleGlobalErrors);

    return () => {
      window.removeEventListener('error', handleGlobalErrors);
    };
  }, []);

  return (
    <div>
      <h2>Payment Info</h2>
      <h3>Uploaded PDF</h3>
      {data.pdfFile && <p>File Name: {data.pdfFile.name}</p>}
      <p>Number of Pages: {data.pageCount}</p>

      <h3>Print Options</h3>
      <p>Color: {data.printOptions.color}</p>
      <p>Number of Copies: {data.printOptions.copies}</p>
      <p>Paper Size: {data.printOptions.paperSize}</p>

      <h3>Delivery Address</h3>
      <p>Street: {data.address.street}</p>
      <p>City: {data.address.city}</p>
      <p>ZIP Code: {data.address.zip}</p>

      <h3>Payment Details</h3>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={paymentInfo.name || ''}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={paymentInfo.email || ''}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>
      <label>
        Contact:
        <input
          type="text"
          name="contact"
          value={paymentInfo.contact || ''}
          onChange={handleChange}
        />
        {errors.contact && <span className="error">{errors.contact}</span>}
      </label>
      <button onClick={onBack} disabled={isLoading}>Back</button>
      <button onClick={handleSubmit} disabled={isLoading}>Pay</button>
    </div>
  );
};

export default PaymentInfo;