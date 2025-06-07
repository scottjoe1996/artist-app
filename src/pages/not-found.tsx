import React from "react";
import { NavLink } from "react-router";

const NotFound: React.FC = () => {
  return (
    <>
      <h1>Page not found</h1>
      <NavLink to="/">Go to home page</NavLink>
    </>
  );
};

export default NotFound;
