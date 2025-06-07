interface Artist {
  id: number;
  name: string;
}

type ApiResponse<T> = { isError: true } | { isError: false; data: T };

export class ArtistApi {
  public getAllArtists(): Promise<ApiResponse<Artist[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          isError: false,
          data: [
            { id: 1, name: "Sabrina Carpenter" },
            { id: 2, name: "Bob Dylan" },
            { id: 3, name: "Cassie" },
            { id: 4, name: "Charlie XCX" },
            { id: 5, name: "Bon Jovi" },
          ],
        });
      }, 1000);
    });
  }
}
