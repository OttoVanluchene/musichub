import React, { useState, useEffect } from "react";
import Axios from "axios";
import { List, Grid, Input, makeStyles } from "@material-ui/core";
import TrackItem from "../UI/TrackItem";
import ArtistItem from "../UI/ArtistItem";
import AlbumItem from "../UI/AlbumItem";
import PlaylistItem from "../UI/PlaylistItem";
import usePlaySelected from "../hooks/usePlaySelected";

export default function SpotifySearch({ token }) {
  const initResults = {
    tracks: { items: [] },
    artists: { items: [] },
    albums: { items: [] },
    playlists: { items: [] }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(initResults);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const [playSelected] = usePlaySelected();
  const classes = useStyles();

  const searchTracks = async () => {
    const response = await Axios.get(
      "https://api.spotify.com/v1/search?q=" + searchQuery + "&type=album,artist,playlist,track",
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    setLoading(false);
    setSearchResults(response.data);
  };

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 2) {
      setLoading(true);
      searchTracks(debouncedSearchTerm, token);
    } else {
      setSearchResults(initResults);
    }
  }, [debouncedSearchTerm]);

  function playItem(uri, context_uri) {
    console.log("Play Item");
    playSelected({ token: token, uris: uri, context_uri: context_uri });
  }

  return (
    <div className={classes.contentContainer}>
      <Input
        className={classes.resize}
        type="search"
        placeholder={"Search"}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <Grid container>
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
      </Grid>
    </div>
  );
}

/**
 * Hook to debounce state changes
 * Limit rerender of a value that changes fast.
 * Ex. typing a search query into an inputfield
 * @param {*} value
 * @param {*} delay
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const useStyles = makeStyles(theme => ({
  contentContainer: {
    margin: "20px"
  },
  resize: {
    fontSize: 40
  }
}));
