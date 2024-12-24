import './LoadingOverlay.css';

export const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="christmas-loader">🎄</div>
        <p>Santa is checking his list...</p>
      </div>
    </div>
  );
};
