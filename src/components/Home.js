import React, { useState } from 'react';
import UploadPDF from './UploadPDF';
import CustomizePrint from './CustomizePrint';
import DeliveryAddress from './DeliveryAddress';
import PaymentInfo from './PaymentInfo';
import ProgressBar from './ProgressBar';
import './Home.css';

const Home = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    pdfFile: null,
    pageCount: 0,
    printOptions: {},
    address: {},
    paymentInfo: {},
  });

  const sections = ['Upload PDF', 'Customize Print', 'Delivery Address', 'Payment Info'];

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFormDataChange = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: data.file || data,
      pageCount: data.pageCount || prevData.pageCount,
    }));
  };

  return (
    <div className="home">
      <ProgressBar currentStep={currentStep} totalSteps={4} sections={sections} />
      {currentStep === 1 && (
        <UploadPDF
          onNext={handleNext}
          onDataChange={(data) => handleFormDataChange('pdfFile', data)}
        />
      )}
      {currentStep === 2 && (
        <CustomizePrint
          data={formData.printOptions}
          pageCount={formData.pageCount}
          onNext={handleNext}
          onBack={handleBack}
          onDataChange={(data) => handleFormDataChange('printOptions', data)}
        />
      )}
      {currentStep === 3 && (
        <DeliveryAddress
          data={formData.address}
          onNext={handleNext}
          onBack={handleBack}
          onDataChange={(data) => handleFormDataChange('address', data)}
        />
      )}
      {currentStep === 4 && (
        <PaymentInfo
          data={formData}
          onBack={handleBack}
          onSubmit={() => alert('Form submitted!')}
          onDataChange={(data) => handleFormDataChange('paymentInfo', data)}
        />
      )}
    </div>
  );
};

export default Home;