import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentStep, totalSteps, sections }) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="progress-container">
      <div className="progress-labels">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`progress-label ${currentStep === index + 1 ? 'active' : ''}`}
          >
            {section}
          </div>
        ))}
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;