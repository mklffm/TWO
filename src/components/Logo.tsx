import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", isDark = false }) => {
  const textColor = isDark ? "text-primary-600" : "text-white";
  const iconColor = isDark ? "text-primary-600" : "text-white";
  
  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo Icon */}
      <div className={`${iconColor} mr-2`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M8 12H16M12 8V16" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary-500"
          />
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="font-bold text-xl flex items-center">
        <span className={`${textColor} mr-1`}>Mira</span>
        <div className="bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text flex items-center">
          <span className="inline-block transform -translate-y-px">Booking</span>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 ml-1 transform translate-y-0.5"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo; 