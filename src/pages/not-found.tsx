import React from "react";
import { NavLink } from "react-router";

import Title from "../components/title";

const NotFound: React.FC = () => {
  return (
    <>
      <Title>Page not found</Title>
      <NavLink to="/">Go to home page</NavLink>
    </>
  );
};

export default NotFound;
