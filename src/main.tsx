import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ApiContext } from "./apis/api-context";

import Home from "./pages/home";
import Selection from "./pages/selection";
import NotFound from "./pages/not-found";
import PageContainer from "./pages/page-container";
import { ArtistApi } from "./apis/artist-api";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiContext.Provider
      value={{
        artistApi: new ArtistApi(),
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<PageContainer />}>
            <Route index element={<Home />} />
            <Route path="selection" element={<Selection />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  </StrictMode>
);
