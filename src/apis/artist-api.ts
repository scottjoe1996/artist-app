export interface Artist {
  id: number;
  name: string;
}

export interface Track {
  id: number;
  name: string;
}

export interface TrackWihLyrics extends Track {
  lyrics: string;
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

  public getLyrics(
    artistId: number,
    trackId: number
  ): Promise<ApiResponse<TrackWihLyrics>> {
    console.log("Getting lyrics", { artistId, trackId });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.error
            ? {
                isError: true,
              }
            : {
                isError: false,
                data: {
                  id: 9,
                  name: "All Star",
                  lyrics:
                    "Somebody once told me the world is gonna roll me I ain't the sharpest tool in the shed She was looking kind of dumb with her finger and her thumb In the shape of an 'L' on her forehead Well, the years start coming and they don't stop coming Fed to the rules and I hit the ground running Didn't make sense not to live for fun Your brain gets smart but your head gets dumb So much to do, so much to see So what's wrong with taking the back streets? You'll never know if you don't go (GO!) You'll never shine if you don't glow Hey, now, you're an all-star, get your game on, go play Hey, now, you're a rock star, get the show on, get paid And all that glitters is gold Only shooting stars break the mold It's a cool place and they say it gets colder You're bundled up now wait 'til you get older But the meteor man beg to differ Judging by the hole in the satellite picture The ice we skate is getting pretty thin The water's getting warm so you might as well swim My world's on fire. How about yours? That's the way I like it and I'll never get bored Hey, now, you're an all-star, get your game on, go play Hey, now, you're a rock star, get the show on, get paid And all that glitters is gold Only shooting stars break the mold Go for the moon Go for the moon Go for the moon Go for the moon Hey, now, you're an all-star, get your game on, go play Hey, now, you're a rock star, get the show on, get paid And all that glitters is gold Only shooting stars Somebody once asked could I spare some change for gas I need to get myself away from this place I said yep, what a concept I could use a little fuel myself And we could all use a little change Well, the years start coming and they don't stop coming Fed to the rules and I hit the ground running Didn't make sense not to live for fun Your brain gets smart but your head gets dumb So much to do, so much to see So what's wrong with taking the back streets? You'll never know if you don't go You'll never shine if you don't glow Hey, now, you're an all-star, get your game on, go play Hey, now, you're a rock star, get the show on, get paid And all that glitters is gold Only shooting stars break the mold And all that glitters is gold Only shooting stars break the mold.",
                },
              }
        );
      }, RESPONSE_DELAY_MS);
    });
  }
}
