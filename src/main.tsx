import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import Home from "./pages/home";
import Selection from "./pages/selection";
import NotFound from "./pages/not-found";
import PageContainer from "./pages/page-container";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PageContainer />}>
          <Route index element={<Home />} />
          <Route path="selection" element={<Selection />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
