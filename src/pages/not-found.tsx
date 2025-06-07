import React from "react";
import { NavLink } from "react-router";

const NotFound: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Page not found</h1>
      <NavLink to="/">Go to home page</NavLink>
    </>
  );
};

export default NotFound;
