import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div role="alert" className="w-full">
      <div className="bg-red-700 p-2 text-white text-lg font-semibold rounded-t-md">
        <p>Something went wrong</p>
      </div>
      <div className="bg-red-200 p-2 rounded-b-md">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
