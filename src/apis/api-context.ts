import React from "react";
import { ArtistApi } from "./artist-api";

interface ApiContextI {
  artistApi: ArtistApi;
}

export const ApiContext = React.createContext<ApiContextI>({
  artistApi: new ArtistApi(),
});
