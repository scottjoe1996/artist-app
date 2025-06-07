import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import Home from "./pages/home";
import Selection from "./pages/selection";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="selection" element={<Selection />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
