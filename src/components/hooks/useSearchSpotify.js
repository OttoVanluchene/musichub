import Axios from "axios";
import useDebounce from "./useDebounce";
import { useState, useEffect } from "react";

const useSearchSpotify = (query, token) => {
  const initResults = {
    tracks: { items: [] },
    artists: { items: [] },
    albums: { items: [] },
    playlists: { items: [] }
  };
  const debouncedSearchTerm = useDebounce(query, 500);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(initResults);

  const searchTracks = async debouncedSearchTerm => {
    console.log(debouncedSearchTerm);
    const response = await Axios.get(
      "https://api.spotify.com/v1/search?q=" + debouncedSearchTerm + "&type=album,artist,playlist,track",
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
      searchTracks(debouncedSearchTerm);
    } else {
      setSearchResults(initResults);
    }
  }, [debouncedSearchTerm]);

  return [searchResults, loading];
};

export default useSearchSpotify;
