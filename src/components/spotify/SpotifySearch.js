import React, { useState } from "react";
import { List, Grid, Input, makeStyles } from "@material-ui/core";
import TrackItem from "../UI/TrackItem";
import ArtistItem from "../UI/ArtistItem";
import AlbumItem from "../UI/AlbumItem";
import PlaylistItem from "../UI/PlaylistItem";
import usePlaySelected from "../hooks/usePlaySelected";
import useSearchSpotify from "../hooks/useSearchSpotify";

export default function SpotifySearch({ token }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, loading] = useSearchSpotify(searchQuery, token);
  const [playSelected] = usePlaySelected();
  const classes = useStyles();

  const playItem = (uri, context_uri) => {
    playSelected({ token: token, uris: uri, context_uri: context_uri });
  };

  console.log(searchResults);

  const tracksList = () => {
    return (
      <Grid item xs={3}>
        {searchResults.tracks.items && searchResults.tracks.items.length > 0 && <h2>Tracks:</h2>}
        <List>
          {searchResults.tracks.items.map(track => (
            <div onClick={() => playItem([track.uri])}>
              <TrackItem track={track} token={token} key={track.uri} />
            </div>
          ))}
        </List>
      </Grid>
    );
  };

  const artistsList = () => {
    return (
      <Grid item xs={3}>
        {searchResults.artists.items && searchResults.artists.items.length > 0 && <h2>Artists:</h2>}
        <List>
          {searchResults.artists.items.map(artist => (
            <div onClick={() => playItem(null, artist.uri)}>
              <ArtistItem artist={artist} token={token} key={artist.uri} />
            </div>
          ))}
        </List>
      </Grid>
    );
  };

  const albumsList = () => {
    return (
      <Grid item xs={3}>
        {searchResults.albums.items && searchResults.albums.items.length > 0 && <h2>Albums:</h2>}
        <List>
          {searchResults.albums.items.map(album => (
            <div onClick={() => playItem(null, album.uri)}>
              <AlbumItem album={album} token={token} key={album.uri} />
            </div>
          ))}
        </List>
      </Grid>
    );
  };

  const playlistsList = () => {
    return (
      <Grid item xs={3}>
        {searchResults.playlists.items && searchResults.playlists.items.length > 0 && <h2>playlists:</h2>}
        <List>
          {searchResults.playlists.items.map(playlist => (
            <div onClick={() => playItem(null, playlist.uri)}>
              <PlaylistItem playlist={playlist} token={token} key={playlist.uri} />
            </div>
          ))}
        </List>
      </Grid>
    );
  };

  const searchField = () => {
    return (
      <Input
        className={classes.resize}
        type="search"
        placeholder={"Search"}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
    );
  };

  return (
    <div className={classes.contentContainer}>
      {searchField()}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Grid container>
          {tracksList()}
          {artistsList()}
          {albumsList()}
          {playlistsList()}
        </Grid>
      )}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  contentContainer: {
    margin: "20px"
  },
  resize: {
    fontSize: 40
  }
}));
