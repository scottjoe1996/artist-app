import React from "react";

import { render as reactRender } from "@testing-library/react";

import { ApiContext } from "../apis/api-context";
import { ArtistApi } from "../apis/artist-api";

export const render = (element: React.ReactElement, artistApi: ArtistApi) =>
  reactRender(
    <ApiContext.Provider value={{ artistApi }}>{element}</ApiContext.Provider>
  );
