import React from "react"

const Heading = ({ children, className = "" }:{children: React.ReactNode, className: string}) => {
    return (
      <h3
        className={`border-transparent whitespace-nowrap px-1 border-b-2 font-medium text-sm focus:outline-none text-green-500 ${className}`}
      >
        {children}
      </h3>
    );
  };
  
  const Tab = (
    { children, isActive, className = "", onClick = () => null }: {
      children: React.ReactNode, isActive: any, className: string, onClick: any
  }) => {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`border-transparent whitespace-nowrap px-1 border-b-2 font-medium text-sm focus:outline-none ${
          isActive ? "text-green-500" : "text-gray-500 hover:text-gray-700"
        } ${className}`}
      >
        {children}
      </button>
    );
  };
  
  const ColumnHeader = {
    Heading,
    Tab,
  };
  
  export default ColumnHeader;
  