import React from "react";
import { NavLink } from "react-router";

const Home: React.FC = () => {
  return (
    <>
      <h1>Home</h1>
      <section>
        <h2>Getting started</h2>
        <p>
          If you would like to get started{" "}
          <NavLink to="/selection" end>
            go to the Selection page
          </NavLink>
        </p>
      </section>
    </>
  );
};

export default Home;
