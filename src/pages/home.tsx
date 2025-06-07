import React from "react";
import { NavLink } from "react-router";

const Home: React.FC = () => {
  return (
    <>
      <h1 className="page-title">Home</h1>
      <NavLink to="/selection" end>
        Go to selection
      </NavLink>
    </>
  );
};

export default Home;
