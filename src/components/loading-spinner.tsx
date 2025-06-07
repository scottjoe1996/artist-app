import React from "react";

interface LoadingSpinnerProps {
  label: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ label }) => {
  return (
    <div
      className="flex flex-col justify-center items-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={`border-6 border-y-violet-700 border-x-transparent rounded-[50%] animate-spin`}
        style={{
          height: "80px",
          width: "80px",
          animationDuration: "1.3s",
          animationTimingFunction: "ease",
        }}
      ></div>
      <span className="mt-4 text-xl font-semibold">{label}</span>
    </div>
  );
};

export default LoadingSpinner;
