import React from "react";
import { Outlet, useLocation } from "react-router";

const PageContainer: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Required as screen readers do not automatically start reading new pages on route change in SPA.
    const h1 = document.querySelector("h1");
    h1?.focus();
  }, [location]);

  return (
    <main className="mx-auto w-full max-w-2xl p-4">
      <Outlet />
    </main>
  );
};

export default PageContainer;
