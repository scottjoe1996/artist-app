import React from "react";

const Title: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="text-5xl font-normal mb-8 focus:outline-none" tabIndex={-1}>
      {children}
    </h1>
  );
};

export default Title;
