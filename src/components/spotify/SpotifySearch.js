import React, { useState, useEffect } from "react"
import Axios from "axios"
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@material-ui/core"

export default function SpotifySearch({ token }) {
  const initResults = { tracks: { items: [] } }
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(initResults)

  useEffect(() => {
    const searchTracks = async () => {
      const response = await Axios.get("https://api.spotify.com/v1/search?q=" + searchQuery + "&type=track", {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      console.log(response.data)
      setSearchResults(response.data)
    }

    if (searchQuery.length > 2) {
      searchTracks()
    } else {
      setSearchResults(initResults)
    }
  }, [searchQuery])

  return (
    <div>
      <h1>Search</h1>
      <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      <h2>Search Results:</h2>
      <List>
        {searchResults.tracks.items.map(track => {
          return (
            <ListItem key={track.uri}>
              <ListItemAvatar>
                <Avatar alt={track.album.name} src={track.album.images[1].url} />
              </ListItemAvatar>
              <ListItemText>
                {track.name} - {track.artists[0].name}
              </ListItemText>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
