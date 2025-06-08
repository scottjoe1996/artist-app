export interface Artist {
  id: number;
  name: string;
}

export interface Track {
  id: number;
  name: string;
}

export type ApiResponse<T> = { isError: true } | { isError: false; data: T };

const RESPONSE_DELAY_MS = 2000;

export class ArtistApi {
  constructor(private error = false) {}

  public getAllArtists(): Promise<ApiResponse<Artist[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.error
            ? {
                isError: true,
              }
            : {
                isError: false,
                data: [
                  { id: 1, name: "Sabrina Carpenter" },
                  { id: 2, name: "Bob Dylan" },
                  { id: 3, name: "Cassie" },
                  { id: 4, name: "Charlie XCX" },
                  { id: 5, name: "Bon Jovi" },
                ],
              }
        );
      }, RESPONSE_DELAY_MS);
    });
  }

  public getTracks(artistId: number): Promise<ApiResponse<Track[]>> {
    console.log(`Getting tracks for artist with id [${artistId}]`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.error
            ? {
                isError: true,
              }
            : {
                isError: false,
                data: [
                  { id: 6, name: "Mr Blue Sky" },
                  { id: 7, name: "Don't Stop Me Now" },
                  { id: 8, name: "Wonderwall" },
                  { id: 9, name: "All Star" },
                  { id: 10, name: "Take On Me" },
                ],
              }
        );
      }, RESPONSE_DELAY_MS);
    });
  }
}
