import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="placeholder-container d-flex flex-column align-items-center justify-content-center h-100 text-center py-5">
      <div className="placeholder-icon mb-4">
        <i className="bi bi-gear-wide-connected display-1 text-muted opacity-25"></i>
      </div>
      <h2 className="fw-bold mb-3">{title}</h2>
      <p className="text-muted lead max-width-600">
        This section is currently under development. <br />
        Soon you will be able to manage your {title.toLowerCase()} data here with real-time analytics and controls.
      </p>
      
      <div className="mt-5 p-4 border rounded-3 bg-white shadow-sm w-75">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="placeholder-row bg-light rounded w-50" style={{ height: '30px' }}></div>
          <div className="placeholder-row bg-light rounded w-25" style={{ height: '30px' }}></div>
        </div>
        <div className="placeholder-row bg-light rounded w-100 mb-3" style={{ height: '20px' }}></div>
        <div className="placeholder-row bg-light rounded w-100 mb-3" style={{ height: '20px' }}></div>
        <div className="placeholder-row bg-light rounded w-75" style={{ height: '20px' }}></div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
