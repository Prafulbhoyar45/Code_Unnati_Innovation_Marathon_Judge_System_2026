import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`logo-wrapper ${className}`}>
      <img
        src="/assets/code-unnati.png"
        alt="Code Unnati Innovation Marathon"
        className="app-logo"
      />
      <div className="brand-text">
        <span className="brand-primary">CODE UNNATI</span>
        <span className="brand-secondary">Innovation Marathon 2026</span>
      </div>
    </div>
  );
};

export default Logo;
