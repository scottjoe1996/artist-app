import React from "react";
import { NavLink } from "react-router";

import Title from "../components/title";

const Home: React.FC = () => {
  return (
    <>
      <Title>Home</Title>
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
