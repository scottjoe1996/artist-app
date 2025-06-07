import React from "react";
import { Outlet } from "react-router";

const PageContainer: React.FC = () => {
  return (
    <main className="mx-auto w-full max-w-4xl p-4">
      <Outlet />
    </main>
  );
};

export default PageContainer;
